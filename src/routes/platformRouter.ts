import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { platformController } from "../controllers/platformController";

export const platformRouter = new Elysia()
  // plugin
  .use(jwt({ name: "jwt", secret: "secret123" }))
  // derive
  .derive(async ({ jwt, cookie: { token } }) => {
    const jwt_token = token?.value;
    if (!jwt_token) return { user: null };
    const payload = await jwt.verify(jwt_token);
    return { user: payload };
  })
  // Interface
  .get("/", platformController.renderHomeUI)
  .get("/workplaces", platformController.fetchAllWorkplaces)
  .get("/workplaces/:slug", platformController.renderSingleWorkplaceUI)
  .get("/workplaces/:slug/images/:fileName", platformController.renderSlideImage)
  .get("/workplaces/:slug/reviews", platformController.fetchAllReviews)
  .get("/workplaces/:slug/reviews/submit", platformController.renderWorkplaceReviewSubmitFormUI)
  .get("/workplaces/:slug/ratings", platformController.fetchWorkplaceRatings)
  .get("/workplaces/submit", platformController.renderWorkplaceSubmitFormUI)

  // Controller
  .post("/workplaces/search", platformController.searchWorkplaces)
  .post("/workplaces/submit", platformController.createWorkplace)
  .post("/workplaces/:slug/reviews/submit", platformController.createReview);
