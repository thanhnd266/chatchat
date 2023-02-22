require('dotenv').config();
const cors = require('@koa/cors');
const port = process.env.PORT || 8800;
const bodyParser = require('koa-bodyparser');
const routerIndex = require("./routes");
const morgan = require('koa-morgan');
const socketIO = require('socket.io');

const Koa = require('koa');
const koaJson = require('koa-json');
const connectToDB = require('./config/db');
const { socketActions } = require('./helpers/socket');

const app = new Koa();

//Middleware
app.use(cors());
app.use(koaJson());
app.use(bodyParser());
app.use(morgan('dev'));

//Routes
app.use(routerIndex);

//Connect to db
connectToDB();

const server = app.listen(port, () => {
    console.log('Listen to port', port);
})

// socket
let io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
	allowedHeaders: ["my-custom-header"],
    	credentials: true
    }
});

io.on('connection', (socket) => socketActions(socket, io));
