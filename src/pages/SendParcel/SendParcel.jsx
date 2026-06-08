import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";


const SendParcel = () => {
    const { register, handleSubmit,control, formState: { errors } } = useForm();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const region = [...new Set(regionsDuplicate)];
   
    const senderSelectedRegion = useWatch({control, name: "senderRegion" });
    const receiverSelectedRegion = useWatch({control, name: "receiverRegion" });

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(d => d.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = data => {
        console.log(data);
    }

    return (
        <div className="my-10">
            <form className="bg-white shadow-lg p-14 rounded-4xl" onSubmit={handleSubmit(handleSendParcel)}>
                <h2 className="text-5xl font-bold">Send A parcel</h2>
                {/* parcel type */}
                <div className="my-8 p-0">
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="not-document" className="radio" />
                        Not-Document
                    </label>
                </div>

                {/* parcel info: name,weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* parcel details : sender,reciever */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                    {/* sender details */}
                    <div>
                        <fieldset className="fieldset">
                            <h2 className="text-2xl mt-4 font-bold">Sender Details</h2>

                            <label className="label">Sender Name</label>
                            <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

                            <label className="label">Sender Email</label>
                            <input type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Regions</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        region.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender District</legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(senderSelectedRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                            <label className="label mt-4">Sender Phone No</label>
                            <input type="text" {...register('senderPhoneNum')} className="input w-full" placeholder="Sender phone no" />

                            <label className="label mt-4">Pickup Instruction</label>
                            <textarea className="textarea w-full" {...register('pickupInstruction')} rows={5} placeholder="Pickup Instruction"></textarea>
                        </fieldset>
                    </div>

                    {/* reciever details */}
                    <div>
                        <fieldset className="fieldset">
                            <h2 className="text-2xl mt-4 font-bold">Receiver Details</h2>

                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                            <label className="label">Receiver Email</label>
                            <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Regions</legend>
                                <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        region.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(receiverSelectedRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>


                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                            <label className="label mt-4">Receiver Phone No</label>
                            <input type="text" {...register('receiverPhoneNum')} className="input w-full" placeholder="Receiver phone no" />

                            <label className="label mt-4">Delivery Instruction</label>
                            <textarea className="textarea w-full" {...register('deliveryInstruction')} rows={5} placeholder="Pickup Instruction"></textarea>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mt-6" value="Proceed to Confirm Booking" />
            </form>
        </div>
    );
};

export default SendParcel;