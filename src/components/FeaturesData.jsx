import React from "react";
import { FaMoneyCheck, FaHeadphones, FaStar, FaCheckSquare } from "react-icons/fa";

const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="mt-3 flex flex-row justify-center">
            <div className="flex items-center flex-col-reverse lg:flex-row gap-3">
                <div className="flex flex-col text-right">
                    <h6 className="text-base font-semibold">{title}</h6>
                    <span className="text-sm text-gray-500">{description}</span>
                </div>
                {icon}
            </div>
        </div>

    );
};

const FeaturesData = () => {
    const featuresData = [
        {
            title: "پرداخت امن",
            description: "درگاه معتبر بانکی",
            icon: <FaMoneyCheck style={{ fontSize: "40px", color: "#EF4056" }} />,
        },
        {
            title: "پشتیبانی سریع",
            description: "پشتیبانی 24ساعته",
            icon: <FaHeadphones style={{ fontSize: "40px", color: "#EF4056" }} />,
        },
        {
            title: "محصولات بروز",
            description: "جدید ترین های دنیا",
            icon: <FaStar style={{ fontSize: "40px", color: "#EF4056" }} />,
        },
        {
            title: "محصولات اورجینال",
            description: "ضمانت اورجینال بودن",
            icon: <FaCheckSquare style={{ fontSize: "40px", color: "#EF4056" }} />,
        },
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 align-element py-10 px-6"  >
            {featuresData.map((feature, index) => (
                <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                />
            ))}
        </section>
    );
};

export default FeaturesData;
