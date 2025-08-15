
import Button from "../Ui/Button";
import {Link} from "react-router-dom";

export default () => {
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
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" >
                            <Link to="/shop">
                                <i className="fas fa-shopping-bag mr-2" />
                                Shop Now
                            </Link>
                        </Button>
                        <Button size="lg" className="text-lg px-8 border-2 border-primary rounded-lg h-10">
                            <Link to="/collections">View Collections</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    )
}

