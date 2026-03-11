import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetail = () => {

    const { id } = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {

        const foundRoom = roomsDummyData.find(
            room => room._id.toString() === id
        )

        if (foundRoom) {
            setRoom(foundRoom)
            setMainImage(foundRoom.images[0])
        }

    }, [id])

    if (!room) return null

    return (
        <>
            <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

                {/* Room Details */}
                <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>
                        {room.hotel.name}
                        <span className='font-inter text-sm'> ({room.roomType})</span>
                    </h1>

                    <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
                        20% OFF
                    </p>
                </div>

                {/* Room Rating */}
                <div className='flex items-center gap-1 mt-2'>
                    <StarRating />
                    <p className='ml-2'>200+ reviews</p>
                </div>

                {/* Room Address */}
                <div className='flex items-center gap-1 text-gray-500 mt-2'>
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{room.hotel.address}</span>
                </div>

                {/* Room Images */}
                <div className='flex flex-col lg:flex-row mt-6 gap-5'>

                    <div className='lg:w-1/2 w-full'>
                        <img
                            src={mainImage}
                            alt="Room"
                            className='w-full rounded-xl shadow-lg object-cover'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>

                        {room?.images?.length > 1 &&
                            room.images.map((image, index) => (

                                <img
                                    key={index}
                                    src={image}
                                    alt="Room"
                                    onClick={() => setMainImage(image)}
                                    className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                                    ${mainImage === image ? 'outline outline-2 outline-orange-500' : ''}`}
                                />

                            ))}

                    </div>

                </div>

                {/* Room Highlights */}
                <div className='flex flex-col md:flex-row md:justify-between mt-10'>

                    <div>

                        <h1 className='text-3xl md:text-4xl font-playfair'>
                            Experience Luxury Like Never Before
                        </h1>

                        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>

                            {room?.amenities?.map((item, index) => (

                                <div
                                    key={index}
                                    className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'
                                >

                                    <img
                                        src={facilityIcons[item]}
                                        alt={item}
                                        className='w-5 h-5'
                                    />
                                    <p className='text-xs'>{item}</p>
                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Room Price */}
                <p className='text-2xl font-medium mt-6'>
                    ${room.pricePerNight}/night
                </p>

            </div>

            {/* Room Checkout Form */}
            <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto  max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor='checkInDate' className='font-medium'>Check-In</label>
                        <input
                            type="date" id='checkInDate' placeholder='Check-In'
                            className='border border-gray-300 rounded px-3 py-2 mt-1.5 outline-none w-full' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor='checkOutDate' className='font-medium'>Check-Out</label>
                        <input
                            type="date" id='checkOutDate' placeholder='Check-Out'
                            className='border border-gray-300 rounded px-3 py-2 mt-1.5 outline-none w-full' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor='guests' className='font-medium'>Guests</label>
                        <input
                            type="number" id='guests' placeholder='0'
                            className=' max-w-20 border border-gray-300 rounded px-3 py-2 mt-1.5 outline-none ' required />
                    </div>



                </div>
                <button className='bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium'>
                    Check Availability
                </button>
            </form>

            {/* Common Specification */}
            <div className='mt-25 space-y-4 max-w-5xl mx-auto px-6'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <img
                            src={spec.icon}
                            alt={`${spec.title}-icon`}
                            className='w-6.5'
                        />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='max-w-5xl mx-auto px-6 border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p>
                    Guests will be allocated on the ground floor according to availability.
                    You get a comfortable Two bedroom apartment has a true city feeling.
                    The price quoted is for two guest, at the guest slot please mark the
                    number of guests to get the exact price for groups. The Guests will be
                    allocated ground floor according to availability. You get the
                    comfortable two bedroom apartment that has a true city feeling.
                </p>
            </div>

            {/* Hosted by */}
            <div className='max-w-5xl mx-auto px-6 flex flex-col items-start gap-4'>
                <div className='flex items-center gap-4'>

                    <div className="h-14 w-14 md:h-18 md:w-18 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-semibold">
                        {room.hotel.name.charAt(0)}
                    </div>

                    <div>
                        <p className='text-lg md:text-xl'>Hosted By {room.hotel.name}</p>

                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2'>200+ Reviews</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RoomDetail