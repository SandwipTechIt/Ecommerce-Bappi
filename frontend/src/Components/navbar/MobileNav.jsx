import { NavLink } from 'react-router-dom';
import { CrossIcon } from '../../constants/icons';
import { FacebookIcon, WhatsAppIcon, InstagramIcon, TiktokIcon } from '../../constants/icons';
const MobileNav = ({ activeStyle, toggleMenu }) => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy-policy' }
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

            <li className='px-4 py-2 flexjustify-center gap-2' onClick={toggleMenu}>
              <h2 className='text-lg font-semibold mb-2'>Follow Us</h2>
              <div className='flex gap-2'>
               <a href="https://www.facebook.com/comfortyzone" target="_blank" rel="noopener noreferrer">
                <FacebookIcon url="facebook.com" target="_blank" className='w-10 flex items-center justify-center rounded-full' fill='#1877F2'/>                 
               </a>
               <a href="https://wa.me/8801560044236" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon url="whatsapp.com" target="_blank" className='w-10 flex items-center justify-center rounded-full' fill='#25D366'/>                 
               </a>

               <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon url="instagram.com" target="_blank" className='w-10 flex items-center justify-center rounded-full' fill='#E4405F'/>                 
               </a>

               <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                <TiktokIcon url="tiktok.com" target="_blank" className='w-10 flex items-center justify-center rounded-full' fill='#000000'/>                 
               </a>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;