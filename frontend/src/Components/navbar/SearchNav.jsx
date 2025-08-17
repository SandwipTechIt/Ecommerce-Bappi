import React, { useState } from 'react';
import { SearchIcon, CrossIcon } from '../../constants/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getApi } from '../../api';
import { Link, NavLink } from 'react-router-dom';
const SearchNav = ({ toggleSearch }) => {
  const queryClient = useQueryClient();
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['productWithDetails'],
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    queryFn: () => getApi('getAllProductsWithDetails'),
    initialData: () => {
      const seeded = queryClient.getQueryData(['productWithDetails']);
      if (seeded) return seeded;
      const list = queryClient.getQueryData(['productWithDetails']);
      return Array.isArray(list) ? list.find(p => String(p.slug) === String(slug)) : undefined;
    },
  });


  const [searchValue, setSearchValue] = useState('');
  const filteredProducts = product?.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  };



  return (
    <div className='fixed inset-0 z-50 md:bg-black/50'>
      <div className='bg-white md:w-[400px] md:ml-auto h-screen'>
        <div className='flex justify-between items-center h-[70px] px-4 border-b' onClick={toggleSearch}>
          <NavLink to='/' className='font-bold text-2xl'>
            Com<span className='text-[#E74C3C]'>fortY</span>
          </NavLink>
          <button onClick={toggleSearch}>
            <CrossIcon className='w-8 h-8' fill='black' />
          </button>
        </div>
        <div className='p-4 bg-white h-[calc(100vh-70px)]'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for products...'
              className='w-full p-2 border rounded-lg pl-10'
              value={searchValue}
              onChange={handleSearch}
            />
            <SearchIcon className='w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 ' fill='#99a1af' />
          </div>
          {filteredProducts?.length > 0 ? (
            <div className='mt-6 max-h-[calc(100vh-150px)] hide-scrollbar overflow-y-auto hide-scrollbar'>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>Suggestions</h3>
              <ul className='pb-20'>
                {filteredProducts?.map((product) => (
                  <li key={product.id} className='py-2 border-b' onClick={toggleSearch} >
                    <Link to={`/product/${product.slug}`} className='flex items-center gap-4'>
                      <div className="img">
                        <img src={product.primaryImage} alt={product.name} className='w-14 h-14 object-cover' />
                      </div>
                      <div className="data flex flex-col ">
                        <span className='text-lg font-medium'>{product.name}</span>
                        <span className='text-gray-500'>{product.price}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className='mt-6 max-h-[calc(100vh-150px)] overflow-y-auto hide-scrollbar'>
              <h3 className='text-lg font-semibold text-gray-800 mb-2 text-center'>No Product Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchNav;
