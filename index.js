let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;

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
  

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
