import React, { useState, useEffect } from 'react';
import { getApi, putApi } from "../../api";
import { useQuery, useQueryClient } from '@tanstack/react-query';

const StockManagement = () => {
    const queryClient = useQueryClient();
    const [stockInputs, setStockInputs] = useState({});
    const [updateErrors, setUpdateErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editMode, setEditMode] = useState({}); // To track which stock is in edit mode

    const { data: stocks, isLoading, isError, error } = useQuery({
        queryKey: ["stocks"],
        queryFn: () => getApi("allStocks"),
        keepPreviousData: true,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });

    // Initialize stock inputs when data is loaded
    useEffect(() => {
        if (stocks) {
            const initialInputs = {};
            stocks.forEach(stock => {
                initialInputs[stock._id] = stock.stock;
            });
            setStockInputs(initialInputs);
        }
    }, [stocks]);

    // Handle input change
    const handleInputChange = (productId, value) => {
        // Clear any previous errors for this product
        if (updateErrors[productId]) {
            setUpdateErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[productId];
                return newErrors;
            });
        }
        
        setStockInputs(prev => ({
            ...prev,
            [productId]: parseInt(value) || 0
        }));
    };

    const handleEditClick = (productId) => {
        setEditMode(prev => ({ ...prev, [productId]: true }));
    };

    const handleCancelEdit = (productId) => {
        const originalStock = stocks.find(s => s._id === productId)?.stock;
        if (originalStock !== undefined) {
            setStockInputs(prev => ({ ...prev, [productId]: originalStock }));
        }
        setEditMode(prev => {
            const newEditMode = { ...prev };
            delete newEditMode[productId];
            return newEditMode;
        });
    };

    // Handle update button click
    const handleUpdateStock = async (productId) => {
        setIsUpdating(true);
        try {
            const newStock = stockInputs[productId];
            await putApi(`updateStock/${productId}`, { stock: newStock });
            
            // Invalidate query to refetch updated data
            await queryClient.invalidateQueries(["stocks"]);

            // Exit edit mode
            setEditMode(prev => {
                const newEditMode = { ...prev };
                delete newEditMode[productId];
                return newEditMode;
            });
            
            // Clear any errors for this product
            setUpdateErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[productId];
                return newErrors;
            });
        } catch (error) {
            console.error("Failed to update stock:", error);
            setUpdateErrors(prev => ({
                ...prev,
                [productId]: error.message || "Failed to update stock"
            }));
        } finally {
            setIsUpdating(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading stock data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
                    <div className="text-red-500 mb-4">
                        <i className="fas fa-exclamation-triangle text-5xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
                    <p className="text-gray-500 mb-4">{error.message || "Failed to load stock data"}</p>
                    <button 
                        onClick={() => queryClient.invalidateQueries(["stocks"])}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-redo mr-2"></i>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (!stocks || stocks.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Management</h1>
                        <p className="text-gray-600">Manage and update product inventory levels</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <i className="fas fa-box-open text-5xl"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                        <p className="text-gray-500">There are no products in your inventory.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bgGlass py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Stock Management</h1>
                </div>
                
                <div className="bg-white/50 shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Product Inventory</h2>
                        <span className="text-sm text-gray-500 dark:text-white">{stocks.length} products</span>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                        {stocks.map((stock) => (
                            <div key={stock._id} className="p-6 flex flex-col md:flex-row items-center">
                                {/* Left side - Product details */}
                                <div className="flex mb-4 md:mb-0 md:w-2/3">
                                    <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {/* Product image */}
                                        {stock?.primaryImage ? (
                                            <img 
                                                src={stock.primaryImage} 
                                                alt={stock.productID.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-gray-400">
                                                <i className="fas fa-image text-3xl"></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{stock.productID.name}</h3>
                                        <div className="mt-2 flex items-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                stock.stock > 5 ? 'bg-green-100 text-green-800' :
                                                stock.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {stock.stock > 5 ? 'In Stock' :
                                                 stock.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                            </span>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right side - Stock management */}
                                <div className="md:w-1/3 flex flex-col items-end">
                                    {editMode[stock._id] ? (
                                        // Edit mode UI
                                        <div className="w-full">
                                            {updateErrors[stock._id] && (
                                                <div className="text-red-500 text-sm mb-2 text-right">
                                                    {updateErrors[stock._id]}
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-1">
                                                    <label htmlFor={`stock-${stock._id}`} className="sr-only">Stock Quantity</label>
                                                    <input
                                                        type="number"
                                                        id={`stock-${stock._id}`}
                                                        name={`stock-${stock._id}`}
                                                        min="0"
                                                        value={stockInputs[stock._id] || ''}
                                                        onChange={(e) => handleInputChange(stock._id, e.target.value)}
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md p-2 border outline-0"
                                                        disabled={isUpdating}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleUpdateStock(stock._id)}
                                                    disabled={isUpdating || stockInputs[stock._id] == stock.stock}
                                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isUpdating ? <i className="fas fa-spinner fa-spin"></i> : "Update"}
                                                </button>
                                                <button
                                                    onClick={() => handleCancelEdit(stock._id)}
                                                    disabled={isUpdating}
                                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View mode UI
                                        <div className="flex items-center space-x-4">
                                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                {stock.stock} <span className="text-sm font-normal text-gray-500">units</span>
                                            </span>
                                            <button
                                                onClick={() => handleEditClick(stock._id)}
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            >
                                                <i className="fas fa-pencil-alt mr-2"></i>
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockManagement;