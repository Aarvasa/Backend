

let x = require('express');
let app = x();
let bodyParser = require('body-parser');
let path = require('path');

let cors = require('cors');

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