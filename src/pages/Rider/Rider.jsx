import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
    const {
        register,
        handleSubmit,
        control,
        //  formState: { errors }
    } = useForm();
    const { user } = useAuth();
    const serviceCenters = useLoaderData();
    const axiosSecure = useAxiosSecure();


    const regionsDuplicate = serviceCenters.map(c => c.region);

    const region = [...new Set(regionsDuplicate)];

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(d => d.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const riderRegion = useWatch({ control, name: "riderRegion" });

    const handleRiderApplication = data => {
        console.log(data);

        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. We will reach to you in 145 days",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    return (
        <div>
            <form className="bg-white shadow-lg p-14 my-10 rounded-4xl" onSubmit={handleSubmit(handleRiderApplication)}>
                <h2 className="text-5xl font-bold mb-4">Be A Rider</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                    {/* Rider details */}
                    <div>
                        <fieldset className="fieldset">
                            <h2 className="text-2xl mt-4 font-bold">Tell us about yourself</h2>

                            <label className="label">Your Name</label>
                            <input type="text" defaultValue={user.displayName} {...register('name', { required: true })} className="input w-full" placeholder="Your Name" />

                            <label className="label">Driving License Number</label>
                            <input type="text" {...register('drivingLicenseNum', { required: true })} className="input w-full" placeholder="Driving License Number" />

                            <label className="label">Your Email</label>
                            <input type="email" defaultValue={user.email} {...register('email', { required: true })} className="input w-full" placeholder="Your Email" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Your Region</legend>
                                <select {...register('riderRegion', { required: true })} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        region.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Your District</legend>
                                <select {...register('riderDistrict', { required: true })} defaultValue="Pick a District" className="select">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(riderRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <label className="label">NID No</label>
                            <input type="text" {...register('nid', { required: true })} className="input w-full" placeholder="NID No" />

                            <label className="label mt-4">Phone Number</label>
                            <input type="text" {...register('phoneNum', { required: true })} className="input w-full" placeholder="Phone Number" />

                            <label className="label mt-4">Bike Registration Number</label>
                            <input type="text" {...register('bikeRegNum', { required: true })} className="input w-full" placeholder="Bike Registration Number" />

                        </fieldset>
                    </div>

                </div>
                <input type="submit" className="btn btn-primary mt-6" value="Submit" />
            </form>
        </div>
    );
};

export default Rider;