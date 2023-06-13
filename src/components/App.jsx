import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS__KEY = 'contacts-key';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedData = localStorage.getItem(CONTACTS__KEY);
    const parsedSavedData = JSON.parse(savedData);
    if (parsedSavedData) {
      this.setState({ contacts: parsedSavedData });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS__KEY, JSON.stringify(this.state.contacts));
    }
  }
  contactAddHandler = obj => {
    const namesList = this.state.contacts.map(({ name }) => name.toLowerCase());
    const normalizedName = obj.name.toLowerCase();

    if (namesList.includes(normalizedName)) {
      return alert(`${obj.name} is already in your contacts`);
    }
    this.setState(prevState => ({
      contacts: [obj, ...prevState.contacts],
    }));
  };
  filterChangeHandler = event => {
    const value = event.currentTarget.value;

    this.setState({ filter: value });
  };
  filterRenderHandler = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter.trim())
    );

    return filteredContacts;
  };
  contactDeleteHandler = id => {
    const { contacts } = this.state;

    this.setState({ contacts: contacts.filter(contact => contact.id !== id) });
  };
  render() {
    const { filter } = this.state;
    const stats = this.filterRenderHandler();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onContactAdd={this.contactAddHandler} />

        <h2>Contacts</h2>
        <Filter onFilterSearch={this.filterChangeHandler} value={filter} />
        <ContactList onDelete={this.contactDeleteHandler} contacts={stats} />
      </div>
    );
  }
}

// <div>
//   <h1>Phonebook</h1>
//   <ContactForm ... />

//   <h2>Contacts</h2>
//   <Filter ... />
//   <ContactList ... />
// </div>
