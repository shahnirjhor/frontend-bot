import { useEffect, useState } from "react";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import deleteAlert from "../../../helpers/deleteAlert";

function FacebookConnectAccount() {
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [reIndex, setReIndex] = useState(0);
    const [loginButton, setLoginButton] = useState('');

    useEffect(() => {
        callFetch("facebook-connect-accounts/connectedAccounts", "GET", [], null).then((res) => {
            setResData(res.existingFbAccounts);
            setLoginButton(res.loginButton);
            console.log(res);
        });
    }, [reIndex]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body">
                        <h3 className="text-center">
                            <a href={loginButton} type="button" className="btn btn-facebook btn-icon btn-lg">
                                <span className="btn-inner--icon"><i className="fab fa-facebook" /></span>
                                <span className="btn-inner--text"> {t('Facebook Login')}</span>
                            </a>
                        </h3>                       
                    </div>
                </div>
            </div>
            {resData && resData.map((fbUser) => (
                <div key={fbUser.fb_id} className="col-12 col-xl-6 mt-xl-0 mt-4">
                    <div className="card h-100">
                        <div className="card-header pb-0 p-3">
                            <div className="row gx-4">
                                <div className="col-auto">
                                    <div className="avatar avatar-xl position-relative">
                                        <img src={'https://graph.facebook.com/me/picture?access_token='+fbUser.user_access_token} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                    </div>
                                </div>
                                <div className="col-auto my-auto">
                                    <div className="h-100">
                                        <h5 className="mb-1">
                                            { fbUser.name }
                                        </h5>
                                        <p className="mb-0 font-weight-bold text-sm">
                                            { fbUser.email }
                                        </p>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <a className="btn btn-link p-4 ms-auto" href="#0" onClick={(e) => deleteAlert(e, 'facebook-users', fbUser.id, t).then(res => setReIndex(reIndex+1))}>{t('Delete')}</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            {fbUser && fbUser.page_list.map((fbPage) => (
                                <ul key={fbPage.id} className="list-group">
                                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                        <div className="avatar me-3">
                                            <img src={fbPage.page_profile} alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">{fbPage.page_name}</h6>
                                            <a className="mb-0 text-xs" href={'https://www.facebook.com/'+fbPage.page_id} target="_blank"><i className="fa fa-hand-pointer-o"></i> {t('Visit For More Information..')}</a>
                                        </div>
                                        <a className="btn btn-link p-3 ms-auto" href="#0">{t('Bot Enable')}</a>
                                        <a className="btn btn-link p-0" href="#0" onClick={(e) => deleteAlert(e, 'facebook-pages', fbPage.id, t).then(res => setReIndex(reIndex+1))}>{t('Delete')}</a>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default FacebookConnectAccount;