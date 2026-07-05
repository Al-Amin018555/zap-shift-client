import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import amazon from '../../../assets/brands/amazon.png'
import amazonVector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import starPeople from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';
const Brands = () => {
    const brandLogos = [amazon, amazonVector, casio, moonstar, randstad, star, starPeople];
    return (

        <div>
            <div>
                <h2 className='text-secondary text-center mt-10 text-[28px] font-extrabold'>We've helped thousands of sales teams</h2>
            </div>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className='my-10'
            >


                {
                    brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} /></SwiperSlide>)
                }



            </Swiper>

        </div>
    );
};

export default Brands;