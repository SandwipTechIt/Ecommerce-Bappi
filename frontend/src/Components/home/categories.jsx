// Categories.js
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getApi } from '../../api'
import { LoadingSpinner } from '../Ui/Loader'

const Categories = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient();

  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    queryFn: () => getApi(`/getAllCategories`),
    initialData: () => {
      const seeded = queryClient.getQueryData(['categories']);
      if (seeded) return seeded;
    },
  });

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src =
      'https://thumbs.dreamstime.com/b/image-not-available-icon-vector-set-white-background-eps-330821927.jpg'
  }

  const handleCardKeyDown = (e, name) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/category/${name}`)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  


  return (
    <div className="container mx-auto px-2 py-8">
      <div className="text-center mt-5 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 my-2 md:my-4">
          Shop by Category
        </h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-4">
        {categories?.data?.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:scale-105 w-28 md:w-40"
            onClick={() => navigate(`/category/${category.name}`)}
            onKeyDown={(e) => handleCardKeyDown(e, category.name)}
            role="button"
            tabIndex="0"
          >
            <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden shadow-lg">
              <img
                src={category.categoryImage}
                alt={category.name}
                className="w-[150px] h-[150px] object-contain"
                onError={handleImageError}
              />
            </div>
            <h2 className="mt-2 text-center font-semibold text-lg text-gray-800">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Categories)