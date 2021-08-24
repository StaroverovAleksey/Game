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
        this.state = {
            arts: {},
            ready: false
        }
    }

    componentDidMount() {
        const loader = new ImageLoader();
        const paths = this._getArtsPaths();
        loader.load(paths).then((arts) => {
            this.setState({arts, ready: true});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {arts, ready} = this.state;
        if (prevState.ready !== ready && ready) {
            const game = new Game();
            game.screen.arts = arts;
            game.run();
        }
    }

    render() {
        const {ready} = this.state;
        {return ready ? <Canvas/> : <Loading/>}
    }

    _getArtsPaths = () => {
        const arts = {
            terrains: ''
        }
    }
}

export default connect(
    (mapStateToProps) => ({
        settings: mapStateToProps.settings,
        mapCells: mapStateToProps.mapCells,
    }),
)(CanvasGame);
