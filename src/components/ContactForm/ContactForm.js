import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  resetForm = () => {
    this.setState({ name: '', number: '' });
  };
  formSubmitHandler = event => {
    event.preventDefault();

    const obj = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(4),
    };
    this.props.onContactAdd(obj);

    this.resetForm();
  };

  inputChangeHandler = event => {
    const name = event.currentTarget.name;
    const text = event.currentTarget.value;
    this.setState({ [name]: text });
  };
  render() {
    return (
      <form onSubmit={this.formSubmitHandler}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.inputChangeHandler}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="number">
          Number
          <input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            onChange={this.inputChangeHandler}
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onContactAdd: PropTypes.func.isRequired,
};
