import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {API_AUTH_REGISTRATION} from "../../tools/routing";
import {connect} from "react-redux";
import Field from "../atomic/Field";
import Form from "../atomic/Form";
import Input from "../atomic/Input";
import Button from "../atomic/Button";
import WithRequest from "../shells/ShellRequest";
import {setError} from "../../../../gameCreator/src/redux/actions";

const OuterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 100vh;
  margin: 0 auto;
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  text-align: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

class Registration extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      successReg: false,
    };
  }

  render() {
    const {successReg} = this.state;
    return (
      <OuterWrapper>
        <Field>
          <Title>Регистрация</Title>
          {!successReg ?
            <Form onSubmit={this._onSubmit} errors={this.state.errors}>

              <Input
                title="Почта"
                name="email"
                width="250px"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 3, maxLength: 64 }}
              />
              <Input
                title="Имя персонажа"
                name="name"
                width="100%"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 3, maxLength: 46 }}
              />
              <Input
                title="Пароль"
                name="password"
                width="100%"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 6, maxLength: 64 }}
              />
              <Input
                title="Повторите пароль"
                name="passwordRepeat"
                width="100%"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 6, maxLength: 64 }}
              />
              <InnerWrapper>
                <Button
                  text="Отправить"
                  width="100px"
                />
                <NavLink style={{ paddingTop: '10px' }} to="/">Форма входа</NavLink>
              </InnerWrapper>

            </Form>

          : <React.Fragment>
              <p>Регистрация прошла успешно!</p>
              <NavLink to="/">Войти с паролем</NavLink>
            </React.Fragment>}


        </Field>
      </OuterWrapper>
    );
  }

  _onSubmit = async (data) => {
    this.setState({errors: [], reset: false});

    const answer = await this.POST(API_AUTH_REGISTRATION, JSON.stringify(data));
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      this.setState({successReg: true});
    }
  }
}

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(Registration);
