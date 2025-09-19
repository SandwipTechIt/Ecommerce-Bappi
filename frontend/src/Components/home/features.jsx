const FeatureCard = ({ icon, title, description }) => (
    <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-[#e5e5e5] shadow-sm text-center p-6">
        <div data-slot="card-content" className="px-6 space-y-4">
            <div className="w-16 h-16 bg-[#e75c3a]/20 rounded-full flex items-center justify-center mx-auto">
                {icon}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-[#737373] text-justify">{description}</p>
        </div>
    </div>
);


import { TruckIcon, UndoIcon, SvgIcon } from '../../constants/icons'

export default function FeaturesSection() {
    const features = [
        {
            icon: <TruckIcon className="w-9 h-9" fill="#e75c3a" />,
            title: "Fast Shipping",
            description: "Experience swift and dependable delivery with every order. We prioritize speed so you can enjoy your purchase without the wait."
        },
        {
            icon: <UndoIcon className="w-9 h-9" fill="#e75c3a" />,
            title: "Easy Size Change",
            description: "Not the right fit? No worries. Enjoy hassle-free size changes to ensure your perfect fit, every time."
        },
        {
            icon: <SvgIcon className="w-9 h-9" fill="#e75c3a" />,
            title: "6 Month Outsole Warranty",
            description: "We stand by the quality of our products. Enjoy peace of mind with a 6-month warranty on all outsoles, guaranteed."
        }
    ];
    

    return (
        <section className="max-w-7xl mx-auto py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}