import { NavLink } from 'react-router-dom';

const MobileNav = ({ activeStyle, toggleMenu }) => {
  const categories = [
    { name: 'All', path: '/' },
    { name: 'Clothes', path: '/clothes' },
    { name: 'Electronics', path: '/electronics' },
    { name: 'Furnitures', path: '/furnitures' },
    { name: 'Toys', path: '/toys' },
    { name: 'Others', path: '/others' },
  ];

  return (
    <div className='fixed inset-0 bg-white z-50 md:hidden'>
      <div className='flex justify-between items-center py-5 px-4 border-b'>
        <span className='font-bold text-2xl'>Shopi</span>
        <button onClick={toggleMenu}>
          <i className='fa-solid fa-xmark text-2xl'></i>
        </button>
      </div>
      <div className='flex flex-col h-[calc(100%-76px)]'>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;