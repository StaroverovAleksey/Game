import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {Game} from "../../../../canvas/Game";
import {ImageLoader} from "../../../../canvas/ImageLoader";
import Loading from "../../Loading";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

class CanvasGame extends React.Component {
    constructor(props) {
        super(props);
        const {artPaths} = props.settings;
        this.state = {
            data: {
                artPaths
            },
            game: {},
            load: true
        }
    }

    componentDidMount() {
        const {data} = this.state;
        this.game = new Game(data, this.loadCallback);
        this.game.initial().then(this.game.run);
        console.log(this.game);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.game.updateData(this.data);
        }
    }

    render() {
        const {load} = this.state;
        return <React.Fragment>
            <Canvas/>
            {load ? <Loading/> : null}
        </React.Fragment>
    }

    loadCallback = (value) => {
        this.setState({load: value});
    }
}

export default connect(
    (mapStateToProps) => ({
        settings: mapStateToProps.settings,
        mapCells: mapStateToProps.mapCells,
    }),
)(CanvasGame);
