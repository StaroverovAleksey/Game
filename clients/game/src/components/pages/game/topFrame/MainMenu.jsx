import React from 'react';
import styled from 'styled-components';
import CmdButton from "../../../atomic/CmdButton";
import {ROUT_INVENTORY, ROUT_MAIN, ROUT_SETTINGS, ROUT_SKILLS} from "../../../../tools/routing";
import {connect} from "react-redux";
import {setRout} from "../../../../redux/actions";
import i18n from "i18next";

const Wrapper = styled.menu`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background-color: #c0c0c0;
  border-bottom-left-radius: 10px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);;
`;

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const {routing, socket} = this.props;
    return (
      <Wrapper>
          {routing !== ROUT_MAIN ?
              <CmdButton
                  margin={'0 0 0 10px'}
                  text={i18n.t('back')}
                  onClick={() => setRout(ROUT_MAIN)}
              />
          : null}
          <CmdButton
              margin={'0 0 0 10px'}
              text={i18n.t('inventory')}
              onClick={() => setRout(ROUT_INVENTORY)}
          />
          <CmdButton
              margin={'0 0 0 10px'}
              text={i18n.t('skills')}
              onClick={() => setRout(ROUT_SKILLS)}
          />
          <CmdButton
              margin={'0 0 0 10px'}
              text={i18n.t('settings')}
              onClick={() => setRout(ROUT_SETTINGS)}
          />
          <CmdButton
              margin={'0 10px 0 10px'}
              text={i18n.t('goOut')}
              onClick={() => socket.emit('auth/exit', '')}
          />
      </Wrapper>
    );
  }
}

export default connect(
    (mapStateToProps) => ({
        routing: mapStateToProps.settings.routing,
        socket: mapStateToProps.settings.socket,
    })
)(MainMenu);
