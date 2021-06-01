import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {getTileCollage} from "../../../../../tools/utils";

const String = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  background-image: ${({backGrColor}) => backGrColor};
`;

class BackGround extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTop: 0,
            left: 64,
            animation: ''
        }
    }

    render() {
        const {mapCells, mapSize} = this.props;
        console.log(mapCells);
        const {x: sizeX, y: sizeY} = mapSize;
        return <>
            {new Array(sizeY).fill('').map((v, x) => {
                return <String>
                    {new Array(sizeX).fill('').map((vv, y) => {
                        const name = (y + 1) + '_' + (x + 1);
                        return <Cell backGrColor={getTileCollage(mapCells[name])}>{}</Cell>
                    })}
                </String>
            })}
        </>
    }
}

export default connect(
    (mapStateToProps) => ({
            mapCells: mapStateToProps.mapCells,
            mapSize: mapStateToProps.settings.mapSize
        })
)(BackGround);
