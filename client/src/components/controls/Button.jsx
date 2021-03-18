import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonCommon = styled.button`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  height: 28px;
  cursor: pointer;
  background-color: ${({ disabled }) => (disabled ? 'rgb(230, 230, 230)' : '#dde5ff')};
  border: none;
  border-radius: 5px;
  outline: none;
  :hover, :focus {
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 1px 2px 0 rgb(32 33 36 / 28%)')};;
  }
  :active {
    box-shadow: inset 0 1px 2px 0 rgb(32 33 36 / 28%);
  }
`;

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    if (prevProps.focus !== focus) {
      if (focus) {
        this.ref.current.focus();
      }
    }
  }

  render() {
    const {
      text, width, margin, onClick, disabled,
    } = this.props;
    return (
      <ButtonCommon
        width={width}
        margin={margin}
        onClick={onClick}
        disabled={disabled}
        ref={this.ref}
      >
        {text}
      </ButtonCommon>
    );
  }
}

Button.defaultProps = {
  text: '',
  width: '190px',
  margin: '0 0 0 0',
  onClick: null,
  focus: false,
  disabled: false,
};

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
