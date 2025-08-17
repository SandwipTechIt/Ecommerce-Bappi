import { NavLink } from 'react-router-dom';

const DesktopNav = ({ activeStyle }) => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' }
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
      <li>
        <a href="tel:01560044236" className="block">Contact</a>
      </li>
    </ul>
  );
};

export default DesktopNav;