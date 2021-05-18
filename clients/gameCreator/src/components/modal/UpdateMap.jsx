import React from 'react';
import styled from 'styled-components';
import WithRequest from '../shells/ShellRequest';
import Form from "../atomic/Form";
import Input from "../atomic/Input";
import Button from "../atomic/Button";
import Field from "../atomic/Field";
import {API_UPDATE_MAP} from "../../tools/routing";
import {connect} from "react-redux";
import {setError, setSelectedMap, updateMap} from "../../redux/actions";
import {firstUpper} from "../../../../../src/utils/utils";

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
  :first-child {
    margin-top: 0;
  }
`;

class UpdateMap extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      reset: false,
      disabled: true,
    };
  }

  render() {
    const {onCancel} = this.props;
    const {group, name, size} = this.props.data;
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
                  name="name"
                  value={name}
                  width="60%"
                  margin="0 10px 0 0"
                  rules={{ required: true, minLength: 3, maxLength: 14 }}
                />
                <Input
                  title="Группа"
                  name="group"
                  value={group}
                  width="40%"
                  rules={{ required: true, minLength: 3, maxLength: 14 }}
                />
              </Wrapper>
              <Wrapper>
                <Input
                  title="Ширина"
                  name="size.x"
                  value={size.x}
                  width="100px"
                  margin="0 10px 0 0"
                  rules={{ required: true, isNum: true, minValue: 10, maxValue: 100 }}
                />
                <Input
                  title="Высота"
                  name="size.y"
                  value={size.y}
                  width="100px"
                  margin="0 10px 0 0"
                  rules={{ required: true, isNum: true, minValue: 10, maxValue: 100 }}
                />
                <Button
                  text="Отменить"
                  width="100px"
                  type={'button'}
                  onClick={onCancel}
                  margin="0 10px 0 0"
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
    this.setState({disabled: false});
  }

  _onSubmit = async (data) => {
    const {group, name, _id, size} = this.props.data;
    const {onCancel, changeMap, setSelectedMap, selectedMap} = this.props;
    this.setState({errors: [], reset: false});
    data._id = _id;
    if (data.name && !data.group) {
      data.group = firstUpper(group);
    }
    if (data.group && !data.name) {
      data.name = firstUpper(name);
    }

    const answer = await this.PATCH(API_UPDATE_MAP, JSON.stringify(data));

    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {

      if (selectedMap._id === _id) {
        Object.keys(this.props.data).forEach((key) => {
          if (!(key in data)) {
            data[key] = this.props.data[key];
          }
        })
        if (!data.size.x) {
          data.size.x = size.x;
        }
        if (!data.size.y) {
          data.size.y = size.y;
        }
        setSelectedMap(data);
      }

      onCancel();
      changeMap(data);

    }
  }
}

export default connect(
  (mapStateToProps) => ({
    selectedMap: mapStateToProps.setting.selectedMap,
  }),
  (mapDispatchToProps) => ({
    changeMap: (data) => mapDispatchToProps(updateMap(data)),
    setSelectedMap: (data) => mapDispatchToProps(setSelectedMap(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(UpdateMap);
