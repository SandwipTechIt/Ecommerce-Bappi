const Alert = ({ type = 'error', message, isOpen, onClose }) => {
    if (!isOpen) return null;

    const typeStyles = {
        error: {
            border: 'border-red-500',
            text: 'text-red-700',
            bg: 'bg-red-50',
            icon: (
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        },
        success: {
            border: 'border-green-500',
            text: 'text-green-700',
            bg: 'bg-green-50',
            icon: (
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    };

    const styles = typeStyles[type];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 bg-opacity-50"
            onClick={onClose}
        >
            <div
                className={`relative w-full max-w-md mx-4 p-4 rounded-lg border ${styles.border} ${styles.bg} ${styles.text}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Close alert"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {styles.icon}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getApi, postApi } from '../api';
import OrderForm from '../Components/order/OrderForm';
import OrderSummary from '../Components/order/OrderSummary';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WhatsAppIcon } from '../constants/icons';

const Order = () => {
    const { slug } = useParams();
    const { state } = useLocation();           // may contain { size, quantity }

    /* ---------- local state ---------- */
    const [size, setSize] = useState(state?.size || '');
    const [quantity, setQuantity] = useState(state?.quantity || 1);
    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: '',
    });
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        address: '',
        note: '',
    });

    const queryClient = useQueryClient();
    const { data: product, isLoading: loading, error } = useQuery({
        queryKey: ['detailedProduct', slug],
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        queryFn: () => getApi(`/getProductBySlug/${slug}`),
        // Seed from cache if available (from Home/ProductSection prefetch)
        initialData: () => {
            const seeded = queryClient.getQueryData(['detailedProduct', String(slug)]);
            if (seeded) return seeded;
            const list = queryClient.getQueryData(['productWithDetails']);
            return Array.isArray(list) ? list.find(p => String(p.slug) === String(slug)) : undefined;
        },
    });


    /* ---------- handlers ---------- */
    const handlePlaceOrder = async () => {
        if (!formData.name || !formData.number || !formData.address) {
            setAlert({
                isOpen: true,
                type: 'error',
                message: 'Please fill all the fields',
            });
            return;
        }
        if (!size) {
            setAlert({
                isOpen: true,
                type: 'error',
                message: 'Please select a size',
            });
            return;
        }
        try {
            const payload = {
                ...formData,
                productID: product._id,
                size,
                quantity,
            };
            await postApi('createOrder', payload);
            setFormData({
                name: '',
                number: '',
                address: '',
                note: '',
            });
            setAlert({
                isOpen: true,
                type: 'success',
                message: 'Order placed successfully!',
            });
        } catch (err) {
            console.log(err);
            setAlert({
                isOpen: true,
                type: 'error',
                message: err?.message,
            });
        }
    };
    const handleWhatsApp = () => {
        window.open(`https://wa.me/8801560044236?text=I%20want%20to%20order%20${product.name}`, '_blank');
    };
    /* ---------- early returns ---------- */
    if (loading) return <p className="text-center p-8">Loading product…</p>;
    if (error) return <p className="text-center text-red-600 p-8">{error?.message}</p>;
    if (!product) return null;

    const totalCost = product.discount * quantity;

    return (
        <section className='heroBg'>
            <Alert type={alert.type} message={alert.message} isOpen={alert.isOpen} onClose={() => setAlert({ isOpen: false })} />
            <div className="container bg-white/50 ">
                <div className="max-w-5xl mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8 ">
                    <section className='order-2 md:order-1'>
                        <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Shipping Info</h2>
                        <OrderForm formData={formData} onChange={setFormData} />
                        <div className="hidden md:block">
                            {
                                product.isStock
                                    ? (
                                        <>
                                            <button
                                                onClick={handlePlaceOrder}
                                                className="w-full mt-6 font-semibold order-1 md:order-2 bg-[#e75c3a] text-white py-2 rounded  transition disabled:opacity-50"
                                            >
                                                Confirm Order
                                            </button>
                                            <button
                                                onClick={handleWhatsApp}
                                                className="w-full mt-2 font-semibold order-1 md:order-2 bg-[#25D366] text-white py-2 rounded  transition disabled:opacity-50 flex gap-2 items-center justify-center"
                                            >
                                                <WhatsAppIcon className="w-6 h-6" fill="white" />
                                                WhatsApp
                                            </button>
                                        </>
                                    )
                                    : (
                                        <button
                                            disabled
                                            className="w-full mt-6 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 cursor-not-allowed"
                                        >
                                            Out of Stock
                                        </button>
                                    )
                            }
                        </div>
                        <div className="fixed container bg-white !px-6 !pb-4 bottom-0 left-0 w-full md:hidden">
                            {
                                product.isStock
                                    ? (
                                        <>
                                            <button
                                                onClick={handlePlaceOrder}
                                                className="w-full mt-6 font-semibold order-1 md:order-2 bg-[#e75c3a] text-white py-2 rounded  transition disabled:opacity-50"
                                            >
                                                Confirm Order
                                            </button>
                                            <button
                                                onClick={handleWhatsApp}
                                                className="w-full mt-2 font-semibold order-1 md:order-2 bg-[#25D366] text-white py-2 rounded  transition disabled:opacity-50 flex gap-2 items-center justify-center"
                                            >
                                                <WhatsAppIcon className="w-6 h-6" fill="white" />
                                                WhatsApp
                                            </button>
                                        </>
                                    )
                                    : (
                                        <button
                                            disabled
                                            className="w-full mt-6 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 cursor-not-allowed"
                                        >
                                            Out of Stock
                                        </button>
                                    )
                            }
                        </div>
                    </section>

                    <section className='order-1 md:order-2 grid grid-cols-1'>
                        <div className="order-2 md:order-1 mt-6 md:mt-0">
                            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Order Summary</h2>
                            <OrderSummary
                                product={product}
                                size={size}
                                quantity={quantity}
                                setSize={setSize}
                                setQuantity={setQuantity}
                                totalCost={totalCost}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default Order;