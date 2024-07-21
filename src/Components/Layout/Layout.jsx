import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Home';
import Onboarding from '../Onboarding';
import './Layout.css'

const NavBar = () => {
    return (
        <div className="navBar">
            <ul className="navList">
                <li className="navItem">
                    <Link className="navLink" to="/">
                        Home
                    </Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/onboarding">
                        Onboarding
                    </Link>
                </li>
            </ul>
        </div>
    )
}

const PageContent = () => {
    return (
        <div className="page-content">
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
        </div>
    )
}

const Layout = () => {
    return (
        <Router>
            <div className="container">
                <NavBar />
                <PageContent />
            </div>
        </Router >
    );
};

export default Layout;