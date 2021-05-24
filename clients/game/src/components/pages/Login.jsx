import React from 'react';
import styled from 'styled-components';
import {API_AUTH_LOGIN, ROUT_MAIN, ROUT_REGISTRATION} from "../../tools/routing";
import WithRequest from "../shells/ShellRequest";
import Field from "../atomic/Field";
import Form from "../atomic/Form";
import Input from "../atomic/Input";
import Button from "../atomic/Button";
import {setError, setRout} from "../../redux/actions";
import {connect} from "react-redux";
import i18n from "i18next";

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
      errors: [],
    };
  }

  render() {
    const {setRout} = this.props;
    return (
      <OuterWrapper>
        <Field>
          <Title>{i18n.t('authorization')}</Title>
          <Form onSubmit={this._onSubmit} errors={this.state.errors}>

            <Input
              title={i18n.t('mail')}
              name="email"
              width="250px"
              margin="0 0 26px 0"
              type="email"
              rules={{ required: true, minLength: 3, maxLength: 64 }}
            />
            <Input
              title={i18n.t('password')}
              name="password"
              width="100%"
              margin="0 0 26px 0"
              type="password"
              rules={{ required: true, minLength: 6, maxLength: 14 }}
            />
            <InnerWrapper>
              <Button
                text={i18n.t('comeIn')}
                width="100px"
              />
              <a style={{ paddingTop: '10px' }} href={'#'} onClick={() => setRout(ROUT_REGISTRATION)}>{i18n.t('registration')}</a>
            </InnerWrapper>

          </Form>

        </Field>
      </OuterWrapper>
    );
  }

  _onSubmit = async (data) => {
    const {setRout} = this.props;

    const answer = await this.POST(API_AUTH_LOGIN, JSON.stringify(data));
    if(answer.errors) {
      this.setState({errors: answer.errors});
    } else {
      setRout(ROUT_MAIN);
    }
  }
}

export default connect(
    undefined,
    (mapDispatchToProps) => ({
      setError: (data) => mapDispatchToProps(setError(data)),
      setRout: (data) => mapDispatchToProps(setRout(data)),
    }),
)(Login);
