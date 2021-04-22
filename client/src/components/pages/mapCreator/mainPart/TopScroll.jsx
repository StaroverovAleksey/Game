import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: relative;
  height: 30px;
  overflow: hidden;
  margin-left: 30px;
`;

const Scroll = styled.div`
  display: flex;
  position: absolute;
  top: 0;
`;

const Cell = styled.div`
  text-align: center;
  padding-top: 5px;
  width: 64px;
  height: 30px;
`;

class TopScroll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedMap, left } = this.props;
    const { x } = selectedMap.size;
    return (
      <Wrapper>
        <Scroll style={{ left: `${left}px` }}>
          {new Array(parseInt(x)).fill('').map((value, index) => <Cell key={`top_scroll_cell_${index}`}>{index + 1}</Cell>)}
        </Scroll>
      </Wrapper>
    );
  }
}

TopScroll.propTypes = {
  left: PropTypes.number.isRequired,
};

export default connect(
  (mapStateToProps) => ({
    selectedMap: mapStateToProps.setting.selectedMap,
  }),
)(TopScroll);
