import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FormContext} from '../../tools/context';
import validation from '../../tools/validation';

const Wrapper = styled.div`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  position: relative;
`;

const Title = styled.p`
  position: absolute;
  top: -16px;
  left: 6px;
  margin: 0;
  font-size: 14px;
  color: #999;
`;

const Error = styled.p`
  position: absolute;
  bottom: -15px;
  left: 6px;
  margin: 0;
  font-size: 14px;
  color: #ef9898;
  white-space: nowrap;
`;

const InputCommon = styled.input`
  width: 100%;
  height: 28px;
  cursor: text;
  box-sizing: border-box;
  padding-left: 15px;
  background-color: ${({error}) => error === '' ? 'rgb(230, 230, 230)' : '#ef9898'};
  border-radius: 15px;
  outline: blue;
  border: rgb(230, 230, 230) 1px solid;

  :focus {
    background-color: ${({error}) => error === '' ? 'white' : '#ef9898'};
    border: rgb(230, 230, 230) 1px solid;
    box-shadow: inset 0 1px 2px 0 rgb(32 33 36 / 28%);
  }
`;

class Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value,
      error: ''
    }
  }

  static contextType = FormContext;

  componentDidMount() {
    if (typeof this.context.subscribe === 'function') {
      this.context.subscribe(this);
    }
  }

  render() {
    const { value, error } = this.state;
    const { name, title, width, margin } = this.props;
    const index = this.context.errors.findIndex((value) => value.param === name);
    const errorMsg = index > -1 ? this.context.errors[index].msg : '';
    return (
      <Wrapper
        width={width}
        margin={margin}
      >
        <Title>{title}</Title>
        <InputCommon
          value={value}
          error={error || errorMsg}
          onChange={this._onChange}/>
        <Error>{error || errorMsg}</Error>
      </Wrapper>
    );
  }

  _onChange = (event) => {
    const { value } = event.target;
    const { name } = this.props;
    this.context.errors = [];
    this.setState({
      value: value,
      error: ''
    }, () => this.context.onChange(name, value));
  }

  validation = async () => {
    const {value} = this.state;
    const {rules} = this.props;
    let flag = true;
    for (let key in rules) {
      if (rules.hasOwnProperty(key) && validation.hasOwnProperty(key)) {
        flag = await validation[key].func(value, rules[key]);
      }
      if (!flag) {
        this.setState({error: validation[key].error(rules[key])});
        break;
      }
    }
    return new Promise((resolve, reject) => {
      flag ? resolve() : reject()
    });
  }

  reset = () => {
    this.setState({value: '', error: ''});
  }
}

Input.defaultProps = {
  value: '',
  title: '',
  width: '190px',
  margin: '0 0 0 0',
  rules: {}
};

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  rules: PropTypes.objectOf(PropTypes.any),
};

export default Input;
