import React from 'react';
import styled from 'styled-components';
import WithRequest from '../shells/ShellRequest';
import Form from "../controls/Form";
import Input from "../controls/Input";
import CheckBox from "../controls/CheckBox";
import File from "../controls/File";
import Button from "../controls/Button";
import Field from "../controls/Field";
import {API_UPDATE_TERRAINS, atrTerrainsPath} from "../../tools/routing";
import {connect} from "react-redux";
import {setError, setTerrain, updateTerrain} from "../../redux/actions";
import PropTypes from "prop-types";

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
  :first-child {
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
    const {sort, name, number, passability, fileName} = this.props.data;
    const {disabled} = this.state;
    return (
      <OuterWrapper>
        <InnerWrapper>
          <Field>
            <Title>{`Изменение ${sort}/${name}`}</Title>
            <Form
              onSubmit={this._onSubmit}
              errors={this.state.errors}
              reset={this.state.reset}
              onChange={this._onChange}
            >

              <Wrapper>
                <Input
                  title="Тип"
                  value={sort}
                  name="sort"
                  width="50%"
                  margin="0 10px 0 0"
                  rules={{ required: true, spaceForbidden: true }}
                />
                <Input
                  title="Название"
                  value={name}
                  name="name"
                  width="50%"
                  rules={{ required: true, spaceForbidden: true }}
                />
              </Wrapper>

              <Wrapper>
                <Input
                  title="Номер"
                  value={number}
                  name="number"
                  width="50%"
                  margin="0 10px 0 0"
                  rules={{ required: true, isNum: true, minValue: 10 }}
                />
                <CheckBox
                  title="Проходимость"
                  checked={passability}
                  text="Загрузить"
                  name="passability"
                  width="50%"
                  margin="auto 0 0 0"
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
                <Button
                  text="Отменить"
                  width="100px"
                  type={'button'}
                  onClick={onCancel}
                  margin="auto 0 0 0"
                />
                <Button
                  text="Применить"
                  width="100px"
                  margin="auto 0 0 0"
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
    const {number} = this.props.data;
    const {onCancel, changeTerrain} = this.props;
    this.setState({errors: [], reset: false});
    const formData = new FormData();
    Object.keys(data).map((key) => {
      if (data[key] !== this.props.data[key]) {
        formData.append(key, data[key]);
      }
    })
    formData.append('oldNumber', number);


    const answer = await this.PATCH_FORM(API_UPDATE_TERRAINS, formData);



    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      data.oldNumber = number;

      if (data.number) {
        data.number = parseInt(data.number);
      }

      if (data.sort) {
        data.sort = data.sort.toString().toUpperCase()[0] + data.sort.toString().toLowerCase().slice(1);
      }

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
    number: PropTypes.number.isRequired,
    sort: PropTypes.string.isRequired,
    passability: PropTypes.bool.isRequired,
  }).isRequired,
  addTerrain: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addTerrain: (data) => mapDispatchToProps(setTerrain(data)),
    changeTerrain: (data) => mapDispatchToProps(updateTerrain(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(UpdateTerrain);
