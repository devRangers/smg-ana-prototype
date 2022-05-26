import { photoModel } from "../db/index.js";
import { gcsBucket } from "../config/gcs.js";
import { format } from "util";

export const photoService = {
  addFindAnimal: async ({ imageURL, species, type }) => {
    const newAnimal = {
      imageURL,
      species,
      type,
    };
    const animalData = await photoModel.saveAnimal({ newAnimal });
    return animalData;
  },
  getLostAnimals: async ({ species }) => {
    const animalList = await photoModel.findLostAnimals({ species });
    return animalList;
  },
  SetGcsBucket: async ({ file }) => {
    const filename = file.originalname.replace(" ", "-");
    const savefile = `${Date.now()}-${filename}`;
    const blob = gcsBucket.file(`AnimalImg/${savefile}`);

    console.log(savefile);

    const blobStream = blob.createWriteStream({
      resumable: false,
      public: true,
    });

    // 에러 핸들링
    let error = new Error("업로드 중 오류가 발생했습니다.");
    blobStream.on("error", (err) => {
      throw error;
    });

    const imageURL = format(
      `https://storage.googleapis.com/${gcsBucket.name}/${blob.name}`
    );
    // 종료 처리
    blobStream.on("finish", () => {});

    // 업로드 스트림 실행
    blobStream.end(file.buffer);
    return { imageURL, savefile };
  },

  // fake data 만들기 위한 임시 api
  addFakeAnimal: async ({
    imageURL,
    species,
    name,
    feature,
    type,
    location,
  }) => {
    const newAnimal = {
      imageURL,
      species,
      name,
      feature,
      type,
      location,
    };
    const animalData = await photoModel.saveAnimal({ newAnimal });
    return animalData;
  },
};
