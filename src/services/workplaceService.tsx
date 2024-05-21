import { createId } from "@paralleldrive/cuid2";
import { IWorkplace, TUser } from "../types/entity";
import { client } from "../db/client";
import { aggregate } from "../libs/aggregate";
import slugify from "slugify";
import { generateSlug } from "../libs/generateSlug";
import { TemplateBase } from "../views/templates/templateBase";
import { Header } from "../views/templates/header";

export const workplaceService = {
  // Function to create a new workplace
  createWorkplace: async ({
    name,
    address,
    city,
    type,
    images,
    userId,
  }: Pick<IWorkplace, "name" | "address" | "city" | "type" | "images"> & { userId: string }) => {
    const id = createId();
    const slug = generateSlug(name);

    try {
      await client.execute({
        sql: "INSERT INTO workplaces (id, name, slug, address, city, type, images, created_at, verified, submitter_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [id, name, slug, address, city, type, images as string, new Date(), 0, userId],
      });

      return { id };
    } catch (error) {
      console.error(error);
      return { id: null };
    }
  },

  // Function to get all workplaces
  getAllWorkplaces: async (type?: string, city?: string, limit?: number) => {
    try {
      let sql = `
      SELECT
        workplaces.*,
        AVG(reviews.food_quality) AS foodQuality,
        AVG(reviews.food_price) AS foodPrice,
        AVG(reviews.toilet) AS toilet,
        AVG(reviews.internet) AS internet,
        AVG(reviews.electricity) AS electricity,
        AVG(reviews.comfortness) AS comfortness,
        AVG(reviews.quiteness) AS quiteness
      FROM 
        workplaces
      LEFT JOIN
        reviews ON reviews.workplace_id = workplaces.id
    `;

      const params: any[] = [];

      if (city) {
        sql += " WHERE workplaces.city = ?";
        params.push(city);
      }

      if (type) {
        sql += " WHERE workplaces.type = ?";
        params.push(type);
      }

      sql += " GROUP BY workplaces.id";

      if (limit) {
        sql += " LIMIT ?";
        params.push(limit);
      }

      const workplaces = await client.execute({
        sql,
        args: params,
      });

      return aggregate(workplaces.toJSON()) as IWorkplace[];
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  // Function to get a workplace
  getWorkplace: async (slug: string) => {
    try {
      const workplace = await client.execute({ sql: "SELECT * FROM workplaces WHERE slug = ?", args: [slug] });
      return aggregate(workplace.toJSON())[0] as IWorkplace;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getWorkplaceCount: async (type: string) => {
    try {
      const count = await client.execute({ sql: "SELECT COUNT(*) AS count FROM workplaces WHERE type = ?", args: [type] });
      return aggregate(count.toJSON())[0].count;
    } catch (error) {
      console.error(error);
      return 0;
    }
  },
};
