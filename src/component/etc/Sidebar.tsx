import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <Link to="/dashboard">
                            <img src="/images/logo.png" alt="Protend logo" />
                        </Link>
                        <div className="sidebar-close" id="sidebar-close">
                            <i className='bx bx-left-arrow-alt'></i>
                        </div>
                    </div>
                    <div className="simlebar-sc" data-simplebar>
                        <ul className="sidebar-menu tf">
                            <li>
                                <Link to="/dashboard">
                                    <i className='bx bxs-home' ></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className="sidebar-submenu">
                                <Link to="/projek" className="sidebar-menu-dropdown">
                                    <i className='bx bxs-bolt'></i>
                                    <span>Projek</span>
                                    <div className="dropdown-icon"><i className='bx bx-chevron-down'></i></div>
                                </Link>
                                <ul className="sidebar-menu sidebar-menu-dropdown-content">
                                    <li>
                                        <Link to="/projek">
                                            List Project
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/tambah_projek">
                                            Buat Projek Baru
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="sidebar-submenu">
                                <Link to="/customer" className="sidebar-menu-dropdown">
                                    <i className='bx bxs-user'></i>
                                    <span>Customer</span>
                                    <div className="dropdown-icon"><i className='bx bx-chevron-down'></i></div>
                                </Link>
                                <ul className="sidebar-menu sidebar-menu-dropdown-content">
                                    <li>
                                        <Link to="/customer">
                                            List Customer
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/tambah_customer">
                                            Tambah Customer
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/stok_gudang">
                                    <i className='bx bxs-box'></i>
                                    <span>Stok Gudang</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/pengaturan">
                                    <i className='bx bxs-cog'></i>
                                    <span>Pengaturan</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/logout">
                                    <i className='bx bxs-log-out-circle' ></i>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </>
        )
    }
}

export default Sidebar;