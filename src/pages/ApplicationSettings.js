import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { callFetch } from "../helpers/callFetch";
import { useTranslation } from 'react-i18next';

function ApplicationSettings() {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        callFetch("app-setting/1/edit", "GET", [], setError).then((res) => {
            for (let [key, value] of Object.entries(res.data)) {
                setValue(key, value);
            }
        });
    }, [setError, setValue]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("app-setting", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Application Settings')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Item Name')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Type Your Item Name Here')}
                                        {...register("item_name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.item_name && errors.item_name.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Item Short Name')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Type Your Item Short Name Here')}
                                        {...register("item_short_name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.item_short_name && errors.item_short_name.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Company Name')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Type Your Company Name Here')}
                                        {...register("company_name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.company_name && errors.company_name.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Company Email')} <b>*</b>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control mb-4"
                                        placeholder={t('Type Your Comapny Email Here')}
                                        {...register("company_email", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.company_email && errors.company_email.message}</div>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label>
                                    {t('Company Address')} <b>*</b>
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder={t('Type Your Comapny Address Here')}
                                    {...register("company_address", {
                                        required: true,
                                    })}
                                    required
                                ></textarea>
                                <div className="invalid-feedback">{errors.address && errors.address.message}</div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Deafult Language')} <b>*</b>
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("language", {
                                                required: true,
                                            })}
                                            required
                                        >
                                            <option value="en">English</option>
                                            <option value="bn">বাংলা</option>
                                            <option value="el">Ελληνικά</option>
                                            <option value="pt">Português</option>
                                            <option value="es">Español</option>
                                            <option value="de">Deutch</option>
                                            <option value="fr">Français</option>
                                            <option value="nl">Nederlands</option>
                                            <option value="it">Italiano</option>
                                            <option value="vi">Tiếng Việt</option>
                                            <option value="ru">русский</option>
                                            <option value="tr">Türkçe</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.language && errors.language.message}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Time Zone')} <b>*</b>
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("time_zone", {
                                                required: true,
                                            })}
                                            required
                                        >
                                            <option value="Pacific/Midway">GMT -11.00 Pacific/Midway</option>
                                            <option value="America/Anchorage">GMT -9.00 America/Anchorage</option>
                                            <option value="Asia/Kuwait">GMT +3.00 Asia/Kuwait</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.time_zone && errors.time_zone.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>{t('Logo')}</label>
                                    <input type="file" className="form-control mb-4" {...register("logo")} />
                                    <div className="invalid-feedback">{errors.logo && errors.logo.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>{t('Favicon')}</label>
                                    <input type="file" className="form-control mb-4" {...register("favicon")} />
                                    <div className="invalid-feedback">{errors.favicon && errors.favicon.message}</div>
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
    );
}

export default ApplicationSettings;
