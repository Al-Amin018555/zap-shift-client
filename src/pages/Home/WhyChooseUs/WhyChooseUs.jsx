import { useEffect, useState } from "react";

const WhyChooseUs = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        fetch('whyChooseUs.json')
            .then(res => res.json())
            .then(data => {
                setdata(data)
                console.log(data);
            })
    }, [])
    return (
        <div className="space-y-4 mt-20">
            {
                data.map((data) => <div key={data.id} className="card bg-base-100 rounded-3xl card-sm shadow-sm">
                    <div className="card-body p-8">
                        <div className="flex items-center justify-around">
                            <div>
                                <img src={data.image} alt={data.title} />
                            </div>
                          <div className="divider divider-horizontal [&::before]:border-dotted [&::after]:border-dotted [&::before]:border-2 [&::after]:border-2 [&::before]:bg-transparent [&::after]:bg-transparent pl-12 pr-12"></div>
                            <div className="space-y-4">
                                <h2 className="card-title text-2xl text-secondary font-extrabold">{data.title}</h2>
                                <p className="text-base-content text-[16px] font-medium">{data.description}</p>
                            </div>
                        </div>

                    </div>
                </div>)
            }
        </div>
    );
};

export default WhyChooseUs;