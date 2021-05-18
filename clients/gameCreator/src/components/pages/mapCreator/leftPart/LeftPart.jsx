import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddMap from './AddMap';
import { fonBlue } from '../../../../tools/palette';
import AddTerrain from './AddTerrain';
import MapSelection from './MapSelection/MapSelection';

const Wrapper = styled.aside`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  padding: 15px;
  min-width: 390px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  background-color: ${fonBlue};
  transition: 0.1s;
  overflow-y: auto;
  >div {
    margin-bottom: 15px;
  }
  >div:last-child {
    margin-bottom: 0;
  }
`;

class LeftPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { menuState } = this.props;
    return (

      <Wrapper open={menuState}>

        <MapSelection />
        <AddMap />
        <AddTerrain />

      </Wrapper>
    );
  }
}

LeftPart.propTypes = {
  menuState: PropTypes.bool.isRequired,
};

export default connect(
  (mapStateToProps) => (
    { menuState: mapStateToProps.setting.leftMenuState }
  ),
)(LeftPart);
