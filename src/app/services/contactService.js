import httpService from "./httpService";

const contactEndPoint = "contacts/";

export const contactService = {
  get: async () => {
    const { data } = await httpService.get(contactEndPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(contactEndPoint, payload);

    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      contactEndPoint + payload.id,
      payload
    );

    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(contactEndPoint + id);

    return data;
  },
};
