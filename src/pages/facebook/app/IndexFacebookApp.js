import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import callFetch from "../../../helpers/callFetch";
import deleteAlert from "../../../helpers/deleteAlert";

function IndexFacebookApp() {
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [reIndex, setReIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        callFetch("facebook-apps?page="+currentPage, "GET", [], null).then((res) => {
            setResData(res);
            console.log(res);
        });
    }, [currentPage,reIndex]);
    
    function token_validity(token_validity='')
    {
        let tokenInvalid = t('invalid');
        let tokenExpired = t('expired');
        let tokenValid = t('valid');
        if (token_validity == 'invalid') {
            return <td className="align-middle text-center text-sm"><span className="badge badge-sm bg-gradient-warning">{tokenInvalid}</span></td>;
        } else if (token_validity == 'expired') {
            return <td className="align-middle text-center text-sm"><span className="badge badge-sm bg-gradient-danger">{tokenExpired}</span></td>;
        } else {
            return <td className="align-middle text-center text-sm"><span className="badge badge-sm bg-gradient-info">{tokenValid}</span></td>;
        }
    }

    return (
        <>
        <div className="d-sm-flex justify-content-between">
            <div>
                <NavLink to="create" className="btn btn-icon bg-gradient-primary">
                    {t('New App')}
                </NavLink>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Facebook App Information')}</h6>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0">
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('App Name')} &amp; {t('App Id')}</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Token Validity')}</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Status')}</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {resData && resData.data.facebook_apps.map((fbApp) => (
                                    <tr key={fbApp.id}>
                                        <td>
                                            <div className="px-2 py-2">
                                                <div className="justify-content-center">
                                                    <h6 className="mb-0 text-sm">{ fbApp.app_name }</h6>
                                                    <p className="text-xs text-secondary mb-0">{ fbApp.api_id }</p>
                                                </div>
                                            </div>
                                        </td>

                                        {token_validity(fbApp.token_validity)}

                                        <td className="align-middle text-center text-sm">
                                        {fbApp.status === 1 ? <span className="badge badge-sm bg-gradient-success">{t('active')}</span> : <span className="badge badge-sm bg-gradient-danger">{t('inactive')}</span>}
                                        </td>

                                        <td>
                                            <div className="text-center dropstart">
                                                <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <NavLink to={'/facebook-apps/fbLogin/'+fbApp.id} className="dropdown-item">
                                                            {t('Facebook Login')}
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/facebook-apps/'+fbApp.id} className="dropdown-item">
                                                            {t('Edit')}
                                                        </NavLink>
                                                    </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'facebook-apps', fbApp.id, t).then(res => setReIndex(reIndex+1))}>{t('Delete')}</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default IndexFacebookApp;
