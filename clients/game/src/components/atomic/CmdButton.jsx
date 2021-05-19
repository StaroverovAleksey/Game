import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonCommon = styled.button`
  margin: ${({ margin }) => margin};
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 0;
  border-bottom: 3px solid transparent;
  :hover, :focus {
    //color: rgba(57,168,57,0.7);
    font-weight: bold;
    border-bottom: 3px solid #ef9898;
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
