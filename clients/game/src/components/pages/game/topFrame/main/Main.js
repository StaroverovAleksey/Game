import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import BackGround from "./BackGround";
import MainCharCell from "./MainCharCell";
import CharCell from "./CharCell";
import {atrUtilsPath} from "../../../../../../../gameCreator/src/tools/utils";

const OuterWrapper = styled.div`
  display: inline-flex;
  margin: auto;
  width: 100%;
  height: 100%;
  font-size: 34px;
  font-weight: bold;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: ${({marginTop}) => `${marginTop}px`};
  background-image: ${() => `${atrUtilsPath('black.png')}`};
`;

const InnerWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTop: 0,
            mouseOverCell: '',
        }
        this.ref = React.createRef();
    }

    componentDidMount() {
        this._verticalAlignment();
        window.addEventListener("resize", this._onResizeHandler);
        this.ref.current.addEventListener("mouseover", this._onMouseOverHandler);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {topFrameHeight, mapSize} = this.props;
        if (prevProps.topFrameHeight !== topFrameHeight || prevProps.mapSize !== mapSize) {
            this._verticalAlignment();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResizeHandler);
    }

    render() {
        const {marginTop, mouseOverCell} = this.state;
        const {chars} = this.props;
        return (
            <OuterWrapper marginTop={marginTop}>
                <InnerWrapper ref={this.ref}>
                    <BackGround/>
                    <MainCharCell/>
                    {Object.keys(chars).map((id, index) => {
                        return <CharCell
                            id={id}
                            key={`char_cell${index}`}
                            mouseOver={mouseOverCell}
                        />;
                    })}
                </InnerWrapper>
            </OuterWrapper>
        );
    }

    _verticalAlignment = () => {
        const {topFrameHeight, mapSize} = this.props;
        const topFrameSize = window.document.documentElement.offsetHeight / 100 * topFrameHeight;
        const fieldSize = mapSize.y * 64;

        this.setState({marginTop: fieldSize < topFrameSize ? ((topFrameSize - fieldSize) / 2) : 0});
    }

    _onResizeHandler = () => {
        this._verticalAlignment();
    }

    _onMouseOverHandler = (event) => {
        console.log(event.target);
        this.setState({mouseOverCell: event.target.id});
    }
}

export default connect(
    (mapStateToProps) => ({
            mapSize: mapStateToProps.settings.mapSize,
            chars: mapStateToProps.chars,
        })
)(Main);
