import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FormProvider} from '../../tools/context';

const FormCommon = styled.form`
  display: flex;
  flex-direction: column;
`;

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.observeList = [];
    this.state = {
      errors: [],
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.errors !== this.props.errors) {
      this.setState({errors: this.props.errors});
    }
    if(prevState !== this.state && prevState.errors === this.state.errors) {
      this.setState({errors: []});
    }
    if(prevProps.reset !== this.props.reset && this.props.reset) {
      this._resetAll();
    }
  }

  render() {
    const { children, className } = this.props;
    return <FormProvider value={{subscribe: this._subscribe, onChange: this._onChange, errors: this.state.errors}}>
      <FormCommon className={className}
      onSubmit={this._submit}>
        {children}
      </FormCommon>
    </FormProvider>;

  }

  _subscribe = (object) => {
    this.observeList.push(object);
  }

  _onChange = (name, value) => {
    this.setState({[name]: value}, () => {
      const data = Object.assign({}, this.state);
      delete data.errors;
      this.props.onChange(data);
    });
  }

  _resetAll = () => {
    this.observeList.map(({reset}) => reset());
  }

  _submit = (event) => {
    event.preventDefault();
    Promise.all(
      this.observeList.map(({validation}) => validation())
    )
      .then(() => {
        const data = Object.assign({}, this.state);
        delete data.errors;
        this.props.onSubmit(data);
      })
      .catch(() => null);
  }
}

Form.defaultProps = {
  className: '',
  errors: [],
  onChange: () => undefined,
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.node.isRequired,
  ]),
  errors: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Form;
