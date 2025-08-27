import ProductSection from "../home/productSection"
export default () => {
    return (
        <div className="w-full">
            <div className="w-full py-6">
                <h2 className="text-2xl font-bold mb-4 text-center ">404 Not Found</h2>
                <p className="text-center">The page you are looking for does not exist.</p>
                <p className="text-center">You can check others products</p>
            </div>
            <ProductSection />
        </div>
    )
}