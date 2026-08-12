const onlineUsers = new Map();

export const initializeSocket = (io) =>{
    io.on("connection",(socket)=>{
        console.log("User connected:",socket.id);

        socket.on("user-online",(userId)=>{
            onlineUsers.set(userId.toString(),socket.id);

            console.log("Online users:",onlineUsers);
        });

        socket.on("disconnect",()=>{
            for(const[userId,socketId]of onlineUsers.entries()){
                if(socketId === socket.id){
                    onlineUsers.delete(userId);
                    console.log("User offline:",userId);
                    break;
                }
            }

            console.log("User disconnected:",socket.id)
        })
    })
};

export const getReceiverSocketId = (userId)=>{
    return onlineUsers.get(userId.toString());
};