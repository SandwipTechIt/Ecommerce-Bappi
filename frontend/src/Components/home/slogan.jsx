import { Link } from "react-router-dom"

export default ({data}) => {
    return (
        <div>
            <div className="m-4 p-6 py-12 border-[#e75c3a] bg-[#ffcecad6] text-[#e75c3a] rounded-lg">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <h2 className="text-center text-2xl md:text-4xl lg:text-6xl tracking-tighter font-bold">{data?.text}</h2>
                        <div className="space-x-2 text-center py-2 lg:py-0">
                            <span>{data?.description}</span>
                        </div>
                        <Link to="/products" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md block bg-[#e75c3a] text-white">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}