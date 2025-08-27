import { Link, useNavigate } from "react-router-dom";
import soldoutImge from "/soldout.png";

export default ({ product }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleBuyNowClick = (event) => {
        event.stopPropagation(); // Stop the event from bubbling up to the Link
        event.preventDefault(); // Prevent default behavior

        navigate(`/order/${product.slug}`); // Navigate to the order page
    };

    return (
        <div id="productCard" className="w-full">
            <Link to={`/product/${product.slug}`} className="block h-full">
                <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-white h-full flex flex-col">
                    {product.status && (
                        <div className="absolute top-2 left-2 bg-[#e75c3a]/85 text-white text-xs font-semibold px-3 py-1 rounded-md z-1">
                            {product.status}
                        </div>
                    )}

                    {/* Product Image */}
                    <div className="w-full flex justify-center items-center relative">
                        <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-full h-36 md:h-[240px] object-cover rounded-md"
                        />
                        {!product.isStock && (
                            <img
                                src={soldoutImge}
                                alt="Sold Out"
                                className="absolute top-0 left-0 h-32 inset-0 m-auto object-cover"
                            />
                        )}
                    </div>

                    {/* Product Data */}
                    <div className="p-2 md:p-4 flex flex-col flex-grow justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1 min-h-[2.5em]">
                                {product.name}
                            </h3>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[2.5em]">
                                    {product.description}
                                </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3  flex-wrap">
                                {
                                    product.price && (
                                        <del className="text-gray-500">
                                        <span className="">৳</span>
                                        {product.price}
                                    </del>
                                    )
                                }
                                <p className="text-xl font-extrabold text-green-600">
                                    <SvgIcon className="md:inline-block align-baseline hidden " />
                                    <span className="md:hidden inline-block ">৳ </span>
                                    {product.discount}
                                </p>
                            </div>
                            <div className="flex justify-center flex-1">
                                <button
                                    onClick={handleBuyNowClick}
                                    disabled={!product.isStock}
                                    className="w-full bg-[#e75c3a] text-white font-semibold py-1 md:py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-200 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
                                >
                                    <span className="hidden md:block">
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </span>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};



const SvgIcon = ({ className = "", ...props }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width="18"
        height="19"
        fill="#00a63e"
        viewBox="0 0 512 512"
        {...props}
    >
        <path d="M304.5 512c-65 0-124.6-50.4-135.5-114.7-5.9-46.9-2.6-93.9-3.4-140.8-8-.2-30.5.2-38.1-.1-21.4-.5-38.2-17.3-38.5-38.3 2.9-45.5 42.9-39.5 76.5-39.3 0-29.6.1-59.8-.1-89.8-.1-5.5-4.1-10.2-9.5-11.2-9.2-1.4-14.5 4.3-15 14.2-1.7 21.2-18.1 36.5-38.9 36.5-21.3.1-38.4-17.2-38.6-38.9C63.1 42.4 100 3.1 147.6.2c47.6-3.2 90.6 32.7 94.5 79.1 2.3 33.5.7 66.2 1.1 99.6 0 0 41.9-.1 54.3-.1 15.7.6 29.6-1.6 45.5 1.8 18.6 5.1 30.1 23.2 27.3 43.2-6.4 34.1-36.3 33.8-64.5 32.8-14-.1-49 0-62.6 0v110.3c-1.3 64.2 81.1 93.8 116.8 39-32.5-10.4-51.6-46.5-40.6-79.5 23.2-70.8 129.3-53.7 128.1 21.2 9.6 86.2-52.9 164.9-143 164.4" />
    </svg>
);