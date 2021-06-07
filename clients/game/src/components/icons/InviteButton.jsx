import React from 'react';
import styled from 'styled-components';
import {atrUtilsPath} from "../../tools/utils";

const OuterContainer = styled.div`
  border-radius: 3px;
  width: 16px;
  height: 16px;
  background-color: #387ea1;
  cursor: pointer;
  margin: ${({margin}) => margin};
  background-image: ${() => atrUtilsPath('invite.png')};
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;

  :hover {
    background-color: #468eb3;
  }
`;

class InviteButton extends React.Component {
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

export default InviteButton;
