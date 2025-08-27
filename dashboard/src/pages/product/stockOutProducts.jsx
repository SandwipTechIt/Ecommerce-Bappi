import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductTable } from "../../components/product/productTable.jsx";
import Loader from "../../components/shared/Loader.jsx";
import { getApi, deleteApi } from "../../api";

const StockOutProducts = () => {
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const queryClient = useQueryClient();

    // Fetch students data using React Query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["stockOutProducts", pagination.currentPage],
        queryFn: () => getApi("stockOutProducts"),
        keepPreviousData: true,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });

    // Update total pages when data changes
    useEffect(() => {
        if (data?.totalPages) {
            setPagination((prev) => ({ ...prev, totalPages: data.totalPages }));
        }
    }, [data]);

    // Delete student mutation
    const deleteProductMutation = useMutation({
        mutationFn: (id) => deleteApi(`deleteProduct/${id}`),
        onSuccess: () =>
            queryClient.invalidateQueries(["stockOutProducts", pagination.currentPage]),
    });

    if (isLoading) {
        return <Loader/>
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <div id="allProduct">
            <div className="productContainer flex flex-col">

                <div className="productTable">
                    <ProductTable
                        products={data}
                        onDeleteProduct={(id) => deleteProductMutation.mutate(id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default StockOutProducts;
