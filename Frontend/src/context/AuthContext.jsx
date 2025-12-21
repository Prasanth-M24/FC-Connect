import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const API_URL = 'http://localhost:5000/api/auth';

    useEffect(() => {
        if (token) {
            axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Auth Error", err);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [token]);

    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, userData);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                setUser(res.data);
            }
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Network Error" };
        }
    };

    const login = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/login`, userData);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                setUser(res.data);
            }
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Network Error" };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
