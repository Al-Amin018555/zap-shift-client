import { Link } from 'react-router';
import error from '../../assets/error.png'
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';
const ErrorPage = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className='mt-8 flex justify-center flex-col items-center rounded-4xl bg-white px-24 py-20'>
                <div>
                    <img className='w-75' src={error} alt="" />
                </div>
                <div>
                    <Link to='/' className='btn btn-primary text-primary-content'>Go Home</Link>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;