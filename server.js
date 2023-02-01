require('dotenv').config();
const port = process.env.PORT || 8800;
const bodyParser = require('koa-bodyparser');
const routerIndex = require("./routes");
const morgan = require('koa-morgan');

const Koa = require('koa');
const koaJson = require('koa-json');
const connectToDB = require('./config/db');

const app = new Koa();

//Middleware
app.use(koaJson());
app.use(bodyParser());
app.use(morgan('dev'));

//Routes
app.use(routerIndex);

//Connect to db
connectToDB();

app.listen(port, () => {
    console.log('Listen to port', port);
})

