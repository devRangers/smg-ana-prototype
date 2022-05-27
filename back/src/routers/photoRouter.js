/**
 *  @swagger
 *  tags:
 *    name: Photo
 *    description: API to manage Photo
 */
import { Router } from "express";
import { photoService } from "../services/photoService.js";
import { multer } from "../middlewares/multer.js";
import axios from "axios";

export const photoRouter = Router();

/**
 * @swagger
 * /photos:
 *   post:
 *     tags: [Photo]
 *     description: 촬영된 사진으로 종 머신러닝 결과 전달
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imageURL:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: "촬영된 사진으로 종 머신러닝 결과 전달 완료"
 */
photoRouter.post(
  "/",
  multer.single("imageURL"),
  async function (req, res, next) {
    try {
      const file = req.file; // image form data
      const { imageURL, savefile } = await photoService.SetGcsBucket({
        file, // gcs upload
      });
      console.log(`${process.env.FLASK_BASE_URL}/photos`);
      const response = await axios.post(
        // flask 요청 : 사진에 해당하는 동물 종 요청
        `${process.env.FLASK_BASE_URL}/photos`,
        savefile
      );

      if (!response) {
        throw "데이터를 받아오지 못했습니다.";
      }
      const type = "find";

      const animalData = await photoService.addFindAnimal({
        imageURL,
        species: response.breed,
        type,
      }); // Saving DB

      res.status(200).send(animalData);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /photos/{species}:
 *   get:
 *     tags: [Photo]
 *     description: 전달받은 종으로 리스트 전달
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: species
 *       in: path
 *       required: true
 *     responses:
 *       '200':
 *         description: "전달받은 종으로 리스트 전달 완료"
 */
photoRouter.get("/:species", async function (req, res, next) {
  try {
    const { species } = req.params;

    if (!species) {
      throw "데이터를 받아오지 못했습니다.";
    }

    const animalList = await photoService.getLostAnimals({ species }); // finding animals(fake datas)
    res.status(200).send(animalList);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /photos/fake:
 *   post:
 *     tags: [Photo]
 *     description: fake 데이터를 만들기 위해 만드는 임시 api
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               imageURL:
 *                 type: string
 *               species:
 *                 type: string
 *               name:
 *                 type: string
 *               feature:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "fake 데이터를 만들기 위해 만드는 임시 api 완료"
 */
photoRouter.post("/fake", async function (req, res, next) {
  try {
    const { imageURL, species, name, feature, location } = req.body;
    const type = "loss";

    const animalData = await photoService.addFakeAnimal({
      imageURL,
      species,
      name,
      feature,
      location,
      type,
    }); // Saving DB
    res.status(200).send(animalData);
  } catch (error) {
    next(error);
  }
});
