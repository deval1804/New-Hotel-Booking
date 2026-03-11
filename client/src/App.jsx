import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import AllRoom from "./Pages/AllRoom";
import RoomDetail from "./Pages/RoomDetail";
import MyBookings from "./Pages/MyBookings";
import HotelReg from "./components/HotelReg";
import LayOut from "./Pages/hotelOwner/LayOut";
import Dashboard from "./Pages/hotelOwner/Dashboard";
import Addroom from "./Pages/hotelOwner/Addroom";
import ListRoom from "./Pages/hotelOwner/ListRoom";

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner")
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRoom />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
       <Route path="/owner/*" element={<LayOut />} >
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<Addroom />} />
          <Route path="list-room" element={<ListRoom />} />
          {/* <Route path="add-room" element={<Addroom />} />
          <Route path="list-room" element={<ListRoom />} /> */}

        </Route>


        </Routes>
      </div>
      <Footer />
    </div>
  )
}
export default App