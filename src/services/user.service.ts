import User, { IUser } from "../models/user.model";
import { AppError } from "../utils/appError";

class UserService {
  constructor() {}

  async getUsers() {
    const users = await User.find({}, "-password -__v").sort({ createdAt: -1 });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    return user;
  }

  async getUserById(id: string) {
    const user = User.findById(id, "-password -__v");

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    return user;
  }

  async addUser(data: IUser) {
    return await User.create(data);
  }
}

export const userService = new UserService();
