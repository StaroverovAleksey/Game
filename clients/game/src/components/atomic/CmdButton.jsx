import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonCommon = styled.button`
  margin: ${({margin}) => margin};
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 0;
  border-bottom: 3px solid transparent;

  :hover, :focus {
    color: #387ea1;
    border-bottom: 1px solid #387ea1;
  }
`;

class CmdButton extends React.Component {
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

CmdButton.defaultProps = {
  text: '',
  margin: '0 0 0 0',
  onClick: null,
  focus: false,
  disabled: false,
};

CmdButton.propTypes = {
  text: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CmdButton;
