import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {addMapCells, choiceTerrain, deleteMapSells, setError} from "../../../../redux/actions";
import {MAIN_TERRAIN} from "../../../../../../../src/utils/constants";
import ShellTileField from "../../../shells/ShellTileField";
import {getCursorImg, getTileCollage} from "../../../../tools/utils";

const OuterWrapper = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  position: absolute;
  cursor: ${getCursorImg};
`;

const Row = styled.div`
  display: flex;
`;

const Tile = styled.div`
  display: inline-block;
  min-width: 64px;
  height: 64px;
  background-image: ${({ fileName }) => fileName};
  :hover {
    opacity: 0.7;
    background-color: rgba(230, 230, 230, 0.2);
  }
`;

class TileField extends ShellTileField {
  constructor(props) {
    super(props);
    this.state = {
      preparedData: undefined,
      fieldX: 0,
      fieldY: 0,
      mouseX: null,
      mouseY: null,
      createMapData: [],
      mapDataType: MAIN_TERRAIN,
      mapDataTypeFix: MAIN_TERRAIN,
      serverRequest: false,
    };
    this.wrapRef = React.createRef();
    this.fieldRef = React.createRef();
  }

  async componentDidMount () {
    await this._preRender();
    this._sizing();
    window.addEventListener('resize', this._sizing);
    window.addEventListener('keydown', this._keydownHandler);
    window.addEventListener('keyup', this._keyupHandler);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.mapCells !== this.props.mapCells) {
      await this._preRender();
      this._sizing();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._sizing);
    window.removeEventListener('keydown', this._keydownHandler);
    window.removeEventListener('keyup', this._keyupHandler);
  }

  render() {
    const { choiceTerrain } = this.props;
    const { preparedData, fieldX, fieldY, mapDataType } = this.state;
    return preparedData ?
      <OuterWrapper ref={this.wrapRef}>
        <InnerWrapper
          choiceTerrain={choiceTerrain}
          mapDataType={mapDataType}
          onMouseDown={this._moveStart}
          onMouseUp={this._onMouseUp}
          onContextMenu={(event) => event.preventDefault()}
          ref={this.fieldRef}
          style={{top: `${fieldY}px`, left: `${fieldX}px`}}
        >

          {this.state.preparedData}

        </InnerWrapper>
      </OuterWrapper>
      : null;
  }

  _preRender = async () => {
    const { mapCells } = this.props;
    const { size } = this.props.selectedMap;
    this.setState({
      preparedData: <div>
        {new Array(parseInt(size.y)).fill('').map((value, y) => (
          <Row key={`tile_row_${y}`}>
            {new Array(parseInt(size.x)).fill('').map((value1, x) => {
              const name = `${x + 1}_${y + 1}`;
              return <Tile
                id={name}
                fileName={getTileCollage(mapCells[name])}
                key={`tile_${x}${y}`}
              />;
            })}
          </Row>
        ))}
      </div>
    })
  }

  _sizing = () => {
    if (!this.wrapRef.current) {
      return;
    }
    let { fieldX, fieldY } = this.state;
    const { x, y } = this.props.selectedMap.size;
    const { onMouseMove } = this.props;
    const xDifferent = parseInt(x) * 64 - this.wrapRef.current.offsetWidth;
    const yDifferent = parseInt(y) * 64 - this.wrapRef.current.offsetHeight;

    if (xDifferent > 0) {
      fieldX = fieldX < -(xDifferent) ? -(xDifferent) : fieldX;
    } else {
      fieldX = 0;
    }

    if (yDifferent > 0) {
      fieldY = fieldY < -(yDifferent) ? -(yDifferent) : fieldY;
    } else {
      fieldY = 0;
    }

    this.setState({
      wrapperWidth: this.wrapRef.current.offsetWidth,
      wrapperHeight: this.wrapRef.current.offsetHeight,
      fieldX,
      fieldY,
    }, () => onMouseMove(fieldX, fieldY));
  }

}

export default connect(
  (mapStateToProps) => ({
    choiceTerrain: mapStateToProps.setting.choiceTerrain,
    mapCells: mapStateToProps.mapCell,
    selectedMap: mapStateToProps.setting.selectedMap,
  }),
  (mapDispatchToProps) => ({
    addingMapCells: (cells) => mapDispatchToProps(addMapCells(cells)),
    addChoiceTerrain: (map) => mapDispatchToProps(choiceTerrain(map)),
    deleteMapSells: (cells) => mapDispatchToProps(deleteMapSells(cells)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(TileField);
