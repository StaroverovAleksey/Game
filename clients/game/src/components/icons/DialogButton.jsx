import React from 'react';
import styled from 'styled-components';
import {atrUtilsPath} from "../../tools/utils";

const OuterContainer = styled.div`
  border-radius: 3px;
  width: 16px;
  height: 16px;
  background-color: white;
  cursor: pointer;
  margin: ${({margin}) => margin};
  background-image: ${() => atrUtilsPath('dialog.png')};
  background-size: 12px 12px;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;

  :hover {
    background-color: #b4b4b4;
  }
`;

class DialogButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClick, margin, value} = this.props;
    return (
      <OuterContainer
          onClick={onClick}
          margin={margin}
      >
          {value}
      </OuterContainer>
    );
  }
}

export default DialogButton;
