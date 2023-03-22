import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProjectPage from './pages/ProjectManagement';
import AccountPage from './pages/AccountManagement';
import TeamPage from './pages/TeamManagement';
import AboutPage from './pages/AboutUs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/ProjectManagement" element={<ProjectPage/>} />
            <Route path="/AccountManagement" element={<AccountPage/>} />
            <Route path="/TeamManagement" element={<TeamPage/>} />
            <Route path="/AboutUs" element={<AboutPage/>} />
        </Routes>
    </BrowserRouter>
);


reportWebVitals();
