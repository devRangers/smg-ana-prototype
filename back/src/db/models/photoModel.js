import { Photo } from "../schemas/photo.js";

export const photoModel = {
  saveAnimal: async ({ newAnimal }) => {
    const animalData = await Photo.create(newAnimal);
    return animalData;
  },
  findLostAnimals: async ({ species }) => {
    const animalList = await Photo.find({ species, type: "loss" });
    return animalList;
  },
};
