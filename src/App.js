import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplicationSettings from "./pages/ApplicationSettings";
import IndexFacebookApp from "./pages/facebook/app/IndexFacebookApp";
import CreateFacebookApp from "./pages/facebook/app/CreateFacebookApp";
import EditFacebookApp from "./pages/facebook/app/EditFacebookApp";
import FacebookLogin from "./pages/facebook/app/FacebookLogin";
import FacebookConnectAccount from "./pages/facebook/account/FacebookConnectAccount";
import Table from "./pages/Table";
import PrivateOutlet from "./components/PrivateOutlet";
import Signin from "./pages/Signin";
import RoleIndex from './pages/user_settings/role/RoleIndex';
import RoleEdit from './pages/user_settings/role/RoleEdit';
import RoleCreate from './pages/user_settings/role/RoleCreate';
import SmtpIndex from './pages/user_settings/smtp/SmtpIndex';
import SmtpCreate from './pages/user_settings/smtp/SmtpCreate';
import SmtpEdit from './pages/user_settings/smtp/SmtpEdit';

function App() {
    return (
        <Suspense fallback="loading ...">
            <BrowserRouter>
                <ToastContainer theme="dark" />
                <Routes>
                    <Route path="/" element={<Signin />} />
                    <Route path="/*" element={<PrivateOutlet />}>
                        <Route path="application-settings" element={<ApplicationSettings />} />
                        <Route path="facebook-apps/:id" element={<EditFacebookApp />} />
                        <Route path="facebook-apps/fbLogin/:id" element={<FacebookLogin />} />
                        <Route path="facebook-apps" element={<IndexFacebookApp />} />
                        <Route path="facebook-apps/create" element={<CreateFacebookApp />} />
                        <Route path="facebook-connect-accounts" element={<FacebookConnectAccount />} />
                        <Route path="table" element={<Table />} />
                        <Route path="user-settings/roles" element={<RoleIndex />} />
                        <Route path="user-settings/roles/create" element={<RoleCreate />} />
                        <Route path="user-settings/roles/:id/edit" element={<RoleEdit />} />
                        <Route path="user-settings/smtp" element={<SmtpIndex />} />
                        <Route path="user-settings/smtp/create" element={<SmtpCreate />} />
                        <Route path="user-settings/smtp/:id/edit" element={<SmtpEdit />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
