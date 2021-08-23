import React from 'react';
import styled from 'styled-components';
import MainMenu from "./MainMenu";
import Main from "./main/Main";
import {connect} from "react-redux";
import {
  ROUT_INVENTORY,
  ROUT_MAIN,
  ROUT_SETTINGS,
  ROUT_SKILLS
} from "../../../../tools/routing";
import Inventory from "./Inventory";
import Skills from "./Skills";
import Settings from "./Settings";
import CharStatus from "./CharStatus";
import CanvasGame from "./CanvasGame";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(232, 232, 232);
`;

class TopFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.topFrameRef = React.createRef();
  }

  render() {
    const {mainChar, chars} = this.props;
    const {target} = mainChar;

    return (
      <Wrapper>
        {/*{this._getRout()}*/}
        <CanvasGame/>
        <CharStatus data={mainChar}/>

        {target ?
            <CharStatus data={chars[target]} left={'400px'}/>
        : null}

        <MainMenu/>
      </Wrapper>
    );
  }

  _getRout = () => {
    const { routing, topFrameHeight } = this.props;
    switch (routing) {
      case ROUT_MAIN: return <Main topFrameHeight={topFrameHeight}/>;
      case ROUT_INVENTORY: return <Inventory/>;
      case ROUT_SKILLS: return <Skills/>;
      case ROUT_SETTINGS: return <Settings/>;
      default: return <Main/>;
    }
  }
}

export default connect(
    (mapStateToProps) => ({
      mainChar: mapStateToProps.mainChar,
      chars: mapStateToProps.chars,
      routing: mapStateToProps.settings.routing
    }),
    undefined,
)(TopFrame);
