import { UpdateSocketId } from "../services/socketIo.services";

export const EstablishConnectionMiddle = (socket: any,io:any) => {
  socket.emit("handshake", true);
  socket.on("joinAll", async (obj: { userId: string }) => {
    const updatedUser=UpdateSocketId(obj.userId,socket)
    console.log("someone connet");
    io.emit("newUser", updatedUser);
  });
};
export const RemoveConnectionMiddle = (socket: any) => {
  socket.on("disconnect", async () => {
    console.log("some one disconnect");
    // let updateuser = await UserModel.findOneAndUpdate(
    //   { socketId: socket.id },
    //   { $set: { Isonline: false } },
    //   {
    //     fields: { _id: 1, Isonline: 1, name: 1, email: 1 },
    //     new: true,
    //   }
    // );
    // this.io.emit("newUser", updateuser);
  });
};
