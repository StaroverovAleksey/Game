import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Size } from '../../../../tools/types';

const Wrapper = styled.div`
  position: relative;
  width: 30px;
  height: 100%;
  overflow: hidden;
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
`;

const Cell = styled.div`
  text-align: center;
  padding-top: 24px;
  width: 30px;
  height: 64px;
  box-sizing: border-box;
`;

class TopScroll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedMap, top } = this.props;
    const { y } = selectedMap.size;
    return (
      <Wrapper>
        <Scroll style={{ top: `${top}px` }}>
          {new Array(parseInt(y)).fill('').map((value, index) => <Cell key={`side_scroll_cell_${index}`}>{index + 1}</Cell>)}
        </Scroll>
      </Wrapper>
    );
  }
}

TopScroll.propTypes = {
  top: PropTypes.number.isRequired,
};

export default connect(
  (mapStateToProps) => ({
    selectedMap: mapStateToProps.setting.selectedMap,
  }),
)(TopScroll);
