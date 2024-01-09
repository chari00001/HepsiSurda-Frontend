import api from "../api";

async function getAllContacts() {
  try {
    const response = await api.get("/contacts");
    return response;
  } catch (error) {
    throw new Error("Failed to get all contacts");
  }
}

async function getContactById(contactId) {
  try {
    const response = await api.get(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get contact by ID");
  }
}

async function getContactsByUserId(userId) {
  try {
    const response = await api.get(`/contacts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get contacts by user ID");
  }
}

async function createContact(contactData) {
  try {
    const response = await api.post("/contacts", contactData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create contact");
  }
}

async function updateContact(contactId, contactData) {
  try {
    const response = await api.patch(`/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update contact");
  }
}

async function deleteContact(contactId) {
  try {
    const response = await api.delete(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete contact");
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  getContactsByUserId,
  createContact,
  updateContact,
  deleteContact,
};
