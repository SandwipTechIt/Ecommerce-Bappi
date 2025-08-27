import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import CouponTable from '../../components/coupon/couponTable';
import { getApi, deleteApi } from '../../api';
import { useQuery } from '@tanstack/react-query';


export default () => {
    const {data, isLoading, isError, error,refetch} = useQuery({
        queryKey: ["coupons"],
        queryFn: () => getApi("getAllCoupon"),
        keepPreviousData: true,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });

    const handleDeleteCoupon = async (id) => {
        try {
            await deleteApi(`deleteCoupon/${id}`);
            refetch();
        } catch (error) {
            alert("Failed to delete coupon");
        }
    };
    return (
        <div>
            <CouponTable coupons={data} onDeleteCoupon={handleDeleteCoupon} />
        </div>
    )
}

