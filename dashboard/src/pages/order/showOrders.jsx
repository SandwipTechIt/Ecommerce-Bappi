import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderTable } from "../../components/order/orderTable.jsx";
import { getApi, deleteApi } from "../../api";

const AllOrders = () => {
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const queryClient = useQueryClient();

    // Fetch students data using React Query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders", pagination.currentPage],
        queryFn: () => getApi("getOrders"),
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
    const deleteOrderMutation = useMutation({
        mutationFn: (id) => deleteApi(`deleteOrder/${id}`),
        onSuccess: () =>
            queryClient.invalidateQueries(["orders", pagination.currentPage]),
    });

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <div id="allProduct">
            <div className="productContainer flex flex-col">

                <div className="productTable">
                    <OrderTable
                        orders={data}
                        onDeleteOrder={(id) => deleteOrderMutation.mutate(id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
