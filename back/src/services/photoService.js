import { photoModel } from "../db/index.js";

export const photoService = {
  addAnimal: async ({ imageURL, species }) => {
    const newAnimal = {
      imageURL,
      species,
    };
    const animalData = await photoModel.saveAnimal({ newAnimal });
    return animalData;
  },
};
