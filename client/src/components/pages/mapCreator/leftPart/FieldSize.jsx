import React from 'react';
import styled from 'styled-components';
import Form from '../../../controls/Form';
import Input from '../../../controls/Input';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import { connect } from 'react-redux';
import {setSize} from "../../../../redux/actions";
import PropTypes from "prop-types";
import Confirm from "../../../modal/Confirm";

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

class FieldSize extends React.Component {
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
        <Title>Размеры поля</Title>
        <Form onSubmit={(formData) => this.setState({modal: true, formData})}>
          <Wrapper>
            <Input
              title="Ширина"
              name="width"
              width="100px"
              margin="0 10px 0 0"
              rules={{ required: true, isNum: true, minValue: 10 }}
            />
            <Input
              title="Высота"
              name="height"
              width="100px"
              margin="0 10px 0 0"
              rules={{ required: true, isNum: true, minValue: 10 }}
            />
            <Button
              text="Применить"
              width="100px"
            />
          </Wrapper>
        </Form>

        {modal ?
          <Confirm
            description={'Уверен?'}
            onSuccess={() => this._onSubmit(formData)}
            onCancel={() => this.setState({modal: false})}
          />
          : null}

      </Field>
    );
  }

  _onSubmit = (data) => {
    const { setSize } = this.props;
    this.setState({modal: false});
    setSize(data);
  }
}

FieldSize.propTypes = {
  setSize: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    setSize: (data) => mapDispatchToProps(setSize(data)),
  }),
)(FieldSize);
