import { NavLink } from 'react-router-dom';

const DesktopNav = ({ activeStyle }) => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <ul className='hidden md:flex items-center gap-3 ml-4'>
      {categories.map((category) => (
        <li key={category.name}>
          <NavLink
            to={category.path}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            {category.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNav;