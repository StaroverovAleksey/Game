import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Field from "../../../controls/Field";

const Error = styled.p`
  font-size: 36px;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  align-self: flex-start;
  text-align: left;
`;

class TerrainsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingData: []
    }
  }

  componentDidMount() {
    this.sortingData();
  }

  render() {
    const {sortingData} = this.state;
    return <Field>
      {sortingData.map((sort) => {
        return <>
          <Title>{`${sort[0].sort}:`}</Title>
          <div>
            {sort.map((terrain) => {
              return <img src={'../src/' + terrain.path}/>
            })}
          </div>
        </>;
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
}

TerrainsDisplay.propTypes = {
  terrain: PropTypes.any.isRequired,
};

export default connect(
  (mapStateToProps) => (
    { terrain: mapStateToProps.terrain.terrains }
  ),
  undefined,
)(TerrainsDisplay);
