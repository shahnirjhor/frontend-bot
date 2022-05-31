import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';

function CreateFacebookApp() {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("facebook-apps", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/facebook-apps' /> :
        <>
            <div className="row">
                <div className="accordion-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mx-auto">
                                <div className="accordion" id="accordionRental">
                                    <div className="accordion-item mb-3">
                                        <div className="accordion-header card bg-gradient-secondary" id="headingOne">
                                            <div className="card-body p-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                <div className="row">
                                                    <div className="col-1 text-end">
                                                        <div className="icon icon-shape bg-white shadow text-center border-radius-md">
                                                            <i className="fas fa-globe-africa text-dark text-lg opacity-10" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="col-11">
                                                        <div className="numbers">
                                                            <p className="text-white text-md mb-0 text-capitalize font-weight-bold opacity-7">{t('App Setting')}</p>
                                                            <h5 className="text-white text-sm mb-0 font-weight-bolder">
                                                                {t('Basic App Setting Information Are Here.')}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionRental">
                                            <div className="accordion-body text-sm opacity-8">
                                                <div className="d-flex flex-column">
                                                    <h6 className="mb-3 text-lg">{t('Settings')} -&gt; {t('basic')}</h6>
                                                    <span className="mb-2 text-md">{t('App domain')} : <span className="text-dark ms-sm-2 font-weight-bold">{process.env.REACT_APP_FRONTEND_URL}</span></span>
                                                    <span className="mb-2 text-xl">{t('Site url')} : <span className="text-dark ms-sm-2 font-weight-bold">{process.env.REACT_APP_API_URL}</span></span>
                                                    <br />
                                                    <span className="mb-2 text-xl">{t('Privacy policy url')} : <span className="text-dark ms-sm-2 font-weight-bold">{process.env.REACT_APP_FRONTEND_URL}privacy-policy</span></span>
                                                    <span className="mb-2 text-xl">{t('Terms of service url')} : <span className="text-dark ms-sm-2 font-weight-bold">{process.env.REACT_APP_FRONTEND_URL}terms-of-service</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-3">
                                        <div className="accordion-header card bg-gradient-secondary" id="headingTwo">
                                            <div className="card-body p-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <div className="row">
                                                    <div className="col-1 text-end">
                                                        <div className="icon icon-shape bg-white shadow text-center border-radius-md">
                                                            <i className="fas fa-anchor text-dark text-lg opacity-10" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="col-11">
                                                        <div className="numbers">
                                                            <p className="text-white text-md mb-0 text-capitalize font-weight-bold opacity-7">{t('OAuth')} &amp; {t('Webhook')}</p>
                                                            <h5 className="text-white text-sm mb-0 font-weight-bolder">
                                                                {t('OAuth Redirect Url')} &amp; {t('Webhook Information Are Here.')}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionRental">
                                            <div className="accordion-body text-sm opacity-8">
                                                <div className="d-flex flex-column">
                                                    <h6 className="mb-3 text-lg">{t('Webhook')}</h6>
                                                    <span className="mb-2 text-md">{t('Webhook callback url')} : <span className="text-dark ms-sm-2 font-weight-bold">{process.env.REACT_APP_API_URL}{'webhookCallback'}</span></span>
                                                    <span className="mb-2 text-xl">{t('Webhook verify token')} : <span className="text-dark ms-sm-2 font-weight-bold">after test given</span></span>
                                                    <br />
                                                    <h6 className="mb-3 text-lg">{t('Valid OAuth Redirect URIs')}</h6>
                                                    <span className="mb-2 text-md"><span className="text-dark font-weight-bold">{process.env.REACT_APP_API_URL}{'facebook-apps/loginCallback'}</span></span>
                                                    <span className="mb-2 text-md"><span className="text-dark font-weight-bold">{process.env.REACT_APP_API_URL}{'connectaccount/refreshTokenCallback'}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('Facebook App Settings')}</h6>
                        </div>
                        <div className="card-body">
                            <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label>{t('App name')} <b className="form-required-star">*</b></label>
                                        <input type="text" className="form-control mb-4" placeholder={t('Type Your App Name Here')}
                                            {...register("app_name", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>{t('Api Id')} <b className="form-required-star">*</b></label>
                                        <input type="text" className="form-control mb-4" placeholder={t('Type Your Api Id Here')}
                                            {...register("api_id", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label>{t('Api Secret')} <b className="form-required-star">*</b></label>
                                        <input type="text" className="form-control mb-4" placeholder={t('Type Your Api Secret Here')}
                                            {...register("api_secret", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>{t('Status')}</label>
                                            <select
                                                className="form-control"
                                                {...register("status", {
                                                    required: true,
                                                })}
                                                required
                                            >
                                                <option value="1">{t('Active')}</option>
                                                <option value="0">{t('Inactive')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    {!saving && (
                                        <button type="submit" className="btn btn-primary">
                                            {t('Save')}
                                        </button>
                                    )}
                                    {saving && (
                                        <button type="submit" className="btn btn-disabled" disabled>
                                            {t('Saving ...')}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>;
}

export default CreateFacebookApp;