import React from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  color: white;
  width: 24px;
  height: 24px;
  background-color: #387ea1;
  cursor: pointer;
  margin: ${({margin}) => margin};
  box-sizing: border-box;
  box-shadow: -4px 3px 4px 0 rgba(50, 50, 50, 1);

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
