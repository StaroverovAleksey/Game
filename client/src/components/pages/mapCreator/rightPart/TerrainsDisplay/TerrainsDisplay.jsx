import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Field from "../../../../controls/Field";
import {API_DELETE_TERRAINS} from "../../../../../tools/routing";
import TerrainItem from "./TerrainItem";
import {choiceTerrain, deleteTerrain, setError} from "../../../../../redux/actions";
import WithRequest from "../../../../shells/ShellRequest";
import Confirm from "../../../../modal/Confirm";
import UpdateTerrain from "../../../../modal/UpdateTerrain";
import ModalMenu from "../../../../modal/ModalMenu";

const Title = styled.h3`
  align-self: flex-start;
  text-align: left;
  margin: 0 0 5px 0;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 320px;
  margin-bottom: 20px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
  :last-child {
    margin: 0;
  }
`;

class TerrainsDisplay extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      sortingData: [],
      activeTerrain: false,
      modalMenuCoord: [],
      modalConfirm: false,
      modalMenuNumber: null,
      updateTerrain: false,
    }
  }

  componentDidMount() {
    this.sortingData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.sortingData();
    }
  }

  render() {
    const {
      sortingData,
      activeTerrain,
      modalConfirm,
      modalMenuCoord,
      updateTerrain,
      modalMenuNumber
    } = this.state;
    return <Field>
      <div onContextMenu={this._contextMenu}>
        {sortingData.map((sort, i) => {
          const remainder = sort.length % 5 || 5;
          return <React.Fragment key={i}>
            <Title>{`${sort[0].sort}:`}</Title>
            <InnerWrapper>
              {sort.map((terrain, index) => {
                return <TerrainItem
                  terrain={terrain}
                  remainder={remainder}
                  key={`terrain_item_${index}`}
                  callBack={this.choiceTerrain}
                  active={terrain === activeTerrain}/>
              })}
            </InnerWrapper>
          </React.Fragment>;
        })}
      </div>

      {modalConfirm ?
        <Confirm
          description={'Уверен?'}
          onSuccess={this._deleteTerrain}
          onCancel={() => this.setState({modalConfirm: false})}
        />
        : null}

      {modalMenuCoord.length
        ? <ModalMenu
          xCoord={modalMenuCoord[0]}
          yCoord={modalMenuCoord[1]}
          closeCallback={this._closeModalMenu}
          data={[
            {title: 'Изменить', callback: this._updateTerrain},
            {title: 'Удалить', callback: this._deleteTerrainConfirm}
            ]}
        />
        : null}

      {updateTerrain ?
        <UpdateTerrain
          data={this._getData(modalMenuNumber)}
          onCancel={() => this.setState({updateTerrain: false})}
        />
      : null}

    </Field>;
  }

  _getData = (number) => {
    const {sortingData} = this.state;
    for (let i = 0; i < sortingData.length; i++) {
      const index = sortingData[i].findIndex((value) => value.number === number);
      if (index > -1) {
        return sortingData[i][index];
      }
    }
  }

  sortingData = () => {
    const {terrain} = this.props;
    const sortTerrains = new Set;
    const sortingData = [];
    terrain.map((value) => sortTerrains.add(value.sort));
    for (let sort of sortTerrains) {
      const sortArray = [];
      terrain.map((value) => value.sort === sort && sortArray.push(value));
      sortingData.push(sortArray);
    }
    this.setState({sortingData});
  }

  choiceTerrain = (object) => {
    const {activeTerrain} = this.state;
    const {addChoice} = this.props;
    const newChoice = activeTerrain !== object ? object : false;
    this.setState({activeTerrain: newChoice });
    addChoice(newChoice);
  }

  _contextMenu = (event) => {
    if (event.target.classList.contains('modalMenuWithin')) {
      event.preventDefault();
      this.setState({modalMenuCoord: [event.pageY, event.pageX], modalMenuNumber: parseInt(event.target.id)});
    }
  }

  _closeModalMenu = () => {
    this.setState({modalMenuCoord: [], modalMenuNumber: null, modalConfirm: false});
  }

  _deleteTerrainConfirm = async () => {
    this.setState({modalConfirm: true, modalMenuCoord: []});
  }

  _deleteTerrain = async () => {
    const {modalMenuNumber} = this.state;
    const {removeTerrain} = this.props;
    await this.DELETE(API_DELETE_TERRAINS, JSON.stringify({number: modalMenuNumber}));
    this._closeModalMenu();
    removeTerrain(modalMenuNumber);
  }

  _updateTerrain = () => {
    this.setState({updateTerrain: true, modalMenuCoord: []});
  }
}

TerrainsDisplay.propTypes = {
  terrain: PropTypes.arrayOf(PropTypes.object).isRequired,
  addChoice: PropTypes.func.isRequired,
  removeTerrain: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  (mapStateToProps) => (
    { terrain: mapStateToProps.terrain.terrains }
  ),
  (mapDispatchToProps) => ({
    addChoice: (terrain) => mapDispatchToProps(choiceTerrain(terrain)),
    removeTerrain: (number) => mapDispatchToProps(deleteTerrain(number)),
    addError: (data) => mapDispatchToProps(setError(data)),
  })
)(TerrainsDisplay);