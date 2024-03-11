import { Usuario } from "../models/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const secretKey = crypto.randomBytes(64).toString("hex");

export const resolvers = {
  Query: {
    allUsers: async () => {
      const users = await Usuario.find({}, "name email");
      return users;
    },
    userByName: async (__: void, args: any) => {
      const user = await Usuario.findOne({ name: args.name });
      return user;
    },
  },
  Mutation: {
    createUser: async (__: void, args: any) => {
      const { user } = args;
      const { name, email, password } = user;
      if (!password) {
        throw new Error("Password is required");
      }
      const existingUser = await Usuario.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Usuario({ name, email, password: hashedPassword });
      await newUser.save();

      return newUser;
    },
    login: async (_: void, { email, password }: any) => {
      const user = await Usuario.findOne({ email });
      if (!user) {
        throw new Error("No user found with this email");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1m" });
      return { token, user };
    },
  },
};
