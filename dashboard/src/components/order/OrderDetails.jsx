import React from 'react';
import { formateDate } from '../../utiils/formateDate';

export default function OrderDetails({ order }) {
  const { productID } = order;

  return (
    <div className="bgGlass rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Order #{order._id}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Card */}
        <div>
          <h3 className="font-bold mb-2 dark:text-gray-200">Product</h3>
          <img
            src={`http://192.168.0.200:3000/images/${productID.primaryImage}`}
            alt={productID.name}
            className="h-60 w-full md:h-80 md:w-full object-cover rounded"
          />
          <p className="mt-2 font-semibold text-lg dark:text-gray-200">{productID.name}</p>
          <p className="text-gray-600 dark:text-gray-200">Price: ৳ {productID.price}</p>
          <p className="text-sm text-gray-500 dark:text-gray-200">Status: {productID.status}</p>
        </div>

        {/* Order Info */}
        <div className="dark:bg-gray-800 rounded-xl p-2 md:p-6">
  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
    Customer Information
  </h3>

  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
    <div className="flex justify-between">
      <span className="font-medium">Name:</span>
      <span>{order.name}</span>
    </div>

    <div className="flex justify-between">
      <span className="font-medium">Phone:</span>
      <span>{order.number}</span>
    </div>

    <div className="flex justify-between">
      <span className="font-medium">Address:</span>
      <span className="max-w-[200px] text-right">{order.address}</span>
    </div>

    <hr className="my-3 border-gray-200 dark:border-gray-600" />

    <div className="flex justify-between">
      <span className="font-medium">Quantity:</span>
      <span>{order.quantity}</span>
    </div>

    <div className="flex justify-between text-base font-semibold text-gray-900 dark:text-white">
      <span>Total:</span>
      <span>৳ {(Number(productID.price) * Number(order.quantity))}</span>
    </div>

    <hr className="my-3 border-gray-200 dark:border-gray-600" />

    <div className="flex justify-between">
      <span className="font-medium">Status:</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-bold
          ${
            order.status === 'completed'
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : order.status === 'cancelled'
              ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
          }`}
      >
        {order.status}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="font-medium">Ordered on:</span>
      <span>{formateDate(order.createdAt)}</span>
    </div>

    {order.note && (
      <>
        <hr className="my-3 border-gray-200 dark:border-gray-600" />
        <div>
          <span className="font-medium">Note:</span>
          <p className="mt-1 text-gray-600 dark:text-gray-400 italic">
            {order.note}
          </p>
        </div>
      </>
    )}
  </div>
</div>
      </div>
    </div>
  );
}