import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiUser,
    FiShoppingCart,
    FiBook,
    FiShoppingBag,

} from 'react-icons/fi';

// آرایه‌ای برای آمار بالا  
const stats = [
    { id: 1, icon: <FiUser className='text-[#FF4D6D] text-xl hover:text-gray-400 transition-all  hover:cursor-pointer mx-auto' />, label: 'حساب من' , link:'account'},
    { id: 2, icon: <FiShoppingCart className='text-[#FF4D6D] text-xl hover:text-gray-400 transition-all  hover:cursor-pointer mx-auto' />, label: 'سبد خرید' , link:'cart'},
    { id: 3, icon: <FiBook className='text-[#FF4D6D] text-xl hover:text-gray-400 transition-all  hover:cursor-pointer mx-auto' />, label: 'بلاگ' , link:'blog'},
    { id: 4, icon: <FiShoppingBag className='text-[#FF4D6D] text-xl hover:text-gray-400 transition-all  hover:cursor-pointer mx-auto' />, label: 'فروشگاه', link:'products' },
];


const PhoneBottomMenu = () => {
    return (
        <div className='fixed bottom-0 w-full bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)] lg:block xl:hidden'>
            {/* بخش آمار بالا */}
            <div className='flex flex-row-reverse justify-around p-4'>
                {stats.map(stat => (
                    <NavLink to={stat.link} key={stat.id} className='text-center'>
                        {stat.icon}
                        <p className='text-gray-700 text-sm mt-1'>{stat.label}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default PhoneBottomMenu;