import React from 'react';
import styled from 'styled-components';
import {NavLink, Redirect} from 'react-router-dom';
import Field from '../controls/Field';
import Input from '../controls/Input';
import Form from '../controls/Form';
import Button from '../controls/Button';
import {API_AUTH_CHECK, API_AUTH_LOGIN, API_GET_TERRAIN, PATH_LOGIN, PATH_REGISTRATION} from "../../tools/routing";
import {connect} from "react-redux";
import {setError} from "../../redux/actions";
import WithRequest from "../shells/ShellRequest";
import Loading from "./Loading";

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

class Login extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuth: null,
    };
  }

  async componentDidMount() {
    const isAuth = await this.GET(API_AUTH_CHECK);
    this.setState({isAuth, loading: false});
  }

  render() {
    const {isAuth, loading} = this.state;
    if (loading) {
      return <Loading />
    }
    if(isAuth) {
      return <Redirect to="/"/>
    }
    return (
      <OuterWrapper>
        <Field>
          <Title>Авторизация</Title>
          <Form onSubmit={this._onSubmit} errors={this.state.errors}>

            <Input
              title="Почта"
              name="email"
              width="250px"
              margin="0 0 26px 0"
              type="email"
              rules={{ required: true, minLength: 3, maxLength: 64 }}
            />
            <Input
              title="Пароль"
              name="password"
              width="100%"
              margin="0 0 26px 0"
              type="password"
              rules={{ required: true, minLength: 6, maxLength: 14 }}
            />
            <InnerWrapper>
              <Button
                text="Войти"
                width="100px"
              />
              <NavLink style={{ paddingTop: '10px' }} to={PATH_REGISTRATION}>Регистрация</NavLink>
            </InnerWrapper>

          </Form>

        </Field>
      </OuterWrapper>
    );
  }

  _onSubmit = async (data) => {
    this.setState({errors: [], reset: false});

    const answer = await this.POST(API_AUTH_LOGIN, JSON.stringify(data));
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      this.setState({isAuth: true, loading: false});
    }
  }
}

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(Login);
