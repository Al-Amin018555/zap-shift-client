import marchant from '../../../assets/location-merchant.png'
const Merchant = () => {
    return (
        <div className="p-20 bg-secondary rounded-4xl my-24">
            <div>
                <div className='flex  items-center'>
                    <div className="space-y-6">
                        <h2 className="font-extrabold text-secondary-content text-4xl">Merchant and Customer Satisfaction is Our First Priority</h2>
                        <p className="text-secondary-content">We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                        <div className='space-x-4'>
                            <button className='btn btn-primary rounded-full text-primary-content font-bold text-xl px-8 py-4'>Become a Merchant</button>
                            <button className='btn btn-outline rounded-full text-primary hover:btn-primary hover:text-primary-content font-bold text-xl px-8 py-4'>Earn with ZapShift Courier</button>
                        </div>
                    </div>

                    <img src={marchant} alt="" />

                </div>

            </div>

        </div>
    );
};

export default Merchant;