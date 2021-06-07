import React from 'react';
import styled from 'styled-components';
import InfoButton from "../../../../../icons/InfoButton";
import CrowdButton from "../../../../../icons/CrowdButton";
import InviteButton from "../../../../../icons/InviteButton";
import DialogButton from "../../../../../icons/DialogButton";
import AttackButton from "../../../../../icons/Attack";

const Wrapper = styled.div`
  position: absolute;
  right: 0;
`;

class HoverMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <Wrapper>
            <InfoButton/>
            {/*<CrowdButton value={99}/>*/}
            <DialogButton/>
            <InviteButton/>
            <AttackButton/>
        </Wrapper>
    }
}

export default HoverMenu;
