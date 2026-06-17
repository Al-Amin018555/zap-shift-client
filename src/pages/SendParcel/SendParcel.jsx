import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const SendParcel = () => {
    const {
        register,
        handleSubmit,
        control,
        //  formState: { errors }
    } = useForm();

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const region = [...new Set(regionsDuplicate)];

    const senderSelectedRegion = useWatch({ control, name: "senderRegion" });
    const receiverSelectedRegion = useWatch({ control, name: "receiverRegion" });

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(d => d.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = data => {
        const parcelWeight = data.parcelWeight;
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;

        let cost = 0;

        if (data.parcelType === "document") {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                cost = isSameDistrict ? minCharge + extraWeight * 40 : minCharge + extraWeight * 40 + 40;
            }
        }


        Swal.fire({
            title: "Are you agree with the cost?",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                data.cost = cost;
                // save the parcel information in database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log("data after saving to the db ", res);
                        Swal.fire({
                            title: "Saved!",
                            text: "Your parcel booking has been confirmed.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        console.error("Failed to save parcel:", err);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to save the parcel. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });

    }

    return (
        <div className="my-10">
            <form className="bg-white shadow-lg p-14 rounded-4xl" onSubmit={handleSubmit(handleSendParcel)}>
                <h2 className="text-5xl font-bold">Send A parcel</h2>
                {/* parcel type */}
                <div className="my-8 p-0">
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType', { required: true })} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType', { required: true })} value="not-document" className="radio" />
                        Not-Document
                    </label>
                </div>

                {/* parcel info: name,weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName', { required: true })} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input
                            type="number"
                            step="any"
                            {...register('parcelWeight', { required: true, valueAsNumber: true })} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* parcel details : sender,reciever */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                    {/* sender details */}
                    <div>
                        <fieldset className="fieldset">
                            <h2 className="text-2xl mt-4 font-bold">Sender Details</h2>

                            <label className="label">Sender Name</label>
                            <input type="text" defaultValue={user.displayName} {...register('senderName', { required: true })} className="input w-full" placeholder="Sender Name" />

                            <label className="label">Sender Email</label>
                            <input type="email" defaultValue={user.email} {...register('senderEmail', { required: true })} className="input w-full" placeholder="Sender Email" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Regions</legend>
                                <select {...register('senderRegion', { required: true })} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        region.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender District</legend>
                                <select {...register('senderDistrict', { required: true })} defaultValue="Pick a District" className="select">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(senderSelectedRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress', { required: true })} className="input w-full" placeholder="Sender Address" />

                            <label className="label mt-4">Sender Phone No</label>
                            <input type="text" {...register('senderPhoneNum', { required: true })} className="input w-full" placeholder="Sender phone no" />

                            <label className="label mt-4">Pickup Instruction</label>
                            <textarea className="textarea w-full" {...register('pickupInstruction', { required: true })} rows={5} placeholder="Pickup Instruction"></textarea>
                        </fieldset>
                    </div>

                    {/* reciever details */}
                    <div>
                        <fieldset className="fieldset">
                            <h2 className="text-2xl mt-4 font-bold">Receiver Details</h2>

                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName', { required: true })} className="input w-full" placeholder="Receiver Name" />

                            <label className="label">Receiver Email</label>
                            <input type="email" {...register('receiverEmail', { required: true })} className="input w-full" placeholder="Receiver Email" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Regions</legend>
                                <select {...register('receiverRegion', { required: true })} defaultValue="Pick a region" className="select">
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