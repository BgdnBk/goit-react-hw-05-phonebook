import React, { Component } from "react";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import СontactForm from "./components/ContactForm/ContactForm";
import style from "./components/Title/Title.module.css";
import s from "./components/ContactForm/ContactForm.module.css";
import Title from "./components/Title/Title";
import { CSSTransition } from "react-transition-group";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

console.log(s);
export default class Phonebook extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: "",
    title: "Телефонная книга",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  veluesFilter = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  getFilter = () => {
    const { filter, contacts } = this.state;
    const filterValues = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValues)
    );
  };

  checkName = (newName) => {
    return this.state.contacts.some(
      ({ name }) => name === Object.values(newName).join("")
    );
  };

  deletedContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const filterContact = this.getFilter();

    return (
      <div className={s.container}>
        {/* <h1 className={s.form}>{title}</h1> */}
        <ToastContainer autoClose={3000} />
        <CSSTransition
          in={true}
          appear={true}
          classNames={style}
          timeout={500}
          unmountOnExit
        >
          <Title />
        </CSSTransition>
        <Form onSubmit={this.addContact} contactList={this.checkName} />
        <h2 className={s.contactList}>Контакты</h2>
        <Filter velue={this.state.filter} SearchContact={this.veluesFilter} />
        <СontactForm
          contactList={filterContact}
          onDeleted={this.deletedContact}
        />
      </div>
    );
  }
}
