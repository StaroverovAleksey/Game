import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 34px;
  font-weight: bold;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: red;
`;

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {mapCells, mapSize} = this.props;
        const {x: sizeX, y: sizeY} = mapSize;
        return (
            <OuterWrapper>
                <div>

                </div>
                <InnerWrapper/>
            </OuterWrapper>
        );
    }
}

export default connect(
    (mapStateToProps) => ({
            mapCells: mapStateToProps.mapCells,
            mapSize: mapStateToProps.character.mapSize
        })
)(Main);
