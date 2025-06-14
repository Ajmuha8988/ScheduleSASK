import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.slim.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "./mobileheaders.css"
import LogoutButton from './LogoutUser'
import ValidationStudent from '../../utils/Validation/ValidationPageStudent'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';

const LayoutStudent = () => {
    const { Firstname, Patronymic, loading } = ValidationStudent();
    const navigate = useNavigate();
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <BeatLoader color="#ffc107" size={20} />
                </div>
            ) : (
                    <header className="bg-dark font-for-headers">
                        <nav className="navbar navbar-dark navbar-expand-lg navbar-warning bg-dark container">
                            <a className="navbar-brand" onClick={() => navigate('/students')} >
                                <img width="150" height="50" src="https://drive.google.com/file/d/1WAEqMlW7XGP4vbLK6O0AYZIY8q9r25Le/view?usp=sharing" alt="Alternate Text" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon "></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <label className="ms-2 text-light d-inline-block px-2 py-1"  >Добро пожаловать, {Firstname} {Patronymic}!</label>
                                    </li>
                                    <li className="nav-item">
                                        <LogoutButton />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
            )}
        </>
    );
};

export default LayoutStudent;