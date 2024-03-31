import UserModel from "../models/user.models";

export const UpdateSocketId = async (id: string, socket: any) => {
  let updateuser = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: { Isonline: true, socketId: socket.id } },
    {
      fields: { _id: 1, Isonline: 1, name: 1, email: 1 },
      new: true,
    }
  );
  return updateuser;
};
