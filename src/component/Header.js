
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"


const Header = ({ setActive, active, user, handleLogout }) => {
    const userId = user?.uid;
    console.log(userId);
    console.log(user?.displayName)
    return (
        <div className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid bg-faded padding-media'>
                <div className='container-fluid padding-media'>
                    <nav className='navbar navbar-toggleable-md navbar-light'>
                        <button className='navbar navbar-toggler mt-3' type='button' data-bs-toggle='collapse' data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="true" aria-label="Toggle Navigation">
                            <span className='fa fa-bars'></span>
                        </button>
                        <div className='collpase navbar-collapse' id='navbarToggleExternalContent'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link links ${active === "home" ? "active" : ""}`} onClick={() => setActive("home")}>
                                        Home
                                    </li>
                                </Link>
                                <Link to="/create" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link links ${active === "create" ? "active" : ""}`} onClick={() => setActive("create")}>
                                        Create
                                    </li>
                                </Link>
                                <Link to="/about" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link links ${active === "about" ? "active" : ""}`} onClick={() => setActive("about")}>
                                        About
                                    </li>
                                </Link>
                            </ul>
                            <div className='row g-3' id='navbarSupportedContent'>

                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {userId ? (
                                        <>
                                            <div className='profile-logo'>
                                                <FaUserCircle style={{ width: "1.8rem", height: "1.8rem", marginTop: "0.75rem" }} />
                                            </div>
                                            <p style={{ marginTop: "0.75rem", marginLeft: "0.31rem" }}>{user?.displayName}</p>
                                            <li className='nav-item nav-link' onClick={handleLogout}>Logout</li>
                                        </>
                                    )
                                        : (
                                            <Link to="/auth" style={{ textDecoration: "none" }}>
                                                <li className={`nav-item nav-link links ${active === "login" ? "active" : ""}`} onClick={() => setActive("login")}>
                                                    Login
                                                </li>
                                            </Link>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default Header
