import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
// API to create a new room for a hotel
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel)
            return res.json({ success: false, message: "No Hotel found" });

        // upload images to cloudinary and get the URLs
        const uploadedImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        // wait for all images to be uploaded and get the URLs
        const images = await Promise.all(uploadedImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        })
        res
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// API to get all rooms for a hotel
export const getRooms = async (req, res) => {

}

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {

}

// API to toggle room availability
export const toggleRoomAvailability = async (req, res) => {

}