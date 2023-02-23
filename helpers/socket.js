let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getSingleUser = (userId) => {
    receiverUser = users.find(user => user.userId === userId);
    return receiverUser
}

const socketActions = (socket, io) => {
    //When user conect
    console.log('A user connected');

    //Take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    })

    //Send and get message
    socket.on("sendMessage", ({ receiverId, ...data }) => {
        console.log(receiverId)
        console.log(data)
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