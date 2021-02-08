import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonCommon = styled.button`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  height: 28px;
  cursor: pointer;
  background-color: #dde5ff;
  border: none;
  border-radius: 5px;
  outline: none;
  :hover {
    box-shadow: 0 1px 2px 0 rgb(32 33 36 / 28%);
  }
  :active {
    box-shadow: inset 0 1px 2px 0 rgb(32 33 36 / 28%);
  }
`;

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, width, margin } = this.props;
    return (
      <ButtonCommon
        width={width}
        margin={margin}
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
};

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
};

export default Button;
