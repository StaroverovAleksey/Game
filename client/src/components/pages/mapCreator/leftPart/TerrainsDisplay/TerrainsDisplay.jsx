import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Field from "../../../../controls/Field";
import {pathToImage} from "../../../../../tools/routing";
import TerrainItem from "./TerrainItem";
import {choiceTerrain} from "../../../../../redux/actions";

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

class TerrainsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingData: [],
      activeTerrain: false,
    }
  }

  componentDidMount() {
    this.sortingData();
  }

  render() {
    const {sortingData, activeTerrain} = this.state;
    return <Field>
      {sortingData.map((sort, i) => {
        const remainder = sort.length % 5 || 5;
        return <React.Fragment key={i}>
          <Title>{`${sort[0].sort}:`}</Title>
          <InnerWrapper>
            {sort.map((terrain, index) => {
              return <TerrainItem
                terrain={terrain}
                path={pathToImage(terrain.path)}
                remainder={remainder}
                key={`terrain_item_${index}`}
                callBack={this.choiceTerrain}
                active={terrain === activeTerrain}/>
            })}
          </InnerWrapper>
        </React.Fragment>;
      })}
    </Field>;
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
}

TerrainsDisplay.propTypes = {
  terrain: PropTypes.arrayOf(PropTypes.object).isRequired,
  addChoice: PropTypes.func.isRequired,
};

export default connect(
  (mapStateToProps) => (
    { terrain: mapStateToProps.terrain.terrains }
  ),
  (mapDispatchToProps) => ({
    addChoice: (terrain) => mapDispatchToProps(choiceTerrain(terrain)),
  })
)(TerrainsDisplay);
