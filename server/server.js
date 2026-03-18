// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.js";

// connectDB();

// const app = express();
// app.use(cors());  //Enable Cross-Origin Resource Sharing


// //Middleware 
// app.use(express.json()); //Parse incoming JSON requests
// app.use(clerkMiddleware())

// // API to listen to Clerk Webhooks
// app.use("/api/clerk", clerkWebhooks);

// app.get("/", (req, res) => {
//     res.send("API is working");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import userRouter from "./routes/userRoutes.js";
// import hotelRouter from "./routes/hotelRoutes.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import roomRouter from "./routes/roomRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";

// connectDB();
// connectCloudinary();

// const app = express();

// // app.use(cors());
// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "https://your-frontend-domain.vercel.app"
//     ],
//     credentials: true
// }));

// // ⭐ webhook raw body (important)
// app.post("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);
// // app.use("/api/clerk", clerkWebhooks);

// // normal json middleware
// app.use(express.json());

// app.use(clerkMiddleware());

// app.get("/", (req, res) => { res.send("API is working"); });
// app.use("/api/user", userRouter);
// app.use("/api/hotel", hotelRouter);
// app.use("/api/room", roomRouter);
// app.use("/api/booking", bookingRouter);



// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB();
connectCloudinary();

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://new-hotel-booking.vercel.app" // your real frontend domain
  ],
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// handle preflight
app.options("*", cors());

// ⭐ webhook raw body (important)
app.post("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// normal middleware
app.use(express.json());
app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => { res.send("API is working"); });

app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});