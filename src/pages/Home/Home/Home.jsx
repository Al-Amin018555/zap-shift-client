import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";

const Home = () => {
    return (
        <div>
            <div className="my-10">
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <Services></Services>
            </div>
        </div>
    );
};

export default Home;