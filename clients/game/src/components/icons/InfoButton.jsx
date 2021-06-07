import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
  font-size: 12px;
  font-weight: bold;
  border-radius: 3px;
  width: 16px;
  height: 16px;
  color: white;
  text-align: center;
  padding-bottom: 1px;
  background-color: #387ea1;
  cursor: pointer;
  margin: ${({margin}) => margin};
  box-sizing: border-box;

  :hover {
    background-color: #468eb3;
  }
`;

class InfoButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClick, margin} = this.props;
    return (
      <Info
          onClick={onClick}
          margin={margin}
      >{'i'}</Info>
    );
  }
}

export default InfoButton;
