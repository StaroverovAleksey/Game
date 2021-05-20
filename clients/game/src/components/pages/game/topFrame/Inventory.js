import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 34px;
  font-weight: bold;
  color: #90902a;
`;

class Inventory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrapper>{'Inventory'}</Wrapper>
        );
    }
}

export default Inventory;
