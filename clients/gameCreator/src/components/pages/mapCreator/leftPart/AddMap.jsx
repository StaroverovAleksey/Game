import React from 'react';
import styled from 'styled-components';
import Form from '../../../atomic/Form';
import Input from '../../../atomic/Input';
import Field from '../../../atomic/Field';
import Button from '../../../atomic/Button';
import { connect } from 'react-redux';
import {setError, setMap, setSelectedMap} from "../../../../redux/actions";
import PropTypes from "prop-types";
import WithRequest from "../../../shells/ShellRequest";
import {API_CREATE_MAP} from "../../../../tools/routing";
import {firstUpper, isEmpty} from "../../../../tools/utils";

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
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
    this.setState({errors: [], reset: false});
    const {addMap, selectedMap, addSelectedMap} = this.props;
    const formatData = {
      name: firstUpper(data.name),
      group: firstUpper(data.group),
      size: data.size
    }

    const answer = await this.POST(API_CREATE_MAP, JSON.stringify(formatData));
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      formatData._id = answer._id;
      addMap(formatData);
      if (isEmpty(selectedMap)) {
        addSelectedMap(formatData);
      }
      this.setState({reset: true});
    }
  }
}

AddMap.propTypes = {
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
)(AddMap);
