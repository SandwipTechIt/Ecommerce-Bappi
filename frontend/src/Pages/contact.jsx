import { useState } from "react";
import { EmailIcon, LocationIcon, CallIcon } from "../constants/icons";
import { postApi } from "../api"
export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        email: "",
        number: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("");

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value.trim()) error = "Name is required";
                else if (value.length < 2) error = "Name must be at least 2 characters";
                break;
            case "email":
                if (!value) error = "Email is required";
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error = "Invalid email address";
                }
                break;
            case "number":
                if (!/^(\+?88)?01[3-9]\d{8}$/.test(value))
                    error = "Invalid phone number";
                break;
            case "message":
                if (!value.trim()) error = "Message is required";
                else if (value.length < 10)
                    error = "Message must be at least 10 characters";
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Real-time validation after first interaction
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("");

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            newErrors[field] = validateField(field, formData[field]);
        });
        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            setIsSubmitting(false);
            return;
        }

        try {
            await postApi("/sendMessage", formData);
            setSubmitStatus("success");
            setFormData({ name: "", subject: "", email: "", number: "", message: "" });
            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
            setSubmitStatus("error");
            setIsSubmitting(false);
        }

    };
    return (
        <div className="bg-gray-50" id="contact">
            <div className="contactContainer">
                <section className="relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-100/70 via-white to-orange-50/70"
                    />
                    <div className="relative mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                            Contact <span className="text-orange-500">Us</span>
                        </h1>
                    </div>
                </section>
                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:p-10">
                    {/* Contact Info & Social Media */}
                    <div className="flex flex-col rounded-2xl p-4 lg:p-0">
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="red-hat-bold mb-6 text-3xl">
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <p className="red-hat-medium flex items-center">
                                        <CallIcon className="mr-3 h-6 w-6 text-lime-600" />
                                        <a href="tel:+8801560044236" className="text-xl">
                                            +880 1560 044236
                                        </a>
                                    </p>
                                    <p className="red-hat-medium font-xl flex items-center">
                                        <EmailIcon className="mr-3 h-6 w-6 text-violet-700" />
                                        <a href="mailto:comfortylife@gmail.com" className="text-xl">
                                            comfortylife@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="red-hat-bold mb-6 text-3xl">Dhaka Office :</h3>
                                <div className="flex space-x-3">
                                    <LocationIcon className="mr-3 h-8 w-8" />
                                    <p className="red-hat-medium text-xl text-gray-600">
                                        Bankers Tower, 24 BCS Tower goli, Road no- 01, Laboni point, Bosila, Dhaka
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="red-hat-bold mb-6 text-3xl">Chattogram Office :</h3>
                                <div className="flex space-x-3">
                                    <LocationIcon className="mr-3 h-6 w-6" />
                                    <p className="red-hat-medium text-xl text-gray-600">
                                        House 12, Road 03, Block K, Halishahar H/E, Chattogram.
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="red-hat-bold mb-6 text-3xl">Business Hours</h3>
                                <p className="red-hat-medium flex flex-col gap-4 text-xl text-gray-600">
                                    <span className="block">
                                        🕘 Saturday to Thursday: 9:00 AM – 6:00 PM
                                    </span>
                                    <span className="block">❌ Friday: Closed</span>
                                    <span className="block">
                                        📞 Contact us during business hours for immediate
                                        assistance!
                                    </span>
                                </p>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="red-hat-bold mb-6 text-3xl">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="text-blue-500 transition-colors hover:text-blue-700"
                                    >
                                        <i className="fab fa-linkedin text-4xl"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-blue-600 transition-colors hover:text-blue-800"
                                    >
                                        <i className="fab fa-facebook-square text-4xl"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-[#1e3050] transition-colors hover:text-[#0c1018]"
                                    >
                                        <i className="fa-brands fa-square-x-twitter text-4xl"></i>
                                    </a>
                                    <a href="#" className="text-[#C13584] transition-colors">
                                        <i className="fab fa-instagram text-4xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg p-8 shadow-lg">
                        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
                            Send us a message
                        </h2>
                        <p className="red-hat-medium mb-8 text-center text-gray-600">
                            Give us a chance to searve and bring magic in your brand
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"
                                            } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                            } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="number"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Contact Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="number"
                                        id="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full rounded-md border ${errors.number ? "border-red-500" : "border-gray-300"
                                            } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                    />
                                    {errors.number && (
                                        <p className="mt-1 text-sm text-red-500">{errors.number}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`mt-1 block w-full rounded-md border ${errors.message ? "border-red-500" : "border-gray-300"
                                        } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                ></textarea>
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                )}
                            </div>


                            {submitStatus === "success" && (
                                <p className="mt-4 text-center text-green-600">
                                    Message sent successfully!
                                </p>
                            )}
                            {submitStatus === "error" && (
                                <p className="mt-4 text-center text-red-500">
                                    Failed to send message. Please try again.
                                </p>
                            )}
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex h-[480px] flex-col overflow-hidden shadow-xl transition-shadow hover:shadow-2xl">


                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.387036127069!2d90.3362779319286!3d23.73357387946381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf7427772427%3A0xcabb06a7fb5d218f!2zQkFOS0VSUyBUT1dFUiDgpqzgp43gpq_gpr7gpoLgppXgpr7gprDgp43gprgg4Kaf4Ka-4KaT4Kav4Ka84Ka-4Kaw!5e0!3m2!1sbn!2sbd!4v1756255085053!5m2!1sbn!2sbd"
                    width="100%"
                    height="100%"
                    className="!h-[980px] min-h-[280px] flex-1 border-0"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map"
                />
            </div>
        </div>
    );
}