import httpService from "./httpService";

const userEndPoint = "users/";

export const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint);

    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(userEndPoint, payload);

    console.log("create", data);
  },
};
