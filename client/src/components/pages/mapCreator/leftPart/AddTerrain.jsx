import React from 'react';
import styled from 'styled-components';
import Form from '../../../controls/Form';
import Input from '../../../controls/Input';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import { connect } from 'react-redux';
import {setError, setSize, setTerrain, setTerrains} from "../../../../redux/actions";
import PropTypes from "prop-types";
import File from "../../../controls/File";
import {API_CREATE_TERRAINS, API_GET_MAP_CELLS, API_GET_TERRAINS, getPAthToImage} from "../../../../tools/routing";
import WithRequest from "../../../shells/ShellRequest";
import CheckBox from "../../../controls/CheckBox";

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: ${({align}) => align || 'space-around'};
  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-top: 20px;
  }
`;

class AddTerrain extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      formData: '',
      modal: false,
      errors: [],
      reset: false
    };
  }

  render() {
    return (
      <Field>
        <Title>Новая местность</Title>
        <Form onSubmit={this._onSubmit} errors={this.state.errors} reset={this.state.reset}>

          <Wrapper>
            <Input
              title="Тип"
              name="sort"
              width="50%"
              margin="0 10px 0 0"
              rules={{ required: true, spaceForbidden: true }}
            />
            <Input
              title="Название"
              name="name"
              width="50%"
              rules={{ required: true, spaceForbidden: true }}
            />
          </Wrapper>

          <Wrapper>
            <Input
              title="Номер"
              name="number"
              width="30%"
              margin="0 60px 0 0"
              rules={{ required: true, isNum: true, minValue: 10 }}
            />
            <CheckBox
              title="Пр-ть"
              text="Загрузить"
              name="passability"
              width="100px"
            />
            <File
              title="Изображение"
              name="img"
              width="100px"
              rules={{ format: ['jpeg', 'jpg'] }}
            />
          </Wrapper>

          <Wrapper align={'center'}>
            <Button
              text="Отправить"
              width="100px"
            />
          </Wrapper>

        </Form>
      </Field>
    );
  }

  _onSubmit = async (data) => {
    this.setState({errors: [], reset: false});
    const formData = new FormData();
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    });
    const answer = await this.POST_FORM(API_CREATE_TERRAINS, formData);
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      const dataToAction = {};
      dataToAction.sort = data.sort.toString().trim().toUpperCase()[0] + data.sort.toString().trim().toLowerCase().slice(1);
      dataToAction.name = data.name.toString().trim();
      dataToAction.number = parseInt(data.number);
      dataToAction.path = getPAthToImage(dataToAction.sort, dataToAction.number, data.img.name.split('.')[1]);
      dataToAction.passability = data.passability;
      this.props.addTerrain(dataToAction);
      this.setState({reset: true});
    }
  }
}

AddTerrain.propTypes = {
  addTerrain: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addTerrain: (data) => mapDispatchToProps(setTerrain(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(AddTerrain);
