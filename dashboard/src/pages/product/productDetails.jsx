import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getApi, deleteApi } from "../../api";
import Loader from "../../components/shared/Loader";
import ErrorMessage from "../../components/shared/ErrorMessage";
import OrderDetailsTable from "../../components/order/orderDetilsTable";
import ProductCard from "../../components/product/productDetails";

export default () => {
    const { id } = useParams();
    const { data: product, isLoading, error, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getApi(`/getAllProductWithOrders/${id}`),
        keepPreviousData: false,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000, // 5 min
    });
    const handelDeleteOrder = async (id) => {
        try {
            await deleteApi(`/deleteOrder/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    }
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage msg={error?.message} retry={refetch} />;
    return (
        <div>
            <ProductCard product={product}/>
            <OrderDetailsTable orders={product.orders} onDeleteOrder={handelDeleteOrder}/>
        </div>
    );
};