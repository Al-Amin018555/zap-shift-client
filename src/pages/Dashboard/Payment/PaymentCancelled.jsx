import { Link } from "react-router";

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is cancelled. Please try again
            </h2>
            <Link clas to="/dashboard/my-parcels">
            <button className="btn btn-primary">Try again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;