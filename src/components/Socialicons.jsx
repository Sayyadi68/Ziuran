import React from 'react'
import { FaTelegram, FaInstagram } from 'react-icons/fa'

const Socialicons = () => {
    return (
        <div className='flex flex-row items-end gap-2 mr-[-20px] '>


            <div className=' cursor-pointer group hover:bg-[#FF4D6D] hover:transition-all transition-all p-2 border-grey-800 rounded-full border-2'>

                <FaTelegram className='group-hover:text-white'/>

            </div>


            <div className=' cursor-pointer group hover:bg-[#FF4D6D] hover:transition-all transition-all p-2 border-grey-800 rounded-full border-2'>

                <FaInstagram className='group-hover:text-white'/>

            </div>


        </div>
    )
}

export default Socialicons
