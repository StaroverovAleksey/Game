import React from 'react';
import styled from 'styled-components';
import Form from '../../../atomic/Form';
import Input from '../../../atomic/Input';
import Field from '../../../atomic/Field';
import Button from '../../../atomic/Button';
import { connect } from 'react-redux';
import {setError, setStructure, setTerrain} from "../../../../redux/actions";
import PropTypes from "prop-types";
import File from "../../../atomic/File";
import {API_CREATE_STRUCTURE, API_CREATE_TERRAIN} from "../../../../tools/routing";
import WithRequest from "../../../shells/ShellRequest";
import CheckBox from "../../../atomic/CheckBox";
import {firstUpper} from "../../../../../../../src/utils/utils";

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: ${({align}) => align || 'space-between'};
  :first-child, :last-child {
    margin-top: 0;
  }
`;

class AddStructure extends WithRequest {
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
        <Title>Новый предмет</Title>
        <Form onSubmit={this._onSubmit} errors={this.state.errors} reset={this.state.reset}>

          <Wrapper>
            <Input
              title="Название"
              name="name"
              width="60%"
              margin="0 10px 0 0"
              rules={{ required: true, minLength: 3, maxLength: 14 }}
            />
            <Input
              title="Группа"
              name="group"
              width="40%"
              rules={{ required: true, minLength: 3, maxLength: 14 }}
            />
          </Wrapper>

          <Wrapper>
            <File
              title="Изображение"
              name="img"
              width="100px"
              rules={{ format: ['jpeg', 'jpg', 'png'] }}
            />
            <CheckBox
              title="Проходимость"
              text="Загрузить"
              name="passability"
              width="50%"
              margin="0 0 0 auto"
            />
          </Wrapper>

          <Wrapper>
            <Button
              text="Отправить"
              width="100px"
              margin="auto 0 0 auto"
            />
          </Wrapper>

        </Form>
      </Field>
    );
  }

  _onSubmit = async (data) => {
    this.setState({errors: [], reset: false});
    const formData = new FormData();
    console.log(data);
    console.log(Object.keys(data));
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const answer = await this.POST_FORM(API_CREATE_STRUCTURE, formData);
    console.log(answer);
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      const dataToAction = {};
      dataToAction.group = firstUpper(data.group);
      dataToAction.name = firstUpper(data.name);
      dataToAction.fileName = answer.fileName;
      dataToAction.passability = data.passability;
      dataToAction._id = answer._id;
      this.props.addStructure(dataToAction);
      this.setState({reset: true});
    }
  }
}

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addStructure: (data) => mapDispatchToProps(setStructure(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(AddStructure);
