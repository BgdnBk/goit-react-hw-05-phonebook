import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import s from "../ContactForm/ContactForm.module.css";

export default function СontactForm({ contactList, onDeleted }) {
  return (
    <TransitionGroup component="ul" classNames={s.table}>
      {contactList.map(({ id, name, number }) => {
        return (
          <CSSTransition key={id} timeout={250} classNames={s} unmountOnExit>
            <li>
              {name}: {number}
              <button
                className={s.btnList}
                type="button"
                onClick={() => onDeleted(id)}
              >
                Удалить
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

СontactForm.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
};
