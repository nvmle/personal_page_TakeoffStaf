import httpService from "./httpService";

const contactEndPoint = "contacts/";

export const contactService = {
  get: async () => {
    const { data } = await httpService.get(contactEndPoint);

    return data;
  },
  getContactsByUserId: async (contactId) => {
    const { data } = await httpService.get(contactEndPoint + contactId);

    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(contactEndPoint, payload);

    console.log("create", data);
  },
  update: async (payload) => {
    console.log(payload);
    const { data } = await httpService.patch(
      contactEndPoint + payload.id,
      payload
    );

    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(contactEndPoint + id);

    console.log(data);
  },
};
