import React, { useState } from 'react';
import { putApi } from '../../api';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
];

export default function StatusChanger({ order, onStatusUpdated }) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });

  const handleChange = async (newStatus) => {
    if (newStatus === status) return;
    
    setLoading(true);
    setFeedback({ show: false, message: '', type: '' });
    
    try {
      await putApi(`updateOrder/${order._id}`, { status: newStatus });
      setStatus(newStatus);
      onStatusUpdated?.();
      setFeedback({ 
        show: true, 
        message: `Status updated to ${newStatus}!`, 
        type: 'success' 
      });
    } catch (err) {
      console.error(err);
      setFeedback({ 
        show: true, 
        message: 'Failed to update status. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        setFeedback({ show: false, message: '', type: '' });
      }, 3000);
    }
  };

  const getStatusInfo = (statusValue) => {
    return STATUS_OPTIONS.find(option => option.value === statusValue) || {};
  };

  const currentStatus = getStatusInfo(status);

  return (
    <div className="bgGlass rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Order Status</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color}`}>
          {currentStatus.label || status}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600 text-sm dark:text-gray-400">Update the status for order #{order._id}</p>
      </div>
      
      {feedback.show && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
          feedback.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {feedback.message}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            disabled={loading || status === option.value}
            onClick={() => handleChange(option.value)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium
              ${status === option.value
                ? `${option.color} border-2 border-current shadow-inner`
                : ' hover:bg-gray-100 text-gray-700 border border-[#00BCD4] hover:border-[#00BCD4]'}
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading && status === option.value ? (
              <>
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              option.label
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}