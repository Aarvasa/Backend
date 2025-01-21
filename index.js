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
  "private_key_id": "f798b9566219cda704f7ed6f6f0b23f529382270",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGYz2agwkxKfo4\n1yZQzPwDQmdgoz39IKxe29wAliZ89FLV6aFOH3mqhOJm3wZBwCS9EwjXBgMhhuI7\ntCAkuS+FBCyGBsyJS2UqL08kql+/9e1cnSCCnAZ0BvZx9RcNUEldM1NAO6cN4TAb\nasj+aorw9R2ozyUZjIoYACjxg3fZqfkg30vk5a4F0TEIpF2tPmRxVKzYmmM6a8Br\nal5kyGcwBYwMOEpiO0qZb7U/nGrMAHXamGN+Qc2Fv4a4nqr4Qg/9eiu4XtwPGj39\n86xwpWEds72r+0so1xyTNQ7ERC6baAo2SztKGvrdGzMQjtryzV4LtqDJjCH6rI0R\n9KNgdae1AgMBAAECggEACC5W/8HCwFzatVCFWLnUnv4fHRCA8ajmMCTmZ2gfDweU\nnpQmGKk6dJz1aNMZIwnSqgZjLATS3mV9e634+7K0TOAIGwB5m6QjjZq1AON9aSvc\nfYrQPfqZAdy4pH3m1Qp4IAhfY5Z3ft5yrqrCaPVz+dhN1bncbeI1CU+BC2abFmYg\njd2YdovLqPhYws9ZSBtlYpHJ/8CMGHMmeM96AG5bY3LcDVHPTUPpaF7tnG5z/64e\nbfwEwO6/3jwKF2tU7SsSy664aUuSOD2+VfColcdDNx28wkNxpkpLgiFTbNnck3ku\nfG9qTdoyPTP83E1GA47rH7aPEWhVnT2eSKMuHib5eQKBgQD7W/+J9ebHDedTvlH7\npEoHPqIs5BshuMO9ekw1AaDCN/9G/oHYgHrlexJ6qvR40Nb/nkdM73Wsx+dWmSxq\nG3h20cslraiDl+4EDp8bbWL7n7tUe5EaU5iyWNRhY9cJH6GKjcAxiU5v7MyNTBzi\nydj7srSfEahUo8xCEu6I/ggdiQKBgQDKDOG/SJ6ooWn3AkYPZG7yH54Wkgz0OkQn\n62pik/F8trRXVYrgQo4ipJB9+3sfpjLykzMT1MpUy0XCyJFcd3bWJBCUo8W+prZF\niXiHFqUXfYRaohKQNr5yJQRrJc/xWHdaQUN9o3tY+SyMduCHqtHrPD/n8NQNWZnj\nCzMGiC65zQKBgQCJ9G8mx9hWTZI1yxHx27Rpj32wx60AcAi2OKYUvYT+s38e9tZK\n/hD1W/vDaYptuKkXeEZHunFKWBjm1YCj59nQ1Mn7Lvl65+rRPTkj84BM+9jzwDHe\nUh1PXSOLJCHENyERC0V9qo9rLHsD3c9IxWGamvU5DJbnhVK4vO1AMLRBiQKBgQCb\nAo0Cuoz2ZHeuSHFFh9DSMs2PFVeY20bEtYh1vnirLGRpCDi2Wnk/PK+Z56CLJG+7\nyJCMK1la+mQ3zrYukXx7R0ntL0QbQz1dVd1BDm9z+Rjci7DgMQ+k9J9SML06tJtE\nhANqVUzhcrDpxp31l2jbJusEX6/f2hkEpefsn/fxFQKBgF+FkWcmx0qcBfTz11ai\nYKJAM1N4RFd32by/gFswe60YKv72GixqAW9CUGRGJgfRfSDrYU0ZEKTAVkdg6Kqu\n4TgheJqJDSucMX1cGY9vMuy8AlxGdxyRjm3o7DaKTfNdZZNo0mmWsM2WJHZifN/x\nOymnypH9WUbSCwssAG5GOH7X\n-----END PRIVATE KEY-----\n",
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
      const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address= ' + encodeURIComponent(address) + '&key=AIzaSyCZQ7QBcNicwveYO_z21CjV_zkhM8nNb7M'; 
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
            '&key=AIzaSyCZQ7QBcNicwveYO_z21CjV_zkhM8nNb7M' +
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
