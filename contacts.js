const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contact = JSON.parse(await fs.readFile(contactsPath, "utf-8")).filter(
      (contact) => contact.id === contactId
    );
    console.table(contact);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    // const contacts = await listContacts(); - При такому написанні буде лишня таблиця в консолі через цю строку - console.table(contacts), можна переписати index.js та винесши туди в case - console.table(await listContacts()) і це обійти, але мені так подобається більще, тому строка нижче;
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
    );
    console.log("Removed!");
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, { id: nanoid(), name, email, phone }])
    );
    console.log("Added!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
