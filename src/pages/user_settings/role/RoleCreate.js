import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";

function RoleCreate() {
    let displayName = '';
    let params = useParams();
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [userType, setUserType] = useState('0');
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        callFetch("roles/create", "GET", [], setError).then((res) => {
            setResData(res.data);
            setValue('role_for', 0);
        });
    }, [setError, setValue, params]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("roles", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/user-settings/roles' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Create New Role')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Role Name')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Role Name')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Role For')} <b>*</b>
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("role_for", {
                                                required: true,
                                            })}
                                            onChange={(e) => setUserType(e.target.value)}
                                            required
                                        >
                                            <option value="1">{t('General User')}</option>
                                            <option value="0">{t('System User')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.role_for && errors.role_for.message}</div>
                                    </div>
                                </div>
                            </div>
                            {userType === '0' ? (
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label>
                                            {t('Price')} <b>*</b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('Price')}
                                            {...register("price", {
                                                required: true,
                                            })}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.price && errors.price.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>
                                            {t('Validity')} <b>*</b>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('Validity')}
                                            {...register("validity", {
                                                required: true,
                                            })}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.validity && errors.validity.message}</div>
                                    </div>
                                </div>
                            ) : ''}
                            <div className="row g-3">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label>
                                            {t('Permissions')} <b>*</b>
                                        </label>
                                        <br />
                                        {resData && resData.permissions.map((permission) => (
                                            <div key={permission.id} className="form-check-inline">
                                                {permission.display_name !== displayName ? <label>{permission.display_name}</label> : ''}
                                                <div className="form-check" data-optional={permission.display_name !== displayName ? displayName = permission.display_name : ''}>
                                                    <input className="form-check-input" type="checkbox" value={permission.name} {...register("permission")} />
                                                    <label className="custom-control-label text-uppercase">{permission.name.split('-').pop()}</label>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="invalid-feedback">{errors.permission && errors.permission.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-4">
                                {!saving && (
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                )}
                                {saving && (
                                    <button type="submit" className="btn btn-disabled" disabled>
                                        Saving ...
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
}

export default RoleCreate;
