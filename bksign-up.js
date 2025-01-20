const express = require('express');
const admin = require('firebase-admin');

const app = express();
const PORT = 3000;

// Parse JSON body
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount_signup = require('./aarvasa-auth-firebase-adminsdk-s0hoq-4d1f371928.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount_signup),
    databaseURL: "https://aarvasa-auth-default-rtdb.firebaseio.com/" // Replace with your database URL
});

const auth = admin.auth();
const db_sign_Up = admin.database();

// Signup API

app.post('/signup', async (req, res) => {
    const {
        email,
        password,
        fullName,
        contactNo,
        countryCode,
        age,
        area,
        pincode,
        state,
        district,
        roadNo,
        panCardNo,
    } = req.body;

    // Validate required fields
    if (
        !email ||
        !password ||
        !fullName ||
        !contactNo ||
        !countryCode ||
        !age ||
        !area ||
        !pincode ||
        !state ||
        !district ||
        !roadNo ||
        !panCardNo
    ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Create user in Firebase Authentication
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: fullName,
        });

        // Store user data in Firebase Realtime Database
        const userId = userRecord.uid;
        await db.ref('users/' + userId).set({
            email,
            fullName,
            contactNo,
            countryCode,
            age,
            address: {
                area,
                pincode,
                state,
                district,
                roadNo,
            },
            panCardNo,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({
            message: 'User created successfully',
            userId: userId,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
