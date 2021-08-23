import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

class CanvasGame extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return <Canvas/>
    }
}

export default connect(
    (mapStateToProps) => ({
        settings: mapStateToProps.settings,
        mapCells: mapStateToProps.mapCells,
    }),
)(CanvasGame);
