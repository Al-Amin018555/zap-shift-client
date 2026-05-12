import Banner from '../Banner/Banner'
import Brands from '../Brands/Brands';
import HowItWorks from '../HowItWorks/HowItWorks'
import Services from '../Services/Services'

const Home = () => {
    return (
        <div>
            <div className="my-10">
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <Services></Services>
                <Brands></Brands>
            </div>
        </div>
    );
};

export default Home;