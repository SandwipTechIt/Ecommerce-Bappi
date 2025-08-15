import React from 'react';

const SearchNav = ({ toggleSearch }) => {
  const suggestedProducts = [
    { id: 1, name: 'Wireless Headphones', price: '$99' },
    { id: 2, name: 'Smart Watch', price: '$199' },
    { id: 3, name: 'Portable Speaker', price: '$49' },
    { id: 4, name: 'Laptop Backpack', price: '$79' },
  ];

  return (
    <div className='fixed inset-0 z-50 md:bg-black/50'>
      <div className='bg-white md:w-[400px] md:ml-auto h-screen'>
        <div className='flex justify-between items-center h-[70px] px-4 border-b '>
          <span className='font-bold text-2xl md:hidden'>Shopi</span>
          <span className='font-bold text-2xl hidden md:block'>Search</span>
          <button onClick={toggleSearch}>
            <i className='fa-solid fa-xmark text-2xl'></i>
          </button>
        </div>
        <div className='p-4 bg-white h-[calc(100vh-70px)]'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for products...'
              className='w-full p-2 border rounded-lg pl-10'
            />
            <i className='fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'></i>
          </div>
          <div className='mt-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>Suggestions</h3>
            <ul>
              {suggestedProducts.map((product) => (
                <li key={product.id} className='py-2 border-b flex justify-between'>
                  <span>{product.name}</span>
                  <span className='font-medium'>{product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchNav;
