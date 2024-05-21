import { createId } from "@paralleldrive/cuid2";
import { client } from "../db/client";
import { IReview } from "../types/entity";
import { aggregate } from "../libs/aggregate";

export const reviewService = {
  // Function to create a new review
  createReview: async (reviewBody: Omit<IReview, "id">) => {
    const { foodQuality, foodPrice, toilet, internet, electricity, comfortness, quiteness, review, userId, workplaceId } = reviewBody;
    const id = createId();

    try {
      await client.execute({
        sql: "INSERT INTO reviews (id, food_quality, food_price, toilet, internet, electricity, comfortness, quiteness, review, user_id, workplace_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [id, foodQuality, foodPrice, toilet, internet, electricity, comfortness, quiteness, review, userId, workplaceId, new Date()],
      });

      return { id };
    } catch (error) {
      console.log(error);
    }
  },

  getReviewRatings: async (workplaceId: string) => {
    try {
      const reviewRatings = await client.execute({
        sql: `SELECT 
                AVG(reviews.food_quality) AS foodQuality, 
                AVG(reviews.food_price) AS foodPrice, 
                AVG(reviews.toilet) AS toilet, 
                AVG(reviews.internet) AS internet, 
                AVG(reviews.electricity) AS electricity, 
                AVG(reviews.comfortness) AS comfortness, 
                AVG(reviews.quiteness) AS quiteness
              FROM 
                reviews
              WHERE 
                reviews.workplace_id = ?
              `,
        args: [workplaceId],
      });

      return aggregate(reviewRatings.toJSON())[0];
    } catch (error) {
      console.log(error);
    }
  },

  getReviews: async (workplaceId: string) => {
    try {
      const reviews = await client.execute({
        sql: `SELECT 
                reviews.id AS id, 
                reviews.review AS review, 
                reviews.created_at AS createdAt,
                users.name AS userName
              FROM 
                reviews 
               LEFT JOIN 
                users ON users.id = reviews.user_id
              WHERE 
                reviews.workplace_id = ?
             
              `,
        args: [workplaceId],
      });

      return aggregate(reviews.toJSON());
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
