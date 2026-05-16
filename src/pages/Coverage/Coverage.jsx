import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from "react-router";
const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    console.log(serviceCenters);
    return (
        <div className="space-y-6">
            <h2 className="text-5xl font-bold text-secondary">We are available in 64 districts</h2>
            <div></div>
            <h2 className="text-3xl font-bold text-secondary">We deliver almost all over Bangladesh</h2>
            <div className="border-2 w-full h-200 my-10">
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-200"
                >
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                    </TileLayer>
                    {
                        serviceCenters.map(center => <Marker key={center.district} position={[center.latitude,center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(", ")}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;