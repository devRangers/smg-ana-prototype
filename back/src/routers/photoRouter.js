/**
 *  @swagger
 *  tags:
 *    name: Photo
 *    description: API to manage Photo
 */
import { Router } from "express";
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
 *         application/json:
 *           schema:
 *             properties:
 *               imageURL:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "촬영된 사진으로 종 머신러닝 결과 전달 완료"
 */
photoRouter.post("/", async function (req, res, next) {
  try {
    const { imageURL } = req.body;
    const response = await axios.post(
      // flask 요청 : 사진에 해당하는 종 전달 요청
      `${process.env.FLASK_BASE_URL}/photos`,
      imageURL
    );

    if (!response) {
      throw "데이터를 받아오지 못했습니다.";
    }
    const { data } = response;

    const animalData = await photoService.addAnimal({
      imageURL,
      species: data,
    }); // Saving DB
    res.status(200).send(animalData);
  } catch (error) {
    next(error);
  }
});

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

    const animalList = await photoService.getAnimals({ species }); // finding animals
    res.status(200).send(animalList);
  } catch (error) {
    next(error);
  }
});
