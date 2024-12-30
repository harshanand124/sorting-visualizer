import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import url from "../../utils/url";
import Modal from "../Modal/Modal";
import { BACKEND_URL } from '../../App';

const gravatar = "https://www.gravatar.com/avatar/default";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: ''
    });
    const [profileIcon, setProfileIcon] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                closeModal();
                await checkUserAuthentication();
            } else {
                alert(data.error || 'Login failed!');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
                localStorage.setItem('token', data.token);
                closeModal();
                await checkUserAuthentication();
            } else {
                alert(data.error || 'Signup failed!');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const checkUserAuthentication = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setProfileIcon(false);
            setUser(null);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/me`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                setProfileIcon(true);
                setUser(data.user);
            } else {
                localStorage.removeItem('token');
                setProfileIcon(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Authentication Check Error:', error);
            localStorage.removeItem('token');
            setProfileIcon(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkUserAuthentication();
    }, []);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.leftSection}>
                        <Link to={url.main} className={styles.logo} title="Data Structures and Algorithms Visualizer">
                            Algorithm Visualizer
                        </Link>
                    </div>

                    <div className={styles.rightSection}>
                        {profileIcon ? (
                            <div className={styles.wrap}>
                                <img src={user?.avatar || gravatar} alt="User avatar" className={styles.avatar} />
                            </div>
                        ) : (
                            <button className={styles.loginButton} onClick={openModal}>
                                Log in
                            </button>
                        )}
                    </div>
                </nav>
            </header>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalTabs}>
                        <button 
                            className={`${styles.tabButton} ${isLogin ? styles.active : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button 
                            className={`${styles.tabButton} ${!isLogin ? styles.active : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>
                    {isLogin ? (
                        <form className={styles.form} onSubmit={handleLoginSubmit}>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    ) : (
                        <form className={styles.form} onSubmit={handleSignupSubmit}>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password" 
                                value={formData.confirmPassword} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Sign Up'}
                            </button>
                        </form>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default Header;
