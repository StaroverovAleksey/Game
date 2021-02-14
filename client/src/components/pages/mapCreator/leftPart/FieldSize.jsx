import React from 'react';
import styled from 'styled-components';
import Form from '../../../controls/Form';
import Input from '../../../controls/Input';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import { connect } from 'react-redux';
import {setSize} from "../../../../redux/actions";
import PropTypes from "prop-types";

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

class FieldSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      height: '',
    };
  }

  render() {
    return (
      <Field>
        <Title>Размеры поля</Title>
        <Form onSubmit={this._onSubmit}>
          <Input
            title="Ширина"
            name="width"
            width="100px"
            margin="0 10px 0 0"
            rules={{ isNum: true, minValue: 10 }}
          />
          <Input
            title="Высота"
            name="height"
            width="100px"
            margin="0 10px 0 0"
            rules={{ isNum: true, minValue: 10 }}
          />
          <Button
            text="Применить"
            width="100px"
          />
        </Form>
      </Field>
    );
  }

  _onSubmit = (data) => {
    const { setSize } = this.props;
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
