import React from 'react';
import styled from 'styled-components';
import Form from '../../../controls/Form';
import Input from '../../../controls/Input';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import { connect } from 'react-redux';
import {setError, setMap} from "../../../../redux/actions";
import PropTypes from "prop-types";
import WithRequest from "../../../shells/ShellRequest";
import {API_CREATE_MAP} from "../../../../tools/routing";

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  :first-child {
    margin-top: 0;
  }
`;

class AddMap extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      reset: false
    };
  }

  render() {
    return (
      <Field>
        <Title>Новая карта</Title>
        <Form onSubmit={this._onSubmit} errors={this.state.errors} reset={this.state.reset}>
          <Wrapper>
            <Input
              title="Имя"
              name="name"
              width="100%"
              rules={{ required: true, minLength: 3, maxLength: 32 }}
            />
          </Wrapper>
          <Wrapper>
            <Input
              title="Ширина"
              name="size.x"
              width="100px"
              margin="0 10px 0 0"
              rules={{ required: true, isNum: true, minValue: 10, maxValue: 100 }}
            />
            <Input
              title="Высота"
              name="size.y"
              width="100px"
              margin="0 10px 0 0"
              rules={{ required: true, isNum: true, minValue: 10, maxValue: 100 }}
            />
            <Button
              text="Применить"
              width="100px"
            />
          </Wrapper>
        </Form>

      </Field>
    );
  }

  _onSubmit = async (data) => {
    const {addMap} = this.props;
    const formatData = {
      name: data.name,
      size: {
        x: data['size.x'],
        y: data['size.y'],
      }
    }

    const answer = await this.POST(API_CREATE_MAP, JSON.stringify(formatData));
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      addMap({ _id: answer._id, name: answer.name });
      this.setState({reset: true});
    }
  }
}

AddMap.propTypes = {
  addMap: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addMap: (data) => mapDispatchToProps(setMap(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(AddMap);
