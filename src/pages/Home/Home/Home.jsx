import Banner from '../Banner/Banner'
import Brands from '../Brands/Brands';
import HowItWorks from '../HowItWorks/HowItWorks'
import Merchant from '../Merchant/Merchant';
import Reviews from '../Reviews/Reviews';
import Services from '../Services/Services'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const reviewPromise = fetch("reviews.json").then(res => res.json());

const Home = () => {
    return (
        <div>
            <div className="my-10">
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <Services></Services>
                <Brands></Brands>
                <WhyChooseUs></WhyChooseUs>
                <Merchant></Merchant>
                <Reviews reviewPromise={reviewPromise}></Reviews>
            </div>
        </div>
    );
};

export default Home;