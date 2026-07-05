import { useEffect, useState } from "react";
import { FaBuilding, FaMoneyBillWave, FaStore } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";

const HowItWorks = () => {
    const [works, setWorks] = useState([]);

    const getIcon = (iconName) => {
        if (iconName === "LiaShippingFastSolid") {
            return <LiaShippingFastSolid size={40}></LiaShippingFastSolid>;
        }
        else if (iconName === "FaMoneyBillWave") {
            return <FaMoneyBillWave size={40}></FaMoneyBillWave>;
        }
        else if (iconName === "FaStore") {
            return <FaStore size={40}></FaStore>;
        }
        else if (iconName === "FaBuilding") {
            return <FaBuilding size={40}></FaBuilding>;
        }
    }
    useEffect(() => {
        fetch("HowItWorks.json")
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [])

    return (
        <div className="grid gap-4 grid-cols-4">
            {
                works.map(work => <div key={work.id} className="card bg-base-200 card-md shadow-sm">
                    <div className="card-body rounded-3xl">
                        {getIcon(work.icon)}
                        <h2 className="card-title text-secondary font-bold">{work.title}</h2>
                        <p className="text-base-content">{work.description}</p>

                    </div>
                </div>)
            }
        </div>
    );
};

export default HowItWorks;