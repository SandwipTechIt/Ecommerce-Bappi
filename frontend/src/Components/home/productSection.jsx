import ProductCard from "../Ui/ProductCard";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from "../Ui/Loader";
import { getApi } from "../../api";

export default () => {
    const queryClient = useQueryClient();
    const { data: products, isLoading, error } = useQuery({
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

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;



    return (
        <section className="w-full bg-white ">
            <div className="w-full py-6">
                {/* <h2 className="text-2xl font-bold mb-4 text-center ">All Products</h2> */}
                <div className="products container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 md:gap-6 place-items-center w-full ">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}