import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const product = {
    "_id": "689dba80eab177a90599dbfd",
    "name": "Nike Air Jordan 1 Retro High",
    "description": "Iconic basketball sneaker with premium leather construction, Air-Sole unit cushioning, and classic Chicago colorway",
    "price": 220,
    "variants": [
        {
            "size": 36,
            "stock": true,
            "_id": "689dba80eab177a90599dbfe"
        },
        {
            "size": 37,
            "stock": false,
            "_id": "689dba80eab177a90599dbff"
        },
        {
            "size": 38,
            "stock": false,
            "_id": "689dba80eab177a90599dbff"
        },
        {
            "size": 39,
            "stock": true,
            "_id": "689dba80eab177a90599dbff"
        },
    ],
    "primaryImage": "http://192.168.0.200:3000/images/primaryImage-1755167359999-857524312.jpg",
    "images": [
        "http://192.168.0.200:3000/images/images-1755167360187-521641940.jpg",
        "http://192.168.0.200:3000/images/images-1755167360208-771233989.jpg",
        "http://192.168.0.200:3000/images/images-1755167360187-521641940.jpg",
        "http://192.168.0.200:3000/images/images-1755167360208-771233989.jpg",
        "http://192.168.0.200:3000/images/images-1755167360187-521641940.jpg",
        "http://192.168.0.200:3000/images/images-1755167360208-771233989.jpg",
        "http://192.168.0.200:3000/images/images-1755167360187-521641940.jpg",
        "http://192.168.0.200:3000/images/images-1755167360208-771233989.jpg",
        "http://192.168.0.200:3000/images/images-1755167360187-521641940.jpg",
        "http://192.168.0.200:3000/images/images-1755167360208-771233989.jpg",
        "http://192.168.0.200:3000/images/images-1755167360187-521641940.jpg",
        "http://192.168.0.200:3000/images/images-1755167360208-771233989.jpg",
    ],
    "status": "limited stock",
    "slug": "nike-air-jordan-1-retro-high",
};

const ProductDetails = () => {
    const { slug } = useParams();



    const [selectedImage, setSelectedImage] = useState(product.primaryImage);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.variants[0].size);

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    // Increment quantity
    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    // Decrement quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };




    return (
        <div className="heroBg ">
            <div className="px-2 sm:px-4 bg-white/50">
                <div className="rounded-lg  overflow-hidden">
                    <div className="md:flex">
                        {/* Product Images */}
                        {/* Redesigned gallery div (assumes images[], selectedImage, setSelectedImage exist) */}
                        <div className="md:w-1/2 p-6">
                            {/* Main image */}
                            <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-full max-h-[400px] object-contain"
                                    loading="eager"
                                    decoding="async"
                                    draggable={false}
                                />
                            </div>

                            {/* Thumbnail rail (performant, horizontally scrollable, snap + lazy-load) */}
                            <div className="mt-4">
                                <div
                                    className="flex gap-2 overflow-x-auto pb-1 -mx-1 snap-x snap-mandatory"
                                    role="listbox"
                                    aria-label="Product thumbnails"
                                >
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setSelectedImage(img)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 focus:outline-none snap-start p-0 ${selectedImage === img ? "border-blue-500" : "border-transparent"
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
                                            // optional: add srcSet/sizes if your backend provides multiple sizes
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* Product Details */}
                        <div className="md:w-1/2 p-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                {/* fixed layout: reset margins, remove mt-1, align svg middle */}
                                <div className="flex gap-2 items-center">
                                    <p className="m-0 flex items-center  font-bold text-gray-900 px-2 py-1 rounded">
                                        <SvgIcon className="md:inline-block align-middle mr-1 hidden " />
                                        <span className="md:hidden inline-block align-middle text-2xl mr-1">৳ </span>
                                        <span className="align-center text-2xl">{product.price}</span>
                                    </p>

                                    <p className="m-0 text-sm bgPrimary text-white font-semibold px-2 py-0.5 rounded-md">
                                        {product.status}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                                <p className="mt-2 text-gray-600">{product.description}</p>
                            </div>

                            {/* Size Selection */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Size</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant._id}
                                            onClick={() => handleSizeSelect(variant.size)}
                                            disabled={!variant.stock}
                                            className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedSize === variant.size
                                                ? 'border-[#e75c3a] bg-[#ffcecad6] text-[#e75c3a]'
                                                : variant.stock
                                                    ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {variant.size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
                                <div className="mt-2 flex items-center">
                                    <button
                                        onClick={decrementQuantity}
                                        className="p-2 rounded-l-md border border-gray-300 bg-gray-100 text-gray-600"
                                    >
                                        <i className="fas fa-minus w-4 h-4"></i>
                                    </button>
                                    <div className="w-12 p-2 text-center border-t border-b border-gray-300">
                                        {quantity}
                                    </div>

                                    <button
                                        onClick={incrementQuantity}
                                        className="p-2 rounded-r-md border border-gray-300 bg-gray-100 text-gray-600"
                                    >
                                        <i className="fas fa-plus w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Link
                                    to={`/order/${product.slug}`}
                                    state={{ quantity, size: selectedSize }}
                                    className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bgPrimary"
                                >
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                    Confirm Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;




const SvgIcon = ({ className = "", ...props }) => (
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
  


