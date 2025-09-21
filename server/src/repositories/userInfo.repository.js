import userInfoEntity from "../entities/userInfo.entity.js";


export const UserInfoRepository = {
  create: async (data) => await userInfoEntity.create(data),

  /* Query */
  findById: async (_id) => await userInfoEntity.findById({_id}),
  findByPhone : async (phone) => await userInfoEntity.findOne({phone}),
  findByName : async (name) => await userInfoEntity.find({name}),
};