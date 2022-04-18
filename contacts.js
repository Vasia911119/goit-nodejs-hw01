const path = require("path");
const fs = require("fs").promises;

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
      JSON.parse(data).filter((contact) => contact.id === contactId))
    .then(console.table)
    .catch(console.warn);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  )
    .then(() => console.log("Removed!"))
    .catch(console.warn);
}

async function addContact(name, email, phone) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify([
      ...contacts,
      { id: `${await newId()}`, name, email, phone },
    ])
  )
    .then(() => console.log("Added!"))
    .catch(console.warn);
}

async function newId() {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  const idList = contacts.map((contact) => contact.id);
  return Math.max.apply(null, idList) + 1;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
