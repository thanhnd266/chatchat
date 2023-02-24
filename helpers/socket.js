let users = [];

const addUser = (client, socketId) => {
    !users.some(user => user.userId === client._id) &&
        users.push({ ...client, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getSingleUser = (userId) => {
    receiverUser = users.find(user => user._id === userId);
    return receiverUser
}

const socketActions = (socket, io) => {
    //When user conect
    console.log('A user connected');

    //Take userId and socketId from user
    socket.on("addUser", user => {
        addUser(user, socket.id);
        io.emit("getUsers", users)
    })

    //Send and get message
    socket.on("sendMessage", ({ receiverId, ...data }) => {
        const user = getSingleUser(receiverId);
        io.to(user.socketId).emit("getMessage", data)
    })

    //when disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
}

module.exports = { socketActions }