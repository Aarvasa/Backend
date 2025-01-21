require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
var admin = require("firebase-admin");
const { Country, State, City } = require("country-state-city");

let service_account = {
  "type": "service_account",
  "project_id": "aarvasa-property-listing",
  "private_key_id": "60043211655064be676a5147ed13a7cc6d502ecc",
  "private_key": process.env.FIREBASE_SERVICE_ACCOUNT,
  "client_email": "firebase-adminsdk-xiqqu@aarvasa-property-listing.iam.gserviceaccount.com",
  "client_id": "118103228326978316659",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xiqqu%40aarvasa-property-listing.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

console.log("jj");

console.log(service_account);

admin.initializeApp({
  credential: admin.credential.cert(service_account)
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
  
      const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address= ' + encodeURIComponent(address) + '&key=' + process.env.GOOGLE_MAPS_API_KEY; 
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
    const { state, city, pincode, min , max } = filters;
    console.log("hello");
    console.log(state);

    const propertiesSnapshot = await db.collection('propertyDetails').get(); // Adjust the collection name
    const properties = propertiesSnapshot.docs.map(doc => doc.data());
    let prop = [];
    for(g in properties){
      
      if(properties[g].state == state && properties[g].city == city && properties[g].pincode == pincode){
        let prc = parseInt(properties[g].price);
        let mind = parseInt(min);
        let maxd = parseInt(max);
        if(prc>=mind && prc <= maxd ){
          prop.push(properties[g]);
        }
      }
    }
    return prop;
  }

  app.post('/get_within_range',async function(req,res){
    try {
      const { address,range } = req.body;
      console.log(address);
      const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address= ' + encodeURIComponent(address) + '&key=' + process.env.GOOGLE_MAPS_API_KEY; 
      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      const data = response.data;
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        let a = location.lng;
        let b = location.lat;
        console.log(b);
        console.log(a);
        
        const propertiesSnapshot = await db.collection('propertyDetails').get(); // Adjust the collection name
        const properties = propertiesSnapshot.docs.map(doc => doc.data());
        console.log(properties);
        const nearbyProperties = [];
        console.log("range  is");
        console.log(range);
      // Compare distances
      for (const property of properties) {
        const propertyLat = property.latitude; // Replace with the correct field name
        const propertyLng = property.longitude; // Replace with the correct field name
        const userLocation = { lat: b, lng: a }; // User's location (lat, lng)
        const propertyLocation = { lat: propertyLat, lng: propertyLng }; // Property's location (lat, lng)
        // Prepare the API URL for Distance Matrix API
        const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?' +
            'origins=' + b + ',' + a +  // User location (origins)
            '&destinations=' + propertyLat + ',' + propertyLng +  // Property location (destinations)
            '&key=' + process.env.GOOGLE_MAPS_API_KEY +
            '&units=metric';  // You can use metric units for kilometers or meters
        // Make the API call
        const distanceResponse = await axios.get(apiUrl);
        if (
          distanceResponse.data.rows &&
          distanceResponse.data.rows.length > 0 &&
          distanceResponse.data.rows[0].elements &&
          distanceResponse.data.rows[0].elements.length > 0
        ) {
          const distanceElement = distanceResponse.data.rows[0].elements[0];
          if (distanceElement.status === "OK") {
            let distanceInMeters = distanceElement.distance.value; // The distance in meters
            console.log(`Distance to property: ${distanceInMeters} meters`);
            console.log(property);
            distanceInMeters = parseFloat(distanceElement.distance.value);
            let ranged = parseFloat(range);
            if (distanceInMeters <= ranged) {
              nearbyProperties.push(property);
            }
          }
        }
      }
        console.log("hiiiiiiii");
        console.log(nearbyProperties);
        res.json({ nearbyProperties });
        console.log("hello");
      } else {
        res.status(404).json({ error: 'Address not found' });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ error: 'Failed to fetch coordinates' });
    }
  });

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

app.post('/signup', async (req, res) => {
    const {
        email,
        password,
        fullName,
        contactNumber,
        countryCode,
        age,
        area,
        pincode,
        state,
        district,
        roadNo,
        panCard,
    } = req.body;

    const data = {
      email,
        password,
        fullName,
        contactNumber,
        countryCode,
        age,
        area,
        pincode,
        state,
        district,
        roadNo,
        panCard,
      
      };

    // Validate required fields
    

    try {
      console.log(data);
        // Create user in Firebase Authentication
        const docRef = await db.collection('login_details').add(data);
           
    
        console.log('Data stored in Firebase with ID:', docRef.id);
        res.status(200).json({ success: true, id: docRef.id });
       
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});
  

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
