import { NavLink } from 'react-router-dom';

const DesktopNav = ({ activeStyle }) => {
  const categories = [
    { name: 'All', path: '/' },
    { name: 'Clothes', path: '/clothes' },
    { name: 'Electronics', path: '/electronics' },
    { name: 'Furnitures', path: '/furnitures' },
    { name: 'Toys', path: '/toys' },
    { name: 'Others', path: '/others' },
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