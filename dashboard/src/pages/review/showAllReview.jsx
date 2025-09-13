import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getApi, deleteApi } from '../../api';

const ShowAllReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const navigate = useNavigate();

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await getApi('getReviews');
            if (response.success) {
                setReviews(response.data || []);
            } else {
                alert('Failed to fetch reviews');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            alert('Error fetching reviews');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            setDeleteLoading(reviewId);
            const response = await deleteApi(`deleteReview/${reviewId}`);
            if (response.success) {
                setReviews(prev => prev.filter(review => review._id !== reviewId));
                setShowDeleteModal(false);
                setSelectedReview(null);
            } else {
                alert(response.message || 'Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review');
        } finally {
            setDeleteLoading(null);
        }
    };

    const showDeleteConfirmation = (review) => {
        setSelectedReview(review);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedReview(null);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">All Review Images</h2>
                    <p className="text-gray-600">
                        Manage and view all uploaded review images <span className="font-semibold">({reviews.length} total)</span>
                    </p>
                </div>
                <button
                    onClick={() => navigate('/addReview')}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    <i className="fas fa-plus"></i>
                    Add Review
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading reviews...</p>
                </div>
            )}

            {/* No Reviews State */}
            {!loading && reviews.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border-2 border-dashed border-gray-200">
                    <div className="text-indigo-400 mb-6">
                        <i className="fas fa-images text-6xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No Reviews Found</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        No review images have been uploaded yet. Get started by adding your first review.
                    </p>
                    <button
                        onClick={() => navigate('/addReview')}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Upload First Review
                    </button>
                </div>
            )}

            {/* Reviews Grid */}
            {!loading && reviews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {reviews.map((review) => (
                        <div 
                            key={review._id} 
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative group">
                                <img
                                    src={review.image}
                                    alt="Review"
                                    className="w-full h-56 object-cover"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBMMTMwIDEwMEg3MEwxMDAgNzBaIiBmaWxsPSIjOUI5QjlCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIHN0cm9rZT0iIzlCOUI5QiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=';
                                    }}
                                />
                                
                                {/* Delete Button */}
                                <button
                                    onClick={() => showDeleteConfirmation(review)}
                                    disabled={deleteLoading === review._id}
                                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        deleteLoading === review._id 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-red-500 hover:bg-red-600 group-hover:scale-110'
                                    } text-white shadow-lg`}
                                    title="Delete review"
                                >
                                    {deleteLoading === review._id ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        <i className="fas fa-trash-alt"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-99999999999999">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-95 animate-scaleIn">
                        <div className="text-center mb-8">
                            <div className="text-red-500 mb-5">
                                <i className="fas fa-exclamation-triangle text-5xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Delete Review</h3>
                            <p className="text-gray-600">
                                Are you sure you want to delete this review? This action cannot be undone.
                            </p>
                        </div>
                        
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={closeDeleteModal}
                                disabled={deleteLoading}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-300 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteReview(selectedReview._id)}
                                disabled={deleteLoading}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center disabled:opacity-50"
                            >
                                {deleteLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-trash-alt mr-2"></i>
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowAllReview;