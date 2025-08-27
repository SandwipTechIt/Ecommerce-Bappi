import { useEffect, useState } from "react";

import { getApi, postApi } from "../../api";

const FormComponent = () => {
    const [isActive, setIsActive] = useState(true);
    const [name, setName] = useState("");
    const [fee, setFee] = useState("");
    const [items, setItems] = useState([]);

    const handleAdd = () => {
        if (!name.trim() || !fee) {
            alert("Please fill both name and fee fields");
            return;
        }

        const newItem = {
            _id: Date.now(),
            name: name.trim(),
            fee: parseInt(fee),
        };

        setItems([...items, newItem]);
        setName("");
        setFee("");
    };

    const handleDelete = (id) => {
        setItems(items.filter((item) => item._id !== id));
    };

    const handleSubmit = async () => {
        if (items.length === 0) {
            alert("Please add at least one item before submitting");
            return;
        }

        const selectedItems = items.map(item => ({
            name: item.name,
            fee: item.fee
        }));
        const data = {
            isActive,
            items: selectedItems
        };

        try {
            const response = await postApi("/createCourier", data);
            console.log("Form submitted successfully:", response.data);
            alert("Form submitted successfully");
            setIsActive(response?.data?.isActive);
            setItems(response?.data?.items);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        }
    };


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getApi("/getCourier");
                console.log(response);
                setIsActive(response?.data?.isActive);
                setItems(response?.data?.items);

            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bgGlass rounded-xl  overflow-hidden p-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                    Courier Management Form
                </h1>

                {/* Toggle Switch */}
                <div className="flex items-center justify-between py-4">
                    <span className="mr-3 text-lg font-medium text-gray-700">
                        Active Status
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                        <span className="ml-3 text-lg font-medium text-gray-700">
                            {isActive ? "Active" : "Inactive"}
                        </span>
                    </label>
                </div>

                {/* Input Fields and Add Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Inside Dhaka"
                        className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Charge"
                        className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                    />
                    <button
                        onClick={handleAdd}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-plus"></i>
                        Add
                    </button>
                </div>

                {/* Items List */}
                {items.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Added Items
                        </h2>
                        <div className="space-y-3 overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bgGlass rounded-lg border border-blue-500 transition"
                                >
                                    <div>
                                        <span className="font-medium text-gray-800">
                                            {item.name}
                                        </span>
                                        <span className="ml-4 text-gray-600">
                                            ৳{item.fee}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-2 transition"
                                        aria-label="Delete item"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-paper-plane"></i>
                        Submit Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;
