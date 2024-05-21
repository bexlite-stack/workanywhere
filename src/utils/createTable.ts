import { client } from "../db/client";
import { usersSchema } from "../models/usersSchema";
import { reviewsSchema } from "../models/reviewsSchema";
import { workplacesSchema } from "../models/workplacesSchema";

export const createTable = async () => {
  await client.execute(usersSchema);
  await client.execute(reviewsSchema);
  await client.execute(workplacesSchema);
};
