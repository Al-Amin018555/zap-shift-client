import logo from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <h3 className='text-2xl font-extrabold -ms-2.5'>ZapShift</h3>
        </div>
    );
};

export default Logo;