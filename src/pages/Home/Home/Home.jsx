import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";

const Home = () => {
    return (
        <div>
            <div className="my-10">
                <Banner></Banner>
                <HowItWorks></HowItWorks>
            </div>
        </div>
    );
};

export default Home;