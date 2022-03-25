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
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndPoint + payload.id,
      payload
    );

    console.log("update", data);
  },
  delete: async (id) => {
    const { data } = await httpService.delete(userEndPoint + id);

    console.log(data);
  },
};
