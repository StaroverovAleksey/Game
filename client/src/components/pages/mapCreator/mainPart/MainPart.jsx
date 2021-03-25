import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TileField from './TileField';
import {Size} from "../../../../tools/types";

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const InnerWrapper = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

class MainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { size } = this.props;
    return (
      <OuterWrapper>
        <InnerWrapper>

          <TileField size={size} />

        </InnerWrapper>
      </OuterWrapper>
    );
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
