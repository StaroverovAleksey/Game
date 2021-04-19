import React from 'react';
import styled from 'styled-components';
import WithRequest from '../shells/ShellRequest';
import Form from "../controls/Form";
import Input from "../controls/Input";
import CheckBox from "../controls/CheckBox";
import File from "../controls/File";
import Button from "../controls/Button";
import Field from "../controls/Field";
import {API_UPDATE_TERRAIN, atrTerrainsPath} from "../../tools/routing";
import {connect} from "react-redux";
import {setError, setTerrain, updateTerrain} from "../../redux/actions";
import PropTypes from "prop-types";
import {firstUpper} from "../../../../src/utils/utils";

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  z-index: 98;
`;

const InnerWrapper = styled.div`
  min-width: 300px;
  display: inline-block;
  margin: 200px auto;
  z-index: 99;
`;

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

class UpdateTerrain extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      formData: '',
      modal: false,
      errors: [],
      reset: false,
      disabled: true,
      update: false,
    };
  }

  render() {
    const {onCancel} = this.props;
    const {group, name, passability, fileName, _id} = this.props.data;
    const {disabled} = this.state;
    return (
      <OuterWrapper>
        <InnerWrapper>
          <Field>
            <Title>{`Изменение ${group}/${name}`}</Title>
            <Form
              onSubmit={this._onSubmit}
              errors={this.state.errors}
              reset={this.state.reset}
              onChange={this._onChange}
            >

              <Wrapper>
                <Input
                  title="Название"
                  value={name}
                  name="name"
                  width="60%"
                  margin="0 10px 0 0"
                  rules={{ required: true, minLength: 3, maxLength: 14 }}
                />
                <Input
                  title="Группа"
                  value={group}
                  name="group"
                  width="40%"
                  rules={{ required: true, minLength: 3, maxLength: 14 }}
                />
              </Wrapper>

              <Wrapper>
                <File
                  title="Изображение"
                  path={atrTerrainsPath(fileName)}
                  name="img"
                  width="100px"
                  rules={{ format: ['jpeg', 'jpg'] }}
                />
                <CheckBox
                  title="Проходимость"
                  checked={passability}
                  text="Загрузить"
                  name="passability"
                  width="50%"
                />

              </Wrapper>

              <Wrapper>
                <Button
                  text="Отменить"
                  width="100px"
                  type={'button'}
                  onClick={onCancel}
                  margin="0 20px 0 auto"
                />
                <Button
                  text="Применить"
                  width="100px"
                  disabled={disabled}
                />
              </Wrapper>

            </Form>
          </Field>
        </InnerWrapper>
      </OuterWrapper>
    );
  }

  _onChange = () => {
    const {update} = this.state;
    if (update) {
      this.setState({disabled: false});
    }
    this.setState({update: true});
  }

  _onSubmit = async (data) => {
    const {_id, name, group} = this.props.data;
    const {onCancel, changeTerrain} = this.props;
    this.setState({errors: [], reset: false});

    if (data.group) {
      data.group = firstUpper(data.group);
    } else {
      data.group = firstUpper(group);
    }
    if (data.name) {
      data.name = firstUpper(data.name);
    } else {
      data.name = firstUpper(name);
    }

    const formData = new FormData();
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    })
    formData.append('_id', _id);

    const answer = await this.PATCH_FORM(API_UPDATE_TERRAIN, formData);

    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      data._id = _id;

      if (answer.fileName) {
        delete data.img;
        data.fileName = answer.fileName;
      }
      onCancel();
      changeTerrain(data);
    }
  }
}

UpdateTerrain.propTypes = {
  data: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    passability: PropTypes.bool.isRequired,
  }).isRequired,
  addTerrain: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  changeTerrain: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addTerrain: (data) => mapDispatchToProps(setTerrain(data)),
    changeTerrain: (data) => mapDispatchToProps(updateTerrain(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(UpdateTerrain);
