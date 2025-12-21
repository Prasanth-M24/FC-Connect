import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="logo-text">FC-Connect</h2>
                    <p>
                        Connecting farmers directly with customers to ensure fair prices and fresh products.
                    </p>
                    <div className="contact">
                        <span>&nbsp; +91 1234567890</span>
                        <span>&nbsp; info@fc-connect.com</span>
                    </div>
                    <div className="socials">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                    </div>
                </div>

                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/">Buyer</a></li>
                        <li><a href="/seller">Seller</a></li>
                        <li><a href="/currentPrice">Mandi Prices</a></li>
                        <li><a href="/weather">Weather</a></li>
                    </ul>
                </div>

                <div className="footer-section contact-form">
                    <h2>Contact Us</h2>
                    <form action="#">
                        <input type="email" name="email" className="text-input contact-input" placeholder="Your email address..." />
                        <textarea name="message" className="text-input contact-input" placeholder="Your message..."></textarea>
                        <button type="submit" className="btn btn-big contact-btn">
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} FC-Connect | Designed by FC-Team
            </div>
        </footer>
    );
};

export default Footer;
