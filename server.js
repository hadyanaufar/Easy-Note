const express = require('express');
const bodyParser = require('body-parser');

//Membuat app "Express"
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

//parse requests of content-type - application/json
app.use(bodyParser.json())

//Mengonfigurasi database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Menghubungkan pada database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=> {
    console.log("Berhasil menghubungkan ke database");
}).catch(err => {
    console.log('Tidak dapat menghubungkan ke database. Keluar dari aplikasi...', err);
    process.exit();
});

//define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Selamat Datang di aplikasi EasyNotes."});
});

// Require Notes routes
require('./app/routes/note.routes')(app);

//Menunggu permintaan
app.listen(3000, () => {
    console.log("Server mendengarkan pada port 3000")
})