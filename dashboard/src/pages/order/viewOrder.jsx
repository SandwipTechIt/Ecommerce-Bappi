import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getApi } from '../../api';
import Loader from '../../components/shared/Loader';
import ErrorMessage from '../../components/shared/ErrorMessage';
import OrderDetails from '../../components/order/OrderDetails';
import StatusChanger from '../../components/order/StatusChanger';

export default function ShowOrderPage() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getApi(`/getOrder/${id}`),
    keepPreviousData: false,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 min
  });

  if (isLoading) return <Loader />;
  if (error)   return <ErrorMessage msg={error?.message} retry={refetch} />;

  return (
    <div className="max-w-5xl bgGlass mx-auto p-4 space-y-6">
      <OrderDetails order={order} />
      <StatusChanger order={order} onStatusUpdated={refetch} />
    </div>
  );
}