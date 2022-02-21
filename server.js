const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;
const uri = process.env.URI;

const controller = require('./api.controller');

app.disable('x-powered-by');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post(uri, controller.apiCreate);
app.get(uri, controller.apiGetAll);
app.get(uri+'/:id', controller.apiGetById);
app.delete(uri+'/:id', controller.apiDeleteById);

app.listen(port, () => {
    console.log('Serveur en écoute sur le port :', port);
});