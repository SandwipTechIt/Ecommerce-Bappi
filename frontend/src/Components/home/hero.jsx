
import Button from "../Ui/Button";
import { useNavigate } from "react-router-dom";
import { ShopIcon } from "../../constants/icons";

export default () => {

    const navigate = useNavigate();
    const handleShopNowClick = () => {
        navigate('/products');
    }
    return (
        <section className="relative heroBg py-20 mt-[70px]">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
                        Where Comfort Meets Your Step
                    </h1>
                    <p className="text-xl text-[#737373]">
                        Discover premium footwear designed for every journey. From athletic performance to everyday comfort,
                        find your perfect fit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Button size="lg" onClick={handleShopNowClick}>
                            <ShopIcon className="mr-2 text-white" width="28" height="28" fill="white" />
                            Shop Now

                        </Button>
                        <Button size="lg" className="text-lg px-8 border-2 border-primary rounded-lg h-10 cursor-pointer" onClick={handleShopNowClick}>
                            View Collections
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    )
}

