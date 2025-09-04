import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Components/Ui/Loader';
import { getApi } from '../api';
import { PlusIcon, MinusIcon, ShopIcon } from '../constants/icons';

// ProductImages Component
const ProductImages = ({ product, selectedImage, setSelectedImage }) => {
  const images = [
    ...new Set([
      product.primaryImage,
      ...(product.images || []),
    ].filter(Boolean)),
  ];

  return (
    <div className="md:w-1/2 p-2 md:p-4 lg:p-6 ">
      {/* Main image */}
      <div className="relative md:w-[500px] md:h-[500px] w-full h-[400px] rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={selectedImage || product.primaryImage || product.images?.[0] || '/placeholder.png'}
          alt={product.name || 'Product'}
          className="w-full h-full object-cover md:object-contain"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Thumbnail rail */}
      <div className="mt-4">
        <div
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 snap-x snap-mandatory show-scrollbar "
          role="listbox"
          aria-label="Product thumbnails"
        >
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 focus:outline-none snap-start p-0 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'
                }`}
              aria-selected={selectedImage === img}
              aria-label={`Show image ${i + 1}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-center object-cover"
                loading="lazy"
                decoding="async"
                width="80"
                height="80"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ProductInfo Component
const ProductInfo = ({ product }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="flex gap-2 items-center">
        <p className="m-0 flex items-center font-bold text-gray-900 px-2 py-1 rounded">

          {product.price && (
            <del className="text-gray-500 mr-2">৳{product.price}</del>
          )}

          <SvgIcon className="md:inline-block align-middle mr-1 hidden" />
          <span className="md:hidden inline-block align-middle text-2xl mr-1">৳ </span>
          <span className="align-center text-2xl">{product.discount}</span>
        </p>
        {
          product.status && <p className="m-0 text-sm bgPrimary text-white font-semibold px-2 py-0.5 rounded-md">
            {product.status}
          </p>
        }
      </div>
    </div>
  );
};

// ProductDescription Component
const ProductDescription = ({ description }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Description</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

// SizeSelector Component
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

// ColorSelector Component
const ColorSelector = ({ colors, selectedColor, handleColorSelect }) => {
  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Available Colors</h3>
      <div className="mt-2 flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleColorSelect(color)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color ? 'ring-2 ring-offset-1 ring-blue-500' : ''
            } ${color.toLowerCase() === '#ffffff' || color.toLowerCase() === 'white' ? 'border-gray-300' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

// QuantitySelector Component
const QuantitySelector = ({ quantity, incrementQuantity, decrementQuantity, handleQuantityChange }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
      <div className="mt-2 flex items-center">
        <button
          onClick={decrementQuantity}
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
          onClick={incrementQuantity}
          className="p-2 rounded-r-md border border-gray-800 bg-gray-100 text-gray-600"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ActionButtons Component
const ActionButtons = ({ product, quantity, selectedSize, selectedColor }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      {
        (product.isStock && selectedSize && selectedColor) ? (
          <Link
            to={`/order/${product.slug}`}
            state={{ quantity, size: selectedSize, color: selectedColor }}
            className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bgPrimary"
          >
            <ShopIcon className="w-6 h-6 mr-2" fill="white" />
            Confirm Order
          </Link>
        ) : (
          <button
            className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 cursor-not-allowed"
          >
            {product.isStock ? (selectedSize ? 'Select Color' : 'Select Size') : 'Out of Stock'}
          </button>
        )
      }
    </div>
  );
};

// SvgIcon Component
const SvgIcon = ({ className = '', ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="22"
    height="22"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M304.5 512c-65 0-124.6-50.4-135.5-114.7-5.9-46.9-2.6-93.9-3.4-140.8-8-.2-30.5.2-38.1-.1-21.4-.5-38.2-17.3-38.5-38.3 2.9-45.5 42.9-39.5 76.5-39.3 0-29.6.1-59.8-.1-89.8-.1-5.5-4.1-10.2-9.5-11.2-9.2-1.4-14.5 4.3-15 14.2-1.7 21.2-18.1 36.5-38.9 36.5-21.3.1-38.4-17.2-38.6-38.9C63.1 42.4 100 3.1 147.6.2c47.6-3.2 90.6 32.7 94.5 79.1 2.3 33.5.7 66.2 1.1 99.6 0 0 41.9-.1 54.3-.1 15.7.6 29.6-1.6 45.5 1.8 18.6 5.1 30.1 23.2 27.3 43.2-6.4 34.1-36.3 33.8-64.5 32.8-14-.1-49 0-62.6 0v110.3c-1.3 64.2 81.1 93.8 116.8 39-32.5-10.4-51.6-46.5-40.6-79.5 23.2-70.8 129.3-53.7 128.1 21.2 9.6 86.2-52.9 164.9-143 164.4" />
  </svg>
);

// Main ProductDetails Component
const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['detailedProduct', slug],
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    queryFn: () => getApi(`/getProductBySlug/${slug}`),
    initialData: () => {
      const seeded = queryClient.getQueryData(['detailedProduct', String(slug)]);
      if (seeded) return seeded;
      const list = queryClient.getQueryData(['productWithDetails']);
      return Array.isArray(list) ? list.find(p => String(p.slug) === String(slug)) : undefined;
    },
    retry: 1
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (!product) return;

    const primary = product.primaryImage ?? (product.images && product.images.length ? product.images[0] : null);
    setSelectedImage(primary);

    const defaultSize = null;
    setSelectedSize(defaultSize);
  }, [product]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(10, prev + 1));
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);

  // Show spinner only if we don't even have cached data
  if (isLoading && !product) return <div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>
  // If API failed but we have cached product, continue rendering with it
  if (isError && !product) {
    navigate('/not-found')
    return
  }
  if (!product) return (
    <div className="p-6">
      <p className="text-gray-700">Product not found.</p>
    </div>
  );
  return (
    <div className="heroBg">
      <div className="px-2 sm:px-4 pb-20 bg-white/50 ">
        <div className="rounded-lg overflow-hidden max-w-7xl mx-auto">
          <div className="md:flex justify-between">
            {/* Product Images */}
            <ProductImages
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            {/* Product Details */}
            <div className="md:w-1/2 p-2 md:p-4 lg:p-6 ">
              <ProductInfo product={product} />
              <ProductDescription description={product.description} />
              <SizeSelector
                variants={product.variants}
                selectedSize={selectedSize}
                handleSizeSelect={handleSizeSelect}
              />
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                handleColorSelect={handleColorSelect}
              />
              <QuantitySelector
                quantity={quantity}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                handleQuantityChange={handleQuantityChange}
              />
              <ActionButtons
                product={product}
                quantity={quantity}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;