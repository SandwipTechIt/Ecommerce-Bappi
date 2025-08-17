import React from "react";
import { Link } from "react-router-dom";

const FacebookIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

export default () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#16213f] border-t border-slate-200 py-6">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="flex flex-row  justify-between gap-6 max-w-5xl mx-auto">
                    <div className="flex-1 flex flex-col sm:items-start ">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <img
                                src="/logo.jpeg"
                                alt="ComfortStep Logo"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-2 text-sm text-white max-w-xs leading-snug">
                            Where comfort meets your step.
                        </p>

                        <div className="mt-3">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-shadow shadow-sm">
                                <FacebookIcon className="w-6 h-6" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col  gap-6 sm:gap-8">
                        <nav className="flex flex-col space-y-2 text-sm">
                            <Link to="/" className="text-white hover:text-white transition">
                                Home
                            </Link>
                            <Link to="/products" className="text-white hover:text-white transition">
                                Products
                            </Link>
                            <a href="tel:01560044236" className="text-white hover:text-white transition">
                                Contact
                            </a>
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
