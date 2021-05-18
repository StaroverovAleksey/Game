import React from 'react';
import styled from 'styled-components';
import Field from '../../../../controls/Field';
import { connect } from 'react-redux';
import {deleteAllMapSells, deleteMap, setError, setMap, setSelectedMap} from "../../../../../redux/actions";
import WithRequest from "../../../../shells/ShellRequest";
import {API_DELETE_MAP, API_DELETE_MAP_CELL} from "../../../../../tools/routing";
import MapSelectionItem from "./MapSelectionItem";
import Confirm from "../../../../modal/Confirm";
import ModalMenu from "../../../../modal/ModalMenu";
import UpdateMap from "../../../../modal/UpdateMap";
import {isEmpty} from "../../../../../../../../src/utils/utils";

const Title = styled.h3`
  margin: 0 0 10px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

class MapSelection extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openSelector: false,
      openGroup: -1,
      modalMenuCoord: [],
      confirmMethod: false,
      modalMenuMap: {},
      modalAct: '',
      updateMap: false,
    };
  }

  componentDidMount() {
    this._dataPreparation();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this._dataPreparation();
    }
  }

  render() {
    const {selectedMap} = this.props;
    const {
      data,
      openSelector,
      openGroup,
      modalMenuCoord,
      confirmMethod,
      modalMenuMap,
      modalAct,
      updateMap
    } = this.state;
    return (
      <Field>
        <Title>Выбор карты</Title>

        <MapSelectionItem
          name={isEmpty(selectedMap) ? `Создайте карту` : `${selectedMap.group} --- ${selectedMap.name}`}
          type={'lead'}
          open={openSelector}
          onChange={this._openSelector}
        />
        {openSelector ?

          <Wrapper>
            {data.map((group, group_index) => {
              return <React.Fragment key={`group_${group_index}`}>
                <MapSelectionItem
                  name={group[0].group}
                  id={group_index}
                  type={'group'}
                  open={openGroup === group_index}
                  onChange={this._openGroup}
                />
                {openGroup === group_index ?

                  group.map((map, map_index) =>
                    <MapSelectionItem
                      key={`map_${map_index}`}
                      name={map.name}
                      id={map._id}
                      type={'map'}
                      check={map._id === selectedMap._id}
                      onChange={this._selectMap}
                      onContextMenu={this._contextMenu}
                    />)

                  : null}
              </React.Fragment>
            })}
          </Wrapper>

        : null}

        {confirmMethod ?
          <Confirm
            description={`${modalAct} карту ${modalMenuMap.group} / ${modalMenuMap.name}?`}
            onSuccess={confirmMethod}
            onCancel={() => this.setState({confirmMethod: false})}
          />
          : null}

        {modalMenuCoord.length
          ? <ModalMenu
            xCoord={modalMenuCoord[1]}
            yCoord={modalMenuCoord[0]}
            closeCallback={this._closeModalMenu}
            data={[
              {title: 'Изменить', callback: this._updateMap},
              {title: 'Очистить', callback: this._clearMapConfirm},
              {title: 'Удалить', callback: this._deleteMapConfirm}
            ]}
          />
          : null}

        {updateMap ?
          <UpdateMap
            data={modalMenuMap}
            onCancel={() => this.setState({updateMap: false})}
          />
          : null}

      </Field>
    );
  }

  _updateMap = () => {
    this.setState({updateMap: true, modalMenuCoord: []});
  }

  _clearMapConfirm = async () => {
    this.setState({modalMenuCoord: [], confirmMethod: this._clearMap, modalAct: 'Очистить'});
  }

  _clearMap = async () => {
    const {modalMenuMap} = this.state;
    const {removeAllMapSells, selectedMap} = this.props;
    await this.DELETE(API_DELETE_MAP_CELL, JSON.stringify({_id: modalMenuMap._id}));
    if (modalMenuMap._id === selectedMap._id) {
      removeAllMapSells();
    }
    this._closeModalMenu();
  }

  _deleteMapConfirm = async () => {
    this.setState({modalMenuCoord: [], confirmMethod: this._deleteMap, modalAct: 'Удалить'});
  }

  _deleteMap = async () => {
    const {modalMenuMap} = this.state;
    const {removeMap} = this.props;
    await this.DELETE(API_DELETE_MAP, JSON.stringify({_id: modalMenuMap._id}));
    removeMap(modalMenuMap._id);
    this._closeModalMenu();
  }

  _contextMenu = (event) => {
    const {maps} = this.props;
    if (event.target.classList.contains('modalMenuWithin')) {
      event.preventDefault();
      const index = maps.findIndex((value) => value._id === event.target.id);
      this.setState({modalMenuCoord: [event.pageY, event.pageX], modalMenuMap: maps[index]});
    }
  }

  _closeModalMenu = () => {
    this.setState({modalMenuCoord: [], modalMenuMap: {}, confirmMethod: false});
  }

  _openGroup = (event) => {
    const {openGroup} = this.state;
    const id = parseInt(event.currentTarget.id);
    this.setState({openGroup: openGroup === id ? -1 : id});
  }

  _openSelector = () => {
    const {openSelector, openGroup} = this.state;
    this.setState({openSelector: !openSelector, openGroup: -1});
  }

  _selectMap = (event) => {
    const {addSelectedMap, maps} = this.props;
    const index = maps.findIndex((value) => value._id === event.currentTarget.id);
    addSelectedMap(maps[index]);
  }

  _dataPreparation = () => {
    const {maps} = this.props;
    const groups = new Set;
    const data = [];
    maps.map((value) => groups.add(value.group));
    for (let group of groups) {
      const sortArray = [];
      maps.map((value) => value.group === group && sortArray.push(value));
      data.push(sortArray);
    }
    this.setState({data});
  }
}


export default connect(
  (mapStateToProps) => ({
    selectedMap: mapStateToProps.setting.selectedMap,
    maps: mapStateToProps.map.maps,
  }),
  (mapDispatchToProps) => ({
    addMap: (data) => mapDispatchToProps(setMap(data)),
    addSelectedMap: (map) => mapDispatchToProps(setSelectedMap(map)),
    removeAllMapSells: () => mapDispatchToProps(deleteAllMapSells()),
    removeMap: (mapId) => mapDispatchToProps(deleteMap(mapId)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(MapSelection);
