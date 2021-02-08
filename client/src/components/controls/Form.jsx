import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FormProvider} from '../../tools/context';

const FormCommon = styled.form`
  display: flex;
`;

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.observeList = [];
  }

  render() {
    const { children, className } = this.props;
    return <FormProvider value={{subscribe: this._subscribe, onChange: this._onChange}}>
      <FormCommon className={className}
      onSubmit={this._submit}>
        {children}
      </FormCommon>
    </FormProvider>;

  }

  _subscribe = (func) => {
    this.observeList.push(func);
  }

  _onChange = (name, value) => {
    this.setState({[name]: value});
  }

  _submit = (event) => {
    event.preventDefault();
    Promise.all(
      this.observeList.map((func) => func())
    )
      .then(() => this.props.onSubmit(this.state))
      .catch(() => null);
  }
}

Form.defaultProps = {
  className: '',
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default Form;
