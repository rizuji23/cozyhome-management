import React from 'react';

class Sidebar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <a href="index.html">
                            <img src="/images/logo.png" alt="Protend logo" />
                        </a>
                        <div className="sidebar-close" id="sidebar-close">
                            <i className='bx bx-left-arrow-alt'></i>
                        </div>
                    </div>
                    <div className="simlebar-sc" data-simplebar>
                        <ul className="sidebar-menu tf">
                            <li>
                                <a href="/dashboard">
                                    <i className='bx bxs-home' ></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li className="sidebar-submenu">
                                <a href="/projek" className="sidebar-menu-dropdown">
                                    <i className='bx bxs-bolt'></i>
                                    <span>Projek</span>
                                    <div className="dropdown-icon"><i className='bx bx-chevron-down'></i></div>
                                </a>
                                <ul className="sidebar-menu sidebar-menu-dropdown-content">
                                    <li>
                                        <a href="/projek">
                                            List Project
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/tambah_projek">
                                            Buat Projek Baru
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="sidebar-submenu">
                                <a href="/customer" className="sidebar-menu-dropdown">
                                    <i className='bx bxs-user'></i>
                                    <span>Customer</span>
                                    <div className="dropdown-icon"><i className='bx bx-chevron-down'></i></div>
                                </a>
                                <ul className="sidebar-menu sidebar-menu-dropdown-content">
                                    <li>
                                        <a href="/customer">
                                            List Customer
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/tambah_customer">
                                            Tambah Customer
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/stok_gudang">
                                    <i className='bx bxs-box'></i>
                                    <span>Stok Gudang</span>
                                </a>
                            </li>
                            <li>
                                <a href="/pengaturan">
                                    <i className='bx bxs-cog'></i>
                                    <span>Pengaturan</span>
                                </a>
                            </li>

                            <li>
                                <a href="/">
                                    <i className='bx bxs-log-out-circle' ></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </>
        )
    }
}

export default Sidebar;