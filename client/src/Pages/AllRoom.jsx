import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="radio" name='sortOption' checked={selected} onChange={() => onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRoom = () => {
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false);

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite"
    ];
    const priceRanges = [
        "0 to 500",
        "500 to 1000",
        "1000 to 2000",
        "2000 to 3000",
        "3000 to 4000",
    ];
    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ];

    return (
        <div className='pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Heading */}
            <header className='flex flex-col items-start text-left mb-8'>
                <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-[500px]'>
                    Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                </p>
            </header>

            <div className='flex flex-row flex-wrap gap-8'>
                {/* Main Content - Appears on the left in all views */}
                <main className='flex-1 min-w-0'>
                    {/* Rooms List */}
                    <div className='flex flex-col gap-10'>
                        {roomsDummyData.map((room) => (
                            <article
                                key={room._id}
                                className='flex flex-col md:flex-row items-start gap-6 border-b border-gray-300 pb-10'
                            >
                                {/* Image */}
                                <figure className='w-full md:w-[30%]'>
                                    <img
                                        onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                                        src={room.images[0]}
                                        alt={`${room.hotel.name} room`}
                                        title='View Room Details'
                                        className='h-60 rounded-xl shadow-lg object-cover cursor-pointer w-full'
                                        aria-label={`View details of ${room.hotel.name}`}
                                    />
                                </figure>

                                {/* Info */}
                                <div className='md:w-[60%] flex flex-col gap-2'>
                                    <p className='text-gray-500'>{room.hotel.city}</p>
                                    <h2
                                        onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                                        className='text-gray-800 text-3xl font-playfair cursor-pointer hover:underline'
                                        aria-label={`View details of ${room.hotel.name}`}
                                    >
                                        {room.hotel.name}
                                    </h2>
                                    <div className='flex items-center'>
                                        <StarRating />
                                        <p className='ml-2'>200+ reviews</p>
                                    </div>
                                    <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                        <img
                                            src={assets.locationIcon}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                        <span>{room.hotel.address}</span>
                                    </div>
                                    {/* Room Amenities */}
                                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                        {room.amenities.map((item, index) => (
                                            <div
                                                key={index}
                                                className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'
                                            >
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt=""
                                                    className='w-5 h-5'
                                                    aria-hidden="true"
                                                />
                                                <p className='text-xs'>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Room Price per Night */}
                                    <p className='text-xl font-medium text-gray-700'>
                                        ${room.pricePerNight.toLocaleString()} /night
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </main>

                {/* Filter Sidebar - Appears on the right in all views */}
                <div className='w-full lg:w-80'>
                    <div className='bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden'>
                        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
                            <p className='text-base font-medium text-gray-800'>FILTERS</p>
                            <div className='flex items-center gap-3'>
                                <span 
                                    onClick={() => setOpenFilters(!openFilters)}
                                    className='lg:hidden text-blue-600 hover:underline text-sm cursor-pointer'
                                >
                                    {openFilters ? 'HIDE' : 'SHOW'}
                                </span>
                                <span 
                                    className='text-blue-600 hover:underline text-sm cursor-pointer'
                                    onClick={() => {/* Add clear all filters logic */}}
                                >
                                    CLEAR
                                </span>
                            </div>
                        </div>
                        
                        <div className={`${openFilters ? 'block' : 'hidden lg:block'} transition-all duration-300`}>
                            <div className='px-5 py-4 space-y-6'>
                                <div>
                                    <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
                                    <div className='space-y-2'>
                                        {roomTypes.map((room, index) => (
                                            <CheckBox key={index} label={room} />
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                                    <div className='space-y-2'>
                                        {priceRanges.map((range, index) => (
                                            <CheckBox key={index} label={`$ ${range}`} />
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                                    <div className='space-y-2'>
                                        {sortOptions.map((option, index) => (
                                            <RadioButton key={index} label={option}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRoom;