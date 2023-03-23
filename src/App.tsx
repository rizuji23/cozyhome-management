import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { sidebar } from './js/main';
import Dashboard from './component/Dashboard';
import Projek from './component/Projek';
import AddProjek from './component/AddProjek';
import DetailProjek from './component/DetailProjek';
import Customer from './component/Customer';
import AddCustomer from './component/AddCustomer';
import DetailProgress from './component/DetailProgress';
import DetailCustomer from './component/DetailCustomer';
import StokGudang from './component/StokGudang';
import Pengaturan from './component/Pengaturan';

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    sidebar();
  }

  render(): React.ReactNode {
    return (
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>


        <Route path='/projek' element={<Projek />}></Route>
        <Route path='/tambah_projek' element={<AddProjek />}></Route>
        <Route path='/detail_projek/:id' element={<DetailProjek />}></Route>
        <Route path='/detail_progress' element={<DetailProgress />}></Route>

        <Route path='/customer' element={<Customer />}></Route>
        <Route path='/tambah_customer' element={<AddCustomer />}></Route>
        <Route path='/detail_customer/:id' element={<DetailCustomer />}></Route>

        <Route path='/stok_gudang' element={<StokGudang />}></Route>

        <Route path='/pengaturan' element={<Pengaturan />}></Route>

      </Routes>
    )
  }
}

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />}></Route>
//     </Routes>
//   );
// }

export default App;
