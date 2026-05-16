import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const {userName,user_photoURL,review:testimonial} = review;
    return (
        <div className="card bg-base-200 rounded-3xl p-8 max-w-md shadow-sm">
            
            {/* Quote Icon */}
            <div className="text-cyan-500 text-4xl mb-6">
                <FaQuoteLeft />
            </div>

            {/* Review Text */}
            <p className="text-lg mb-8">
               {testimonial}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-cyan-700 mb-6"></div>

            {/* Reviewer Info */}
            <div className="flex items-center gap-4">
                
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-teal-900">
                    <img src={user_photoURL} alt={userName} />
                </div>

                {/* Name & Role */}
                <div>
                    <h3 className="text-2xl font-bold text-teal-900">
                        {userName}
                    </h3>

                    <p className="text-gray-500 text-lg">
                        Senior Product Designer
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;