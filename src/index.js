'use strict'

const mongoose = require('mongoose');
const app= require("./app");

mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost:27017/Wakami',{useNewUrlParser: true}).then(()=>{
console.log("La base de datos esta corriendo");

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log(`El servidor esta corriendo en el puerto: '${app.get('port')}'`);
}
);
}).catch(err => console.log(err));