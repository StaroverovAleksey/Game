import React from 'react';
import styled from 'styled-components';
import Field from '../../../controls/Field';
import { connect } from 'react-redux';
import {setError, setMap, setSelectedMap} from "../../../../redux/actions";
import PropTypes from "prop-types";
import WithRequest from "../../../shells/ShellRequest";
import {API_CREATE_MAP, atrUtilsPath} from "../../../../tools/routing";
import {isEmpty} from "../../../../tools/tools";

const Title = styled.h3`
  margin: 0 0 10px 0;
  text-align: center;
`;

const SelectedWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  cursor: pointer;
  color: rgba(0, 0, 0);
  background-color: rgb(230, 230, 230);
  border-radius: 15px;
  margin-bottom: 1px;
`;

const StatusLabel = styled.div`
  width: 28px;
  height: 28px;
  background-color: #d2d6d9;
  border-radius: 15px;
  background-image: ${({ menuState }) => atrUtilsPath(menuState ? 'closeMenuButton.png' : 'openMenuButton.png')};
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 4px 4px;
`;

const NameContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  padding-top: 3px;
  box-sizing: border-box;
`;

class MapSelection extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      reset: false
    };
  }

  render() {
    const {selectedMap} = this.props;
    return (
      <Field>
        <Title>Выбор карты</Title>
        <SelectedWrapper>
          <StatusLabel/>
          {isEmpty(selectedMap) ?
            <NameContainer>
              {`Создайте карту`}
            </NameContainer>
          :<NameContainer>
              {`${selectedMap.group} / ${selectedMap.name}`}
            </NameContainer>
          }

        </SelectedWrapper>
        <SelectedWrapper>
          <StatusLabel/>
          {isEmpty(selectedMap) ?
            <NameContainer>
              {`Создайте карту`}
            </NameContainer>
            :<NameContainer>
              {`${selectedMap.group} / ${selectedMap.name}`}
            </NameContainer>
          }

        </SelectedWrapper>
      </Field>
    );
  }

  _onSubmit = async (data) => {
    const {addMap, selectedMap, addSelectedMap} = this.props;
    const formatData = {
      name: data.name,
      group: data.group,
      size: {
        x: data['size.x'],
        y: data['size.y'],
      }
    }

    const answer = await this.POST(API_CREATE_MAP, JSON.stringify(formatData));
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {

      addMap(answer);
      if (isEmpty(selectedMap)) {
        addSelectedMap(answer);
      }
      this.setState({reset: true});
    }
  }
}

MapSelection.propTypes = {
  selectedMap: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  addMap: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  (mapStateToProps) => ({
    selectedMap: mapStateToProps.setting.selectedMap,
  }),
  (mapDispatchToProps) => ({
    addMap: (data) => mapDispatchToProps(setMap(data)),
    addSelectedMap: (map) => mapDispatchToProps(setSelectedMap(map)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(MapSelection);
