import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';

function FacebookLogin() {
    let params = useParams();
    const { t } = useTranslation();
    const [loginButton, setLoginButton] = useState('');
    const [expiredOrNot, setExpiredOrNot] = useState(0);

    useEffect(() => {
        callFetch("facebook-apps/" + params.id + "/fbLogin", "GET", [], null).then((res) => {
            setLoginButton(res.loginButton);
            setExpiredOrNot(res.expiredOrNot);
        });
    });

    return (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Facebook Login')}</h6>
                    </div>
                    <div className="card-body">
                        {expiredOrNot == '1' && <p className="text-center text-secondary"><small><i className="fas fa-info-circle" /> {t('Facebook access token is valid. You can login and get new user access token if you want.')}</small></p>}
                        <h3 className="text-center">
                            <a href={loginButton} type="button" className="btn btn-facebook btn-icon btn-lg">
                                <span className="btn-inner--icon"><i className="fab fa-facebook" /></span>
                                <span className="btn-inner--text"> {t('Facebook Login')}</span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacebookLogin;