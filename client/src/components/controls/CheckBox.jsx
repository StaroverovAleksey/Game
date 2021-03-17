import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FormContext} from '../../tools/context';
import validation from '../../tools/validation';

const Wrapper = styled.div`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  position: relative;
  display: flex;
  justify-content: left;
  flex-direction: column;
`;

const Title = styled.p`
  position: absolute;
  top: -16px;
  left: 1px;
  margin: 0;
  font-size: 14px;
  color: #999;
`;

const InputCommon = styled.input`
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 15px;
  border-radius: 15px;
  outline: blue;
  border: rgb(230, 230, 230) 1px solid;
`;

class CheckBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked
    }
  }

  static contextType = FormContext;

  componentDidMount() {
    const { checked } = this.state;
    const { name } = this.props;
    if (typeof this.context.subscribe === 'function') {
      this.context.subscribe(this);
    }
    this.context.onChange(name, checked);
  }

  render() {
    const { checked } = this.state;
    const { title, width, margin } = this.props;
    return (
      <Wrapper
        width={width}
        margin={margin}
      >
        <Title>{title}</Title>
        <InputCommon
          checked={checked}
          type={'checkbox'}
          onChange={this._onChange}/>

      </Wrapper>
    );
  }

  validation = () => {

  }

  _onChange = (event) => {
    const { checked } = event.target;
    const { name } = this.props;
    this.setState({
      checked
    }, () => this.context.onChange(name, checked));
  }

  reset = () => {
    this.setState({checked: false});
  }
}

CheckBox.defaultProps = {
  checked: false,
  title: '',
  width: '190px',
  margin: '0 0 0 0',
  rules: {}
};

CheckBox.propTypes = {
  checked: PropTypes.bool,
  title: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  rules: PropTypes.objectOf(PropTypes.any),
};

export default CheckBox;
