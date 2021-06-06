import React from 'react';
import styled from 'styled-components';
import {atrCharPath} from "../../../../../../tools/utils";
import {connect} from "react-redux";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Qwerty = styled.div`
  position: absolute;
  right: 0;
  width: 15px;
  height: 15px;
  background-color: red;
  
  :hover {
    background-color: green;
  }
`

class HoverMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <Wrapper>
            <Qwerty/>
        </Wrapper>
    }
}

export default HoverMenu;
