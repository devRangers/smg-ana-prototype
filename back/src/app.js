import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swaggerDoc.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { photoRouter } from "./routers/photoRouter.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/", (req, res) => {
  res.send("Hello World! 기본 서버 테스트용");
});

// router
app.use("/photos", photoRouter);
app.use(errorMiddleware);

export default app;
