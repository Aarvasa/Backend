

let x = require('express');
let app = x();
let bodyParser = require('body-parser');
let path = require('path');

let cors = require('cors');


const cloudinary = require('cloudinary').v2;


(async function() {

    console.log("hello");

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dqhddm7mi', 
        api_key: '222323681783653', 
        api_secret: 'JYjcMfIJhwySByknWD2z_6B7J8Q' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           '/Users/muditrajsade/Desktop/Backend/scott-webb-1ddol8rgUH8-unsplash.jpeg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

app.use(
    cors({
        origin: '*',
    })
);
app.use(x.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/base.html'));
})


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});