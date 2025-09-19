import { lazy, Suspense } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Components/Ui/Loader';
import Hero from '../Components/home/hero';
import Features from '../Components/home/features';
import Reviews from '../Components/home/reviews';
const ProductSection = lazy(() => import('../Components/home/productSection'));
const TopSellingProducts = lazy(() => import('../Components/home/topSellingProducts'));
const LatestProducts = lazy(() => import('../Components/home/latestProducts'));
const Categories = lazy(() => import('../Components/home/categories'));

import { getApi } from '../api';

export default () => {

    const queryClient = useQueryClient();
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () => getApi('getProducts'),
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    useQuery({
        queryKey: ['productWithDetails'],
        queryFn: () => getApi('getProductsWithDetails'),
        enabled: !!products,
        onSuccess: (allDetailedProducts) => {
            allDetailedProducts.forEach(product => {
                queryClient.setQueryData(['detailedProduct', String(product.slug)], product);
            });
        },
    });

    useQuery({
        queryKey: ['categories'],
        queryFn: () => getApi('getAllCategories'),
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });

    
    return (
        <div>
            <Hero />
            <Suspense fallback={<LoadingSpinner />}>
                <div className='max-w-7xl mx-auto'>
                    <Categories />
                    <ProductSection />
                    <TopSellingProducts />
                    <Reviews />
                    <LatestProducts />
                </div>
            </Suspense>
            <Features />
        </div>
    )
}