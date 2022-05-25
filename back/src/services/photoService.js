import { photoModel } from "../db/index.js";

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
