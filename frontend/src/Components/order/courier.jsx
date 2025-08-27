import { useState } from "react";

const ShippingChargeSelector = ({ data, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const shippingOptions = data?.isActive 
    ? data?.items
    : [{ name: 'Free shipping', fee: 0, _id: 'free-shipping' }];

  return (
    <div className="bg-white/50 rounded-lg shadow-md py-4 px-2 w-full mt-2">
      <h2 className="text-xl font-bold mb-4">Shipping Charge</h2>
      
      {/* Shipping Options */}
      <div className="space-y-3 mb-6">
        {shippingOptions.map((option) => (
          <div
            key={option._id}
            className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
              selectedOption?._id === option._id
                ? 'border-[#e75c3a] bg-[#e75c3a1a]'
                : 'border-gray-200'
            } ${data?.isActive ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => data?.isActive && handleSelect(option)}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                  selectedOption?._id === option._id
                    ? 'border-[#e75c3a] bg-[#e75c3a]'
                    : 'border-gray-300'
                }`}
              >
                {selectedOption?._id === option._id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={selectedOption?._id === option._id ? 'font-medium' : ''}>
                {option.name}
              </span>
            </div>
            <div className="font-medium">
              {option.fee === 0 ? 'Free' : `৳${option.fee}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ShippingChargeSelector;