let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
var admin = require("firebase-admin");
const { Country, State, City } = require("country-state-city");
var serviceAccount = {
  "type": "service_account",
  "project_id": "aarvasa-property-listing",
  "private_key_id": "0afbc990031eeaea4f03b2e3628182f994cf9b69",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCvajGCvh7Qd0rT\nYrTCRxDLesz+zPpCHaoaRTcA5K9hBkOglrJuYp98WLJHEBKZ8F9O38DSoRFEa6ze\nuziVKtT+7DE6N4OV5WXA9Hy+FUjIGQVAwDVLHEBCma395XdNayecD+aPPYrsnfjc\nQdxMpIX3NQoFJ3QLVxjaTp/hYwtB2gebGFTsw/RKZoWZGm8PcJ0p21IHmoUP1uYp\nuPLwY7+ZIwllMwKdPI/8drEIGiXOncmOZLQmmttWNb+hFUZV64RN7VLOIspFn+Ee\nIJ4+GLUchqTVZmHzAzWCu1XLqT25BTN2O0erYXPpyZFZe86XNtayHcbs6Eke4Msg\nuw1gLnqNAgMBAAECgf8WWUbo9FkQInlC5ujacskTQIDqSKTh8QfanoG5IbkHmZ/B\nasSs7B9HDEMv4gwe6R7duIWcOq2vgATaLOxucpXkzxQ813ne0ozUC1XOeWtYKLd2\n5U5RF1QRYd8B3i65EKFLgqkUTPZeG1nHgBc2Mf05mhI/rUuliy+gUWXrCiJFe/DF\nZNuwpn9ZxkVH6ZKdGfDaevIHjqDOdOS20itqe0I1gHy7kX3zdzhwAW6000Pi0bjG\nlsrTZgvZjvlf/Y3mFHKbXaj99XY6t8TOBo1AtGKJU+lvTKwkA0Dg22/SxyV8egK+\n5kkA0AktmipCHwlDyjKmiJwPcHVURzHW4/MHZikCgYEA1roiMvStxCSqvSCZkmDs\nj3Y3e/JUF0UuwR+miejFOn5BQ4OS/S7tcHKxinRkqM23YsBsK+FEwtNa2Wc59yUL\n0jRDER1Pq4tNTegxHkP8TYAe0IeqQEQwe6VLGQJMUeNyTEeoD1hBqJFSJM2Zh6RG\nDsa5bdSIah0osepb2V6reYUCgYEA0SGo0CPoKnIkkcjmRwRfJSIryQRebHw/xEv2\nFUEwe1Goi2mFfr4m+ZstAgkpCk+HELBkVbNoZorEEjiWTX2JGUuFSHjBaF4Y/ph4\n0fJLd7XgJsGkoMjQPaLBCJnM6/jP+gbKlUHNUt25vUpuZ/UbhjKJTUaH9tKYJ/za\n2aibB2kCgYEAoPN8Vv2YkoF5ibI56sLEDvTpufp2lcrBtPjoeE8GJ0Yj3VtufmEC\nkVsnQUTlfrJUV60sZ+e/BtouKu95P4uBRNrvupBh+4+7Lj5xMuJ66Ay1DFHkh6+V\nN9k6ZVCXrHn0XsEHdBkPfi8Ph46lGktESCclLvI0HnYk3tdwaYrQtZECgYBm/oC5\nITXx0Y0ZDyv5xbll/FI8CZ7HJtnwvshO53ANC8ZKAonwRY3EWBvuaLyBi3ElUvnX\nCyhbd/PgVWYQe8bNYlgdvPrjf5Qnrsex/fYU2smtzKhbVwrXkBQpPDWj8UHcDQQw\nRdvs963F/6YoJJqNmM3t9NJ5SHYPG4RctaDEIQKBgHE8pTzAPKyQtsMe/M+F3j3X\nQaSFGFJB538aMeV+gsUKmMFkJfAwLakA2VA9mwfMbRiZiYdDU+ttsx98HOrTy9xM\nsMtmCW5UW70pWcuXbacfh1AT7ZALdYD9g/5O3PwaYrqcsPZYIeDEYtnNYOqLR3xV\nc92QV3iy5G0CJXszt7zD\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xiqqu@aarvasa-property-listing.iam.gserviceaccount.com",
  "client_id": "118103228326978316659",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xiqqu%40aarvasa-property-listing.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1a_M68xvwRgZGXhxtpVlWjylJmAkNz-w",
  authDomain: "aarvasa-property-listing.firebaseapp.com",
  projectId: "aarvasa-property-listing",
  storageBucket: "aarvasa-property-listing.firebasestorage.app",
  messagingSenderId: "585447833026",
  appId: "1:585447833026:web:dee77232e32fc7acf7aa5b",
  measurementId: "G-WLPDKTJCBJ"
};

// Initialize Firebase
const app_b = initializeApp(firebaseConfig);


// Cloudinary configuration function
function configureCloudinary() {
    cloudinary.config({
        cloud_name: 'dqhddm7mi',
        api_key: '222323681783653',
        api_secret: 'JYjcMfIJhwySByknWD2z_6B7J8Q',
    });
    console.log('Cloudinary configured successfully.');
}

// Function to upload an image
async function uploadImage(filePath, publicId) {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, { public_id: publicId });
        console.log('Image uploaded successfully:', uploadResult);
        return uploadResult;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

// Function to generate transformed URLs
function getTransformedUrls(publicId) {
    const optimizeUrl = cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
    });

    const autoCropUrl = cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    return { optimizeUrl, autoCropUrl };
}

// Immediately Invoked Function to demonstrate the upload
(async function () {
    configureCloudinary();

    
})();

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/base.html'));
});

app.post('/get-coordinates', async (req, res) => {
    try {
      const { address } = req.body;
  
      const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address= ' + encodeURIComponent(address) + '&key=AIzaSyCZQ7QBcNicwveYO_z21CjV_zkhM8nNb7M'; 
      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      const data = response.data;
  
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        res.json({ longitude: location.lng, latitude: location.lat });
      } else {
        res.status(404).json({ error: 'Address not found' });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ error: 'Failed to fetch coordinates' });
    }
  });

app.post('/store_details',async function(req,res){

        
        try {
            const { city, state, pincode, addressDetails, price, size, sqftPrice, latitude, longitude,uploadedMediaUrls } = req.body;
    
            // Prepare the data object
            const data = {
                city,
                state,
                pincode,
                addressDetails,
                price,
                size,
                sqftPrice,
                latitude,
                longitude,
                uploadedMediaUrls
                
            };
            
    
            // Push the data to Firebase (Firestore example)
            const docRef = await db.collection('propertyDetails').add(data);
           
    
            console.log('Data stored in Firebase with ID:', docRef.id);
            res.status(200).json({ success: true, id: docRef.id });
        } catch (error) {
            console.error('Error storing details in Firebase:', error);
            res.status(500).json({ error: 'Failed to store details in Firebase' });
        }
    



});

app.post('/filter', async function(req, res) {
    const filters = req.body; // Get the filters from the request body
    console.log("Received filters:", filters);
  
    try {
      const filteredData = await getFilteredData(filters);
      res.json(filteredData); // Send filtered data back as response
    } catch (error) {
      console.error("Error filtering data:", error);
      res.status(500).send('Server error');
    }
  });
  
  // Function to get filtered data from Firestore
  const getFilteredData = async (filters) => {
    const { state, city, pincode, price } = filters;
  
    let query = db.collection('properties'); // Replace 'properties' with your collection name
  
    // Apply filters based on provided values
    if (state && state !== 'all') {
      query = query.where('state', '==', state);
    }
  
    if (city && city !== 'all') {
      query = query.where('city', '==', city);
    }
  
    if (pincode && pincode !== '') {
      query = query.where('pincode', '==', pincode);
    }
  
    if (price.min !== '' && price.max !== '') {
      query = query.where('price', '>=', parseInt(price.min))
                   .where('price', '<=', parseInt(price.max));
    }
  
    // Execute the query and return the results
    const snapshot = await query.get();
  
    if (snapshot.empty) {
      console.log("No matching documents.");
      return [];
    }
  
    // Format the result data
    const results = snapshot.docs.map(doc => doc.data());
    return results;
  };

  app.get("/api/states", (req, res) => {
    const states = State.getStatesOfCountry("IN"); // "IN" is the ISO code for India
    res.json(states);
  });
  
  // Get cities of a state
  app.get("/api/cities/:stateCode", (req, res) => {
    const stateCode = req.params.stateCode;
    const cities = City.getCitiesOfState("IN", stateCode); // Use state code
    res.json(cities);
  });
  

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
