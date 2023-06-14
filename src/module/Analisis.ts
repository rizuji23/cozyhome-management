import axios from "./axios";

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Analisis {
    static async get(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/analisis/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }

    static calculateCost(data) {
        var cost_design = [];
        var cost_operasional = [];
        var cost_produksi = [];
        var cost_bahan = [];
        var cost_lain = [];
        var total_keseluruhan = [];

        var cost_design_result = new Array(12).fill(0);
        var cost_operasional_result = new Array(12).fill(0);
        var cost_produksi_result = new Array(12).fill(0);
        var cost_bahan_result = new Array(12).fill(0);
        var cost_lain_result = new Array(12).fill(0);
        var total_keseluruhan_result = new Array(12).fill(0);

        Object.entries(data).map((el) => {
            if (el[0] === "cost_design") {
                cost_design.push(el[1])
            } else if (el[0] === "cost_operasional") {
                cost_operasional.push(el[1])
            } else if (el[0] === "cost_produksi") {
                cost_produksi.push(el[1]);
            } else if (el[0] === "cost_bahan") {
                cost_bahan.push(el[1]);
            } else if (el[0] === "cost_lain") {
                cost_lain.push(el[1]);
            } else if (el[0] === "total_keseluruhan") {
                total_keseluruhan.push(el[1]);
            }
        });

        cost_design.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              cost_design_result[index] = el3[1]
          });
        })
        cost_operasional.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              cost_operasional_result[index] = el3[1]
          });
        })
        cost_produksi.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              cost_produksi_result[index] = el3[1]
          });
        })
        cost_bahan.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              cost_bahan_result[index] = el3[1]
          });
        }) 
        cost_lain.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              cost_lain_result[index] = el3[1]
          });
        }) 

        total_keseluruhan.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              total_keseluruhan_result[index] = el3[1]
          });
        })

        return {
            series: [{
                name: 'Cost Material',
                data: cost_bahan_result
            }, {
                name: 'Cost Produksi',
                data: cost_produksi_result
            }, {
                name: 'Cost Design',
                data: cost_design_result
            }, {
                name: 'Cost Operasional',
                data: cost_operasional_result
            }, {
                name: 'Total Keseluruhan Cost',
                data: total_keseluruhan_result
            }],
            categories: month
        }
    }

    static calculateProject(data) {
        var progress;
        var done;
        var time = [];

        Object.keys(data.onprogress).map(el => {
            time.push(el);
        });

        Object.entries(data).map(el => {
            if (el[0] === "onprogress") {
                progress = Object.values(el[1])
            } else {
                done = Object.values(el[1])
            }
        });

        return {
            series:  [{
                name: 'Selesai',
                data: done,
                color: "#3c21f7"
            }, {
                name: 'On Progress',
                data: progress,
                color: '#ffca1f',
            }],
            categories: time
        }
    }

    static calculateKategori(data) {
       return {
            series: Object.values(data)
       }
    }
}

export default Analisis;