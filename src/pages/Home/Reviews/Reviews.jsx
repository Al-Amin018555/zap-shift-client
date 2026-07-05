import { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import customerReviewImg from '../../../assets/customer-top.png'

const Reviews = ({ reviewPromise }) => {
    const reviews = use(reviewPromise);
    return (
        <div className="my-24">
            <div className="flex justify-center">
                <img src={customerReviewImg} className="mb-10" />
            </div>
            <div className="text-center space-y-6">
                <h2 className="text-secondary text-4xl font-extrabold">What our customers are sayings</h2>
                <p className="mb-10 text-xl text-primary-content">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br />  pain, and strengthen your body with ease!</p>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 30,
                    stretch: "50%",
                    depth: 200,
                    scale: 0.75,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <ReviewCard review={review}></ReviewCard>
                    </SwiperSlide>)
                }

            </Swiper>

        </div>
    );
};

export default Reviews;