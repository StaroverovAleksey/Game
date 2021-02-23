import React from 'react';
import styled from 'styled-components';
import Form from '../../../controls/Form';
import Input from '../../../controls/Input';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import { connect } from 'react-redux';
import {setSize} from "../../../../redux/actions";
import PropTypes from "prop-types";
import File from "../../../controls/File";

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

class AddTerrain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: '',
      modal: false,
    };
  }

  render() {
    const {formData} = this.state;
    const {modal} = this.state;
    return (
      <Field>
        <Title>Новая местность</Title>
        <Form onSubmit={this._onSubmit}>

          <Wrapper>
            <Input
              title="Тип"
              name="sort"
              width="50%"
              margin="0 10px 0 0"
            />
            <Input
              title="Название"
              name="name"
              width="50%"
            />
          </Wrapper>

          <Wrapper>
            <Input
              title="Номер"
              name="number"
              width="30%"
              margin="0 10px 0 0"
              rules={{ isNum: true, minValue: 10 }}
            />
            <Button
              text="Загрузить"
              width="100px"
            />
            <File
              title="Изображение"
              name="img"
              width="100px"
              rules={{ format: ['jpeg', 'jpg', 'png'] }}
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

  _onSubmit = (data) => {
    console.log(data);
    /*const { setSize } = this.props;
    this.setState({modal: false});
    setSize(data);*/
  }
}

AddTerrain.propTypes = {
  setSize: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    setSize: (data) => mapDispatchToProps(setSize(data)),
  }),
)(AddTerrain);
