import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api";
import { LoadingSpinner } from "../Components/Ui/Loader";
import ProductCard from "../Components/Ui/ProductCard";
export default () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { data: catepgryProducts, isLoading, error } = useQuery({
        queryKey: ['category', id],
        queryFn: () => getApi(`/getAllProductsByCategory/${id}`)
    })

    if (isLoading) return <LoadingSpinner />
    if (error) return <p>{error.message}</p>
    if (!catepgryProducts || catepgryProducts.length === 0) {
        return <div className="flex flex-col items-center justify-center h-screen heroBg">
            <h2 className="text-2xl font-bold mb-4 text-center ">No Products Found</h2>
            <button onClick={() => navigate('/products')} className="inline-flex items-center px-8 py-4 bg-[#e75c3a] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#e75c3a]/80 transform hover:-translate-y-1 cursor-pointer">
                <span>Explore Our Collection</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    }
    return (
        <div className="max-w-7xl mx-auto pb-4">
            <h2 className="text-2xl font-bold py-6 text-center ">{id} Products</h2>
            <div className="products m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2 md:gap-6 w-full">
            {catepgryProducts?.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
            </div>
        </div>
    )
}