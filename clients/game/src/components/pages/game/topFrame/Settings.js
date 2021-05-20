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
  color: #902a2a;
`;

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrapper>{'Settings'}</Wrapper>
        );
    }
}

export default Settings;
