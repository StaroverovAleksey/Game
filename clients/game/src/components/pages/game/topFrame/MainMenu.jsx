import React from 'react';
import styled from 'styled-components';
import CmdButton from "../../../atomic/CmdButton";
import {ROUT_INVENTORY, ROUT_LOGIN, ROUT_MAIN, ROUT_SETTINGS, ROUT_SKILLS} from "../../../../tools/routing";
import {connect} from "react-redux";
import {setRout} from "../../../../redux/actions";

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
      const {setRout, routing} = this.props;
    return (
      <Wrapper>
          {routing !== ROUT_MAIN ?
              <CmdButton
                  margin={'0 0 0 10px'}
                  text={'Назад'}
                  onClick={() => setRout(ROUT_MAIN)}
              />
          : null}
          <CmdButton
              margin={'0 0 0 10px'}
              text={'Инвентарь'}
              onClick={() => setRout(ROUT_INVENTORY)}
          />
          <CmdButton
              margin={'0 0 0 10px'}
              text={'Умения'}
              onClick={() => setRout(ROUT_SKILLS)}
          />
          <CmdButton
              margin={'0 0 0 10px'}
              text={'Настройки'}
              onClick={() => setRout(ROUT_SETTINGS)}
          />
          <CmdButton
              margin={'0 10px 0 10px'}
              text={'Выйти'}
              onClick={() => setRout(ROUT_LOGIN)}
          />
      </Wrapper>
    );
  }
}

export default connect(
    (mapStateToProps) => ({
        routing: mapStateToProps.setting.routing
    }),
    (mapDispatchToProps) => ({
        setRout: (data) => mapDispatchToProps(setRout(data)),
    }),
)(MainMenu);
