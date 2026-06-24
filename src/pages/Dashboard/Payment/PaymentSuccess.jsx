import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});

    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    console.log(sessionId);

    console.log("hi payment success");


    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({ trackingId: res.data.trackingId, transactionId: res.data.transactionId })
                })
        }
    }, [sessionId, axiosSecure])


    return (
        <div>
            <h2>Your payment is successful</h2>
            <p>Your Tracking id : {paymentInfo.trackingId}</p>
            <p>Your Transaction id : {paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;