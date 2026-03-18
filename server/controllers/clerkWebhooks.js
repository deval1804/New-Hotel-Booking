// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//   try {

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"]
//     };

//     await whook.verify(JSON.stringify(req.body), headers);

//     const { data, type } = req.body;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_address,
//       username: `${data.first_name || ""} ${data.last_name || ""}`,
//       image: data.image_url,
//     };

//     switch (type) {

//       case "user.created":
//         await User.create(userData);
//         break;

//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;

//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;

//       default:
//         break;
//     }

//     res.json({ success: true });

//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     try {

//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         };

//         console.log("Saving user:", userData);

//         const payload = await whook.verify(req.body, headers);

//         const { data, type } = payload;

//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: `${data.first_name || ""} ${data.last_name || ""}`,
//             image: data.image_url,
//             recentSearchedCities: []
//         };

//         switch (type) {

//             case "user.created":
//                 await User.create(userData);
//                 break;

//             case "user.updated":
//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;

//             case "user.deleted":
//                 await User.findByIdAndDelete(data.id);
//                 break;

//             default:
//                 break;
//         }

//         res.json({ success: true });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false });
//     }
// };

// export default clerkWebhooks;

import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

       const payload = await whook.verify(req.body.toString(), headers);
    const { data, type } = payload;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`,
      image: data.image_url || "",
      recentSearchedCities: []
    };

    console.log("Saving user:", userData);

    switch (type) {

      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.json({ success: true });

  } catch (error) {
    console.log("Webhook error:", error);
    res.json({ success: false });
  }
};

export default clerkWebhooks;