import React from "react";
import { Link } from "react-router-dom";

import { FacebookIcon,  WhatsAppIcon, InstagramIcon, TiktokIcon } from "../../constants/icons";

export default () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#16213f] border-t border-slate-200 py-6">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="flex flex-row pb-5 justify-between gap-2 max-w-5xl mx-auto">
                    <div className="flex-1 flex flex-col sm:items-start ">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <img
                                src="/logo.jpg"
                                alt="ComfortStep Logo"
                                className="h-8 w-auto object-contain rounded-sm"
                            />
                        </Link>

                        <p className="mt-2 text-sm text-white max-w-xs leading-snug">
                            Where comfort meets your step.
                        </p>

                        <div className="mt-3 flex gap-2">
                            <a href="https://www.facebook.com/comfortyzone" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-shadow shadow-sm">
                                <FacebookIcon className="w-6 h-6" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://wa.me/8801560044236" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-shadow shadow-sm">
                                <WhatsAppIcon className="w-6 h-6" />
                                <span className="sr-only">WhatsApp</span>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-shadow shadow-sm">
                                <InstagramIcon className="w-6 h-6" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-shadow shadow-sm">
                                <TiktokIcon className="w-6 h-6" />
                                <span className="sr-only">Tiktok</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col  gap-6 sm:gap-8">
                        <nav className="grid grid-cols-2 gap-4 text-sm">
                            <Link to="/" className="text-white hover:text-white transition hover:underline">
                                Home
                            </Link>
                            <Link to="/products" className="text-white hover:text-white transition hover:underline">
                                Products
                            </Link>
                            <Link to="/categories" className="text-white hover:text-white transition hover:underline">
                                Categories
                            </Link>
                            <Link to="/about" className="text-white hover:text-white transition hover:underline">
                                About Us
                            </Link>
                            <Link to="/privacy-policy" className="text-white hover:text-white transition hover:underline">
                                Privacy Policy
                            </Link>
                            <Link to="/contact" className="text-white hover:text-white transition hover:underline">
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-2 pt-4 border-t border-slate-100 flex flex-col items-center justify-between gap-3">
                    <p className="text-sm text-slate-200">© {year} Comforty. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
