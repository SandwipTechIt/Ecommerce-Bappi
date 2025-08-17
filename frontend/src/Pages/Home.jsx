import { lazy, Suspense } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Components/Ui/Loader';
import Hero from '../Components/home/hero';
import Features from '../Components/home/features';
// const Hero = lazy(() => import('../Components/home/hero'));
const ProductSection = lazy(() => import('../Components/home/productSection'));


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


    return (
        <div>
            <Hero />
            <Suspense fallback={<LoadingSpinner />}>
                <ProductSection />
            </Suspense>
            <Features />
        </div>
    )
}