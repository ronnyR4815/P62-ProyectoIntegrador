const mongoose=require('mongoose');
const URI='mongodb://127.0.0.1/floristeria';

mongoose.connect(URI)
.then(db=> console.log('Conexion con la base de datos exitosa...'))
.catch(err => console.error(err));

module.exports=mongoose;
