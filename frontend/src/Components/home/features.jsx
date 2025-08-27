const FeatureCard = ({ icon, title, description }) => (
    <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-[#e5e5e5] shadow-sm text-center p-6">
        <div data-slot="card-content" className="px-6 space-y-4">
            <div className="w-16 h-16 bg-[#e75c3a]/20 rounded-full flex items-center justify-center mx-auto">
                {icon}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-[#737373]">{description}</p>
        </div>
    </div>
);


import {TruckIcon, UndoIcon, SvgIcon} from '../../constants/icons'

export default function FeaturesSection() {
    const features = [
        {
            icon: <TruckIcon className="w-9 h-9" fill="#e75c3a" />,
            title: "Fast Shipping",
            description: "Get your items faster. We offer quick and reliable delivery on all orders"
        },
        {
            icon: <UndoIcon className="w-9 h-9" fill="#e75c3a" />,
            title: "Easy Returns",
            description: "30-day return policy. Not satisfied? Return for a full refund."
        },
        {
            icon: <SvgIcon className="w-9 h-9" fill="#e75c3a" />,
            title: "24/7 Support",
            description: "Our customer service team is here to help you anytime."
        }
    ];

    return (
        <section className="py-16 bg-background">
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