import { lazy, Suspense } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Components/Ui/Loader';
import Hero from '../Components/home/hero';
import Features from '../Components/home/features';
// const Hero = lazy(() => import('../Components/home/hero'));
const ProductSection = lazy(() => import('../Components/home/productSection'));
const Categories = lazy(() => import('../Components/home/categories'));
const Slogan = lazy(() => import('../Components/home/slogan'));

import { getApi } from '../api';

export default () => {

    const queryClient = useQueryClient();
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () => getApi('products'),
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    useQuery({
        queryKey: ['productWithDetails'],
        queryFn: () => getApi('getAllProductsWithDetails'),
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

    const { data: slogans } = useQuery({
        queryKey: ['slogans'],
        queryFn: () => getApi('getSlogan'),
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
                    {
                        slogans && <Slogan data={slogans} />
                    }
                </div>
            </Suspense>
            <Features />
        </div>
    )
}