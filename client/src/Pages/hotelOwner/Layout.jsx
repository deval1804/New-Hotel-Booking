import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />

            <div className='flex flex-1 h-full'>
                <Sidebar />

                <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default LayOut