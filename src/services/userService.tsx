import { client } from "../db/client";
import { createId } from "@paralleldrive/cuid2";
import { aggregate } from "../libs/aggregate";
import { IUser } from "../types/entity";

export const userService = {
  // Function to create a new user
  createUser: async (name: string, email: string, password: string) => {
    const id = createId();
    const hashedPassword = await Bun.password.hash(password || createId(), { algorithm: "argon2d" });

    try {
      await client.execute({
        sql: `INSERT INTO users (id, name, email, password, created_at) VALUES (?, ?, ?, ?, ?)`,
        args: [id, name, email, hashedPassword, new Date()],
      });
      console.log(`User ${name} created with ID: ${id}`);

      return id;
    } catch (error) {
      console.log(error);
    }
  },

  findUser: async (email: string) => {
    const user = await client
      .execute({
        sql: `SELECT * FROM users WHERE email = ?`,
        args: [email],
      })
      .then((result) => aggregate(result.toJSON())[0] as IUser);

    return user;
  },
};
