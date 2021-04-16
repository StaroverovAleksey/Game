import React from 'react';
import styled from 'styled-components';
import Field from '../../../controls/Field';
import { connect } from 'react-redux';
import {setError, setMap, setSelectedMap} from "../../../../redux/actions";
import PropTypes from "prop-types";
import WithRequest from "../../../shells/ShellRequest";
import {API_CREATE_MAP, atrUtilsPath} from "../../../../tools/routing";
import {isEmpty} from "../../../../tools/tools";
import MapSelectionItem from "./MapSelectionItem";

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
    const {data, openSelector, openGroup} = this.state;
    return (
      <Field>
        <Title>Выбор карты</Title>

        <MapSelectionItem
          name={isEmpty(selectedMap) ? `Создайте карту` : `${selectedMap.group} / ${selectedMap.name}`}
          width={100}
          type={'group'}
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
                  width={90}
                  type={'group'}
                  open={openGroup === group_index}
                  onChange={this._openGroup}
                />
                {openGroup === group_index ?

                  group.map((map, map_index) =>
                    <MapSelectionItem
                      key={`map_${map_index}`}
                      name={map.name}
                      id={`${group_index}_${map_index}`}
                      width={80}
                      type={'map'}
                      onChange={this._selectMap}
                    />)

                  : null}
              </React.Fragment>
            })}
          </Wrapper>

        : null}

      </Field>
    );
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
    const {addSelectedMap} = this.props;
    const {data} = this.state;
    const [group, map] = event.currentTarget.id.split('_').map((value) => parseInt(value));
    addSelectedMap(data[group][map]);
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
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(MapSelection);
