import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TileField from './TileField';
import {Size} from "../../../../tools/types";
import TopScroll from "./TopScroll";
import SideScroll from "./SideScroll";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 0;
  box-sizing: border-box;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
`;

class MainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldX: 0,
      fieldY: 0,
    };
  }

  render() {
    const { fieldX, fieldY } = this.state;
    const { size } = this.props;
    return (
      <OuterWrapper>

        <TopScroll left={fieldX}/>

        <InnerWrapper>
          <SideScroll top={fieldY}/>
          <TileField size={size}
                     onMouseMove={this._onMouseMove}
          />
        </InnerWrapper>

      </OuterWrapper>
    );
  }

  _onMouseMove = (fieldX, fieldY) => {
    this.setState({fieldX, fieldY});
  }
}

MainPart.propTypes = {
  size: PropTypes.shape(Size).isRequired,
};

export default connect(
  (mapStateToProps) => ({
    size: mapStateToProps.setting.size,
  }),
)(MainPart);
