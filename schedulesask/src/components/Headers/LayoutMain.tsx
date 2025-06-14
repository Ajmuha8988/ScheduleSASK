import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery/dist/jquery.slim.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import "./mobileheaders.css";
import 'react-phone-input-2/lib/material.css';
import RegisterButton from './ModalRegister'
import AuthorizateButton from './ModalAuthorization'
import logo from './Log_SASK24.png';

const LayoutMain = () => {
    return (
            <header className="bg-dark font-for-headers">
                <nav className="navbar navbar-dark navbar-expand-lg navbar-warning bg-dark container">
                <a className="navbar-brand" >
                    <img width="150" height="50" src={logo} alt="Alternate Text" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <>
                                    <li className="nav-item">
                                        <RegisterButton />
                                    </li>
                                    <li className="nav-item">
                                        <AuthorizateButton/>
                                    </li>
                                </>
                        </ul>
                    </div>
                </nav>
            </header>
        );
};

export default LayoutMain;