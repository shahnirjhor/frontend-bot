import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Sidebar() {
    const { t } = useTranslation();
    const [nowDrop, setNowDrop] = useState(window.location.href.split('/')[3]);
    let navClassName = "nav-link";
    let activeClassName = "nav-link active";
    let dropdownClass = "collapse";
    let dropdownClassShow = "collapse show";

    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <a className="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html">
                    <img src="/assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
                    <span className="ms-1 font-weight-bold">Soft UI Dashboard</span>
                </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa fa-globe icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/table" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa fa-globe icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">Tables</span>
                        </NavLink>
                    </li>
                    {/*  */}
                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#user-settings" className={nowDrop === 'user-settings' ? activeClassName : navClassName} aria-controls="user-settings" role="button" aria-expanded={nowDrop === 'user-settings'}>
                            <i className="fa fa-globe icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Settings')}</span>
                        </a>
                        <div className={nowDrop === 'user-settings' ? dropdownClassShow : dropdownClass} id="user-settings">
                            <ul className="nav ms-4 ps-3">
                                <li className="nav-item">
                                    <NavLink to="/user-settings/roles" onClick={(e) => setNowDrop('user-settings')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                        <span className="sidenav-normal">{t('Role Management')}</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/user-settings/smtp" onClick={(e) => setNowDrop('user-settings')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                        <span className="sidenav-normal"> {t('SMTP Settings')}</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="../../pages/dashboards/smart-home.html">
                                        <span className="sidenav-mini-icon"> S </span>
                                        <span className="sidenav-normal"> Smart Home </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="../../pages/dashboards/crm.html">
                                        <span className="sidenav-mini-icon"> C </span>
                                        <span className="sidenav-normal"> CRM </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/*  */}
                    <li className="nav-item">
                        <NavLink to="/application-settings" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa fa-globe icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">Application Settings</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/facebook-apps" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa fa-globe icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">Facebook App</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/facebook-connect-accounts" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                        <i className="fas fa-plus icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                        <span className="nav-link-text ms-1">Facebook Account</span>
                    </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
