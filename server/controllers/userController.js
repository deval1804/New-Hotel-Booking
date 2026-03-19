// // Get /api/user/

// export const getUserData = async (req, res) => {
//     try {
//         const role = req.user.role;
//         const recentSearchedCities = req.user.recentSearchedCities;
//         res.json({ success: true, role, recentSearchedCities });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }



// // Store recent searched cities for the user
// export const storeRecentSearchedCities = async (req, res) => {
//     try {
//         const { recentSearchedCities } = req.body;
//         const user = await req.user;

//         if (user.recentSearchedCities.length < 3) {
//             user.recentSearchedCities.push(recentSearchedCities)
//         } else {
//             user.recentSearchedCities.shift();
//             user.recentSearchedCities.push(recentSearchedCities);
//         }
//         await user.save();
//         res.json({ success: true, message: "Recent searched cities added successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// Get /api/user/
export const getUserData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities || [];

        return res.status(200).json({
            success: true,
            role,
            recentSearchedCities
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// Store recent searched cities for the user
export const storeRecentSearchedCities = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { recentSearchedCities } = req.body;
        const user = req.user;

        if (!recentSearchedCities) {
            return res.status(400).json({
                success: false,
                message: "recentSearchedCities is required"
            });
        }

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCities);
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Recent searched cities added successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}