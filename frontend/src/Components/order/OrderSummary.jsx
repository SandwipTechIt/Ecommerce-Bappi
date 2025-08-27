// src/pages/Order/OrderSummary.jsx
import React from 'react';
import { MinusIcon, PlusIcon } from '../../constants/icons';

const SizeSelector = ({ variants, selectedSize, handleSizeSelect }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Size</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {(variants || []).map((variant) => (

          variant.stock ? (
            <button
              key={variant._id || variant.size}
              onClick={() => handleSizeSelect(variant.size)}
              disabled={!variant.stock}
              className={`px-4 relative overflow-hidden py-2 border rounded-md text-sm font-medium ${selectedSize === variant.size
                ? 'border-[#e75c3a] bg-[#ffcecad6] text-[#e75c3a]'
                : variant.stock
                  ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              {variant.size}
            </button>
          ) : (
            <button
              key={variant._id || variant.size}
              onClick={() => handleSizeSelect(variant.size)}
              disabled={!variant.stock}
              className={`disableButton px-4 relative overflow-hidden py-2 border rounded-md text-sm font-medium border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed`}
            >
              {variant.size}
            </button>
          )

        ))}
      </div>
    </div>
  );
};

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="">
      <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
      <div className="mt-2 flex items-center">
        <button
          onClick={() => setQuantity(Math.max(Number(quantity) - 1, 1))}
          className="p-2 rounded-l-md border border-gray-800 bg-gray-100 text-gray-600"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <div
          className="w-12 py-1 text-center border-t border-b border-gray-800"
        >
          {quantity}
        </div>
        <button
          onClick={() => setQuantity(Math.min(Number(quantity) + 1, 10))}
          className="p-2 rounded-r-md border border-gray-800 bg-gray-100 text-gray-600"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};



const SvgIcon = ({ className = '', ...props }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" {...props}>
    <path d="M164 96.3c-17.6-2.2-33.6 10.2-35.7 27.7s10.2 33.6 27.7 35.8l7.9 1c16 2 28 15.6 28 31.8v31.5h-40c-13.3 0-24 10.7-24 24s10.7 24 24 24h40v176c0 53 43 96 96 96h32c106 0 192-86 192-192v-32c0-53-43-96-96-96h-16c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128h-32c-17.7 0-32-14.3-32-32v-176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24h-40v-31.5c.1-48.5-35.9-89.4-84-95.4l-7.9-1z"></path>
  </svg>
);

const OrderSummary = ({ product, size, setSize, quantity, setQuantity, subtotal, shippingCost, discountAmount, totalCost }) => {
  return (
    <div className="border border-gray-200 rounded p-4 space-y-4">
      <img
        src={product.primaryImage}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <SizeSelector
        variants={product.variants}
        selectedSize={size}
        handleSizeSelect={setSize}
      />

      <div className="flex justify-between items-center pt-2">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <div className="text-right ">
          <span className="text-gray-500">Unit price:</span>{' '}
          <span className="font-bold ">
            <SvgIcon className="md:inline-block align-middle hidden w-5 h-5" />
            <span className="md:hidden inline-block align-middle text-2xl mr-1">৳ </span>
            {product.discount}
          </span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({quantity} items):</span>
          <span>৳{subtotal}</span>
        </div>
        
        {shippingCost > 0 && (
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>৳{shippingCost}</span>
          </div>
        )}
        
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount:</span>
            <span>-৳{discountAmount}</span>
          </div>
        )}
        
        <div className="border-t pt-2 flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="flex items-center">
            <SvgIcon className="md:inline-block align-middle hidden w-5 h-5" />
            <span className="md:hidden inline-block align-middle text-2xl mr-0.5">৳</span>
            {totalCost}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;