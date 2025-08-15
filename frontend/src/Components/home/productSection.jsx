import ProductCard from "../Ui/ProductCard";

export default () => {
    const products = [
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6a5",
            name: "Nike Air Jordan 1 Retro High",
            description: "Iconic basketball sneaker with premium leather construction, Air-Sole unit cushioning, and classic Chicago colorway",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
            price: 1700,
            status: "20% off",
            slug: "nike-air-jordan-1-retro-high"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6a6",
            name: "Adidas Ultraboost 22",
            description: "High-performance running shoe with Boost midsole, Primeknit upper, and Continental rubber outsole for superior grip",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop",
            price: 1850,
            status: "limited stock",
            slug: "adidas-ultraboost-22"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6a7",
            name: "New Balance 574 Core",
            description: "Classic lifestyle sneaker with ENCAP midsole technology, suede/mesh upper, and iconic retro silhouette",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop",
            price: 1500,
            status: "clearance",
            slug: "new-balance-574-core"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6a8",
            name: "Converse Chuck Taylor All Star",
            description: "Timeless canvas sneaker with rubber toe cap, medial eyelets, and iconic high-top silhouette",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop",
            price: 1550,
            status: "back in stock",
            slug: "converse-chuck-taylor-all-star"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6a9",
            name: "Vans Old Skool",
            description: "Classic skate shoe with durable suede and canvas upper, signature waffle rubber outsole, and iconic side stripe",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
            price: 1600,
            status: "seasonal sale",
            slug: "vans-old-skool"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6ab",
            name: "Nike Air Force 1 Low",
            description: "Basketball-inspired sneaker with leather upper, Air-Sole unit, and pivot point outsole pattern",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop",
            price: 1950,
            status: "best seller",
            slug: "nike-air-force-1-low"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6ac",
            name: "Reebok Club C 85",
            description: "Vintage tennis sneaker with soft leather upper, EVA midsole cushioning, and classic gum rubber outsole",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
            price: 1780,
            status: "online exclusive",
            slug: "reebok-club-c-85"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6ad",
            name: "Adidas Superstar",
            description: "Iconic shell-toe sneaker with leather upper, herringbone-pattern outsole, and classic 3-stripe branding",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop",
            price: 1675,
            status: "trending",
            slug: "adidas-superstar"
        },
        {
            _id: "64f8c9b1e4b0a5d9e8f7c6ae",
            name: "ASICS Gel-Kayano 29",
            description: "Stability running shoe with FF BLAST PLUS cushioning, 3D SPACE CONSTRUCTION, and AHARPLUS outsole",
            product_type: "sneaker",
            primaryImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop",
            price: 2000,
            status: "editor's pick",
            slug: "asics-gel-kayano-29"
        }
    ];

    return (
        <section className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 md:gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}