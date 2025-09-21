import accountEntity from "../entities/account.entity.js";

export const AccountRepository = {
  findByEmail: async (email) => await accountEntity.findOne({ email }),

  create: async (data) => {
    return await accountEntity.create(data);  
  },

  findById: async (id) => await accountEntity.findById(id),
};
