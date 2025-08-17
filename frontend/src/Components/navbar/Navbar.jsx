import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DesktopNav from './DesktopNav.jsx';
import MobileNav from './MobileNav.jsx';
import SearchNav from './SearchNav.jsx';
import { SearchIcon, MenuIcon, CrossIcon } from '../../constants/icons';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const activeStyle = 'underline underline-offset-4 font-semibold';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <nav className='fixed z-10 top-0 w-full bg-white shadow-sm h-[70px] '>
            <div className='flex items-center justify-between h-full px-4 md:px-8'>
                {/* Logo */}
                <NavLink to='/' className='font-bold text-2xl'>
                Com<span className='text-[#E74C3C]'>fortY</span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className='hidden md:flex'>
                    <DesktopNav activeStyle={activeStyle} />
                </div>

                {/* Icons and Auth Buttons */}
                <div className='flex items-center gap-4'>

                    {/* Search Desktop Buttons
                    <div className='hidden md:flex items-center gap-3'>
                        <input type='text' placeholder='Search' className='p-2 border rounded-lg' />
                        <button onClick={handleSearch} className='text-2xl bg-black rounded-lg py-1 px-4'>
                            <i className='fa-solid fa-search text-white'></i>
                        </button>
                    </div> */}

                    {/* Search Icon */}
                    <button onClick={toggleSearch} className='text-2xl'>
                        <SearchIcon className='w-6 h-6' fill='black' />
                    </button>

                    {/* Mobile Menu Icon */}
                    <button className='md:hidden' onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <CrossIcon className='w-6 h-6' fill='black' />
                        ) : (
                            <MenuIcon className='w-6 h-6' fill='black' />
                        )}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <MobileNav
                    activeStyle={activeStyle}
                    toggleMenu={toggleMenu}
                />
            )}
            {isSearchOpen && <SearchNav toggleSearch={toggleSearch} />}
        </nav>
    );
};

export default Navbar;