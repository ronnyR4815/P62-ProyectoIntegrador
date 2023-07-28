const express = require('express');
const app = express();
const morgan = require('morgan');
const cors= require('cors');

require('./database');

app.set('nombreApp', 'BACKEND');
app.set('puerto', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/server.routes'));

app.listen(app.get('puerto'), () => {
    console.log('Nombre de la app', app.get('nombreApp'));
    console.log('Puerto del servidor', app.get('puerto'));
})