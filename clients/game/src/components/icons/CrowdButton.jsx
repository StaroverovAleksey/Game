import React from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: white;
  width: 16px;
  height: 16px;
  background-color: #387ea1;
  cursor: pointer;
  margin: ${({margin}) => margin};
  box-sizing: border-box;

  :hover {
    background-color: #468eb3;
  }
`;

class CrowdButton extends React.Component {
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

export default CrowdButton;
