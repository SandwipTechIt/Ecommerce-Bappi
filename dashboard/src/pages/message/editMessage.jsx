import { useParams,useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../api";
import { useState } from "react";

export default () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data: message, isLoading, isError, error } = useQuery({
        queryKey: ["getMessage", id],
        queryFn: () => getApi(`getMessage/${id}`),
        keepPreviousData: true,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
    const [reply, setReply] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate("mailto:" + message?.data?.email + "?subject=" + message?.data?.subject + "&body=" + reply);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Loading message details...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Message</h3>
                        <p className="text-gray-500 mb-6">{error.message}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bgGlass py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Message Details
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                        Review and respond to the message
                    </p>
                </div>

                {/* Contact Card */}
                <div className="bgGlass rounded-2xl shadow-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
                    <div className="px-6 py-5 sm:p-8">
                        <div className="flex items-center mb-6">
                            <div className="flex-shrink-0 bg-transparent rounded-lg p-3">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                                <p className="text-sm text-gray-500">Sender details</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-transparent rounded-lg p-4 border border-cyan-400">
                                <dt className="text-sm font-medium text-gray-500 truncate">Name</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{message?.data?.name}</dd>
                            </div>
                            <div className="bg-transparent rounded-lg p-4 border border-cyan-400">
                                <dt className="text-sm font-medium text-gray-500 truncate">Subject</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{message?.data?.subject}</dd>
                            </div>
                            <div className="bg-transparent rounded-lg p-4 border border-cyan-400">
                                <dt className="text-sm font-medium text-gray-500 truncate">Phone</dt>
                                <dd className="mt-1">
                                    <a href={`tel:${message?.data?.number}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 flex items-center">
                                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {message?.data?.number}
                                    </a>
                                </dd>
                            </div>
                            <div className="bg-transparent rounded-lg p-4 border border-cyan-400">
                                <dt className="text-sm font-medium text-gray-500 truncate">Email</dt>
                                <dd className="mt-1">
                                    <a href={`mailto:${message?.data?.email}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 flex items-center">
                                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {message?.data?.email}
                                    </a>
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Card */}
                <div className="bgGlass rounded-2xl shadow-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
                    <div className="px-6 py-5 sm:p-8">
                        <div className="flex items-center mb-6">
                            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold text-gray-900">Message</h2>
                                <p className="text-sm text-gray-500">Content of the message</p>
                            </div>
                        </div>
                        
                        <div className="bg-transparent border border-cyan-500 rounded-xl p-6">
                            <p className="text-gray-700 whitespace-pre-line">{message?.data?.message}</p>
                        </div>
                    </div>
                </div>

                {/* Reply Form */}
                <div className="bgGlass rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="px-6 py-5 sm:p-8">
                        <div className="flex items-center mb-6">
                            <div className="flex-shrink-0 bg-orange-100 rounded-lg p-3">
                                <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold text-gray-900">Reply</h2>
                                <p className="text-sm text-gray-500">Send a response to the sender</p>
                            </div>
                        </div>
                        
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Response
                                </label>
                                <textarea
                                    id="reply"
                                    name="reply"
                                    rows={6}
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-lg p-4"
                                    placeholder="Type your reply here..."
                                />
                            </div>
                            <div className="flex justify-end">
                                <a
                                    href={`mailto:${message?.data?.email} ?subject=${message?.data?.subject} &body=${reply}`}
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300"
                                >
                                    <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    Send Reply
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};