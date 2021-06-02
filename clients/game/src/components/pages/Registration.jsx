import React from 'react';
import styled from 'styled-components';
import {API_AUTH_REGISTRATION, ROUT_LOGIN} from "../../tools/routing";
import {connect} from "react-redux";
import Field from "../atomic/Field";
import Form from "../atomic/Form";
import Input from "../atomic/Input";
import Button from "../atomic/Button";
import WithRequest from "../shells/ShellRequest";
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
    const {dispatch} = this.props;
    return (
      <OuterWrapper>
        <Field>
          <Title>{i18n.t('registration')}</Title>
          {!successReg ?
            <Form onSubmit={this._onSubmit} errors={this.state.errors}>

              <Input
                title={i18n.t('mail')}
                name="email"
                width="250px"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 3, maxLength: 64 }}
              />
              <Input
                title={i18n.t('characterName')}
                name="name"
                width="100%"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 3, maxLength: 46 }}
              />
              <Input
                title={i18n.t('password')}
                name="password"
                width="100%"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 6, maxLength: 64 }}
              />
              <Input
                title={i18n.t('passwordRepeat')}
                name="passwordRepeat"
                width="100%"
                margin="0 0 26px 0"
                rules={{ required: true, minLength: 6, maxLength: 64 }}
              />
              <InnerWrapper>
                <Button
                  text={i18n.t('send')}
                  width="100px"
                />
                <a style={{ paddingTop: '10px' }} href={'#'} onClick={() => dispatch({ type: 'SETTINGS_CHANGE_ROUTER', payload: ROUT_LOGIN })}>{i18n.t('entryForm')}</a>
              </InnerWrapper>

            </Form>

          : <React.Fragment>
                <p>{i18n.t('registrationSuccess')}</p>
                <a href={'#'} onClick={() => dispatch({ type: 'SETTINGS_CHANGE_ROUTER', payload: ROUT_LOGIN })}>{i18n.t('entryWithPassword')}</a>
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

export default connect()(Registration);
