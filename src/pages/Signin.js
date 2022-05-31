import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import callFetch from "../helpers/callFetch";

function Signin() {
    let tempAuth = Cookies.get('token') ? true : false;
    const [signinSuccess, setSigninSuccess] = useState(tempAuth);
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        callFetch('signin', 'POST', formData, setError)
            .then(loginData => {
                if (!loginData.ok)
                    return;

                Cookies.set('token', loginData.data.token);
                Cookies.set('user', JSON.stringify(loginData.data.user));
                setSigninSuccess(true);
            });
    }

    return signinSuccess ? <Navigate to='/application-settings' /> :
        <>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="card-body">
                                            <form className={`needs-validation ${Object.keys(errors).length ? 'was-validated' : ''}`} onSubmit={handleSubmit(onSubmit)} noValidate>
                                                <label>Email</label>
                                                <div className="mb-3">
                                                    <input type="email" className="form-control" placeholder="Email" {
                                                        ...register('email', {
                                                            required: true
                                                        })
                                                    } required />
                                                    <div className="invalid-feedback">
                                                        {errors.email && errors.email.message}
                                                    </div>
                                                </div>
                                                <label>Password</label>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control" placeholder="Password" {
                                                        ...register('password', {
                                                            required: true
                                                        })
                                                    } required />
                                                    <div className="invalid-feedback">
                                                        {errors.password && errors.password.message}
                                                    </div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" {...register("checkbox")} />
                                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Sign
                                                        in</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-4 text-sm mx-auto">
                                                Don't have an account?
                                                <a href="google.com" className="text-info text-gradient font-weight-bold">Sign
                                                    up</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                        <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: 'url("../assets/img/curved-images/curved6.jpg")' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="footer py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mb-4 mx-auto text-center">
                            <a href="google.com" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                                Company
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                                About Us
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                                Team
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                                Products
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                                Blog
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                                Pricing
                            </a>
                        </div>
                        <div className="col-lg-8 mx-auto text-center mb-4 mt-2">
                            <a href="google.com" target="_blank" className="text-secondary me-xl-4 me-4">
                                <span className="text-lg fab fa-dribbble" />
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-4 me-4">
                                <span className="text-lg fab fa-twitter" />
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-4 me-4">
                                <span className="text-lg fab fa-instagram" />
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-4 me-4">
                                <span className="text-lg fab fa-pinterest" />
                            </a>
                            <a href="google.com" target="_blank" className="text-secondary me-xl-4 me-4">
                                <span className="text-lg fab fa-github" />
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8 mx-auto text-center mt-1">
                            <p className="mb-0 text-secondary">
                                Copyright © {new Date().getFullYear()} NextBot. All rights reserved | Developed by
                                <a href="https://ambitiousit.net" className="font-weight-bold"> ambitiousit.net</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>;
}

export default Signin;
