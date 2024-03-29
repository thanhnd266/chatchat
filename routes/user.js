const KoaRouter = require('koa-router');

const { 
    getListUser, 
    getOneUser, 
    createUser, 
    updateUser 
} = require('../controller/user.controller');
const { authenticate } = require('../middleware/auth/authenticate');

const router = new KoaRouter();

//Get all users
router.get('/get-list', authenticate, getListUser);

//Create a new user
router.post('/create', createUser);

//Get on user
router.get('/:id', getOneUser);

//Update user
router.patch('/update/:id', updateUser);

module.exports = router.routes();