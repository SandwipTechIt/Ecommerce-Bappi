import { NavLink } from 'react-router-dom';
import { CrossIcon } from '../../constants/icons';

const MobileNav = ({ activeStyle, toggleMenu }) => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <div className='fixed inset-0 bg-white z-50 md:hidden'>
      <div className='flex justify-between items-center h-[70px] px-4 border-b' onClick={toggleMenu}>
        <NavLink to='/' className='font-bold text-2xl'>
          Com<span className='text-[#E74C3C]'>fortY</span>
        </NavLink>
        <button onClick={toggleMenu}>
          <CrossIcon className='w-6 h-6' fill='black' />
        </button>
      </div>
      <div className='flex flex-col h-[calc(100%-70px)]'>
        <div className='flex-1 overflow-y-auto'>
          <ul className='flex flex-col py-4'>
            {categories.map((category) => (
              <li key={category.name} className='px-4 py-2'>
                <NavLink
                  to={category.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block text-lg ${isActive ? activeStyle : ''}`
                  }>
                  {category.name}
                </NavLink>
              </li>
            ))}
            <li className='px-4 py-2' onClick={toggleMenu}>
              <a href="tel:01560044236" className="block text-lg">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;