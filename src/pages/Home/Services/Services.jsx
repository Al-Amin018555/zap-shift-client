import { LiaShippingFastSolid } from "react-icons/lia";
import {
    FaMoneyBillWave,
    FaBuilding,
    FaWarehouse,
    FaGlobeAsia,
    FaUndoAlt
} from "react-icons/fa";
import { useEffect, useState } from "react";
const Services = () => {
    const [services, setServices] = useState([]);
    const getIcon = (iconName) => {

        if (iconName === "LiaShippingFastSolid") {
            return <LiaShippingFastSolid size={40} />;
        }

        else if (iconName === "FaGlobeAsia") {
            return <FaGlobeAsia size={40} />;
        }

        else if (iconName === "FaWarehouse") {
            return <FaWarehouse size={40} />;
        }

        else if (iconName === "FaMoneyBillWave") {
            return <FaMoneyBillWave size={40} />;
        }

        else if (iconName === "FaBuilding") {
            return <FaBuilding size={40} />;
        }

        else if (iconName === "FaUndoAlt") {
            return <FaUndoAlt size={40} />;
        }
    };

    useEffect(() => {

        fetch("/Services.json")
            .then(res => res.json())
            .then(data => setServices(data));

    }, []);
    return (
        <div className="bg-secondary mt-10 rounded-4xl py-25 px-27.5">
            <div className="text-center space-y-4">
                <h2 className="text-secondary-content font-extrabold text-4xl">Our Services</h2>
                <p className="text-secondary-content">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                {
                    services.map(service => (

                        <div
                            key={service.id}
                            className="card bg-base-200 text-center rounded-3xl shadow-sm"
                        >
                            <div className="card-body hover:bg-primary rounded-3xl">

                                <div className="flex justify-center">
                                    {getIcon(service.icon)}
                                </div>

                                <h2 className="card-title flex justify-center text-secondary font-bold">
                                    {service.title}
                                </h2>

                                <p className="text-base-content">
                                    {service.description}
                                </p>

                            </div>
                        </div>

                    ))
                }

            </div>
        </div>
    );
};

export default Services;