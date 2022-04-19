const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

function listContacts() {
  const contacts = fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(console.table)
    .catch(console.warn);
  return contacts;
}

function getContactById(contactId) {
  const contact = fs
    .readFile(contactsPath, "utf-8")
    .then((data) =>
      JSON.parse(data).filter((contact) => contact.id === contactId)
    )
    .then(console.table)
    .catch(console.warn);
  return contact;
}

async function removeContact(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  )
    .then(() => console.log("Removed!"))
    .catch(console.warn);
}

async function addContact(name, email, phone) {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, { id: nanoid(), name, email, phone }])
  )
    .then(() => console.log("Added!"))
    .catch(console.warn);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
