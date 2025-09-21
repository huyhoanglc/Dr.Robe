import petEntity from "../entities/pet.entity.js";

export const PetRepository = {
  createMany: async (pets) => await petEntity.insertMany(pets),
};