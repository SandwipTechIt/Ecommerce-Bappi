import React, { useState } from 'react';

const ColorPicker = ({ selectedColors = [], onChange, error }) => {
    const [customColor, setCustomColor] = useState('#000000');

    const handleColorAdd = () => {
        if (!selectedColors.includes(customColor)) {
            onChange([...selectedColors, customColor]);
            setCustomColor('#000000'); // Reset to default after adding
        }
    };

    const handleColorRemove = (colorToRemove) => {
        onChange(selectedColors.filter(color => color !== colorToRemove));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color Variants
                </label>
                
                {/* Selected Colors Display */}
                {selectedColors.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Selected Colors ({selectedColors.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedColors.map((color, index) => (
                                <div
                                    key={index}
                                    className="relative group"
                                >
                                    <div
                                        className="w-12 h-12 rounded-lg border-2 border-[#00BCD4] shadow-sm cursor-pointer"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleColorRemove(color)}
                                        className="absolute -top-2 -right-2 w-5 h-5 text-white rounded-full text-xs bg-red-600 opacity-100"
                                    >
                                        ×
                                    </button>
                                    <div className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">
                                        {color}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Color Input */}
                <div className="p-4 border border-[#00BCD4] rounded-lg ">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                        Add Color
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <input
                            type="color"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            placeholder="#000000"
                            className="flex-1 col-span-2 px-3 py-2 border border-[#00BCD4] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        <button
                            type="button"
                            onClick={handleColorAdd}
                            disabled={selectedColors.includes(customColor)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add <span className="hidden md:inline">Color</span>
                        </button>
                    </div>
                </div>
            </div>
            {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default ColorPicker;
