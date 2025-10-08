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
          <img src={"/logo.jpg"} alt="" className='h-8 md:hidden' />
          </NavLink>
          <button onClick={toggleSearch}>
            <CrossIcon className='w-6 h-6' fill='black' />
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
                    <Link to={`/product/${product.slug}`} className='flex gap-4'>
                      <div className="w-18 h-18 ">
                        <img src={product.primaryImage} alt={product.name} className='img w-full h-full rounded-sm' />
                      </div>
                      <div className="data flex flex-1 flex-col">
                        <p className='text-lg font-medium line-clamp-2'>{product.name}</p>
                        <div className='flex gap-2'>
                          <del className='text-gray-500'>{product.price}</del>
                          <span className='text-[#E74C3C]'>{product.discount}</span>
                        </div>
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
