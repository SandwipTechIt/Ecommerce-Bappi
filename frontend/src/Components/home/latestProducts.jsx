import ProductCard from "../Ui/ProductCard";
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from "../Ui/Loader";
import { getApi } from "../../api";

export default () => {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['latestProducts'],
        queryFn: () => getApi('latestProducts'),
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

console.log(products);


    return (
        <section className="w-full bg-white ">
            <div className="w-full px-2 py-6">
            <div className="w-full flex  justify-center md:justify-start">
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-double border-gray-400">Latest Products</h2>
                </div>
                <div className="products  m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2 md:gap-6  w-full ">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}