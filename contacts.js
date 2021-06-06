const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');


const contactsPath = path.join(
  __dirname,
  './db/contacts.json'
);


async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(data);
    console.log(contactsList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(data);
    const foundContactById = contactsList.find(contact => String(contact.id) === contactId);
    if (!foundContactById) {
      console.log(`Contact with id #${contactId} does not exist!`);
    }
    console.log(foundContactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(data);
    const foundContactById = contactsList.find(contact => String(contact.id) === contactId);
    if (!foundContactById) {
      console.log(`Imposable to delete contact with id #${contactId}! It does not exist.`);
      return;
    }
    const filteredContactById = JSON.stringify(
      contactsList.filter(contact => String(contact.id) !== contactId), null, '\t'
    );
    await fs.writeFile(contactsPath, filteredContactById, 'utf8');
    console.log(`Contact with id #${contactId} was deleted.`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(data);
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone
    }
    const newContactsList = JSON.stringify([newContact, ...contactsList], null, '\t');
    await fs.writeFile(contactsPath, newContactsList, 'utf8');
    console.log(`Contact with id #${newContact.id} was added.`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}