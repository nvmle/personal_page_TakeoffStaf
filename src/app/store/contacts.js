import { createSlice } from "@reduxjs/toolkit";
import { contactService } from "../services/contactService";

const initialState = { entities: null, isLoading: true, error: null };

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactsRequested(state) {
      state.isLoading = true;
    },
    contactsReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    contactsReceiveFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    contactCreated(state, action) {
      state.entities.push(action.payload);
    },
    contactRemoved(state, action) {
      state.entities = state.entities.filter(
        (contact) => contact.id !== action.payload
      );
    },
    contactSuccessUpdated(state, action) {
      state.entities[
        state.entities.findIndex((c) => c.id === action.payload.id)
      ] = action.payload;
    },
  },
});

const { actions, reducer: contactsReducer } = contactsSlice;
const {
  contactsRequested,
  contactsReceived,
  contactsReceiveFailed,
  contactCreated,
  contactRemoved,
  contactSuccessUpdated,
} = actions;

export const loadContactList = (userId) => async (dispatch) => {
  dispatch(contactsRequested());
  try {
    const contacts = await contactService.get();
    const contactsList = contacts.filter((contact) => {
      return contact.user_id === userId;
    });

    dispatch(contactsReceived(contactsList));
  } catch (error) {
    console.log("There is an error:", error);
    dispatch(contactsReceiveFailed(error));
  }
};

export const createContact = (data) => async (dispatch, getState) => {
  const currentUser = getState().users.auth.userId;
  const newContact = { ...data, user_id: currentUser };

  try {
    const content = await contactService.create(newContact);
    dispatch(contactCreated(content));
  } catch (error) {
    console.log("There is an error:", error);
  }
};

export const removeContact = (contactId) => async (dispatch) => {
  try {
    // Так как fake api не дает возможности совершать patch и delete запросы
    // работа будет происходить с локальным стейтом
    // Команда ниже вызывает запрос удаления из fake api
    // await contactService.delete(contactId);
    dispatch(contactRemoved(contactId));
  } catch (error) {
    console.log("There is an error:", error);
  }
};

export const updateContact = (data) => async (dispatch) => {
  try {
    // Так как fake api не дает возможности совершать patch и delete запросы
    // работа будет происходить с локальным стейтом
    // Команда ниже вызывает запрос обновления в fake api
    // const content = await contactService.update(data);
    dispatch(contactSuccessUpdated(data));
  } catch (error) {
    console.log("There is an error:", error);
  }
};

export const getContactList = () => (state) => state.contacts.entities;
export const getIsLoadingContacts = () => (state) => state.contacts.isLoading;

export default contactsReducer;
