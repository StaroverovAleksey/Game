import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";
import i18n from "i18next";
import {connect} from "react-redux";
import {atrChar, getAnimation} from "../../tools/utils";
import Input from "../atomic/Input";
import Form from "../atomic/Form";
import Button from "../atomic/Button";
import {ROUT_CHOICE_CHAR} from "../../tools/routing";

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  box-sizing: border-box;
`;

const PageTitle = styled.h2`
  text-align: center;
`;

const Title = styled.h2`
  margin: 20px 0 0 5px;
`;

const InnerWrapper = styled.div`
  display: flex;
`;

const ChoiceBlock = styled.div`
  width: 64px;
  height: 64px;
  background-color: #bebeff;
  cursor: pointer;
  border: ${({choice}) => choice ? '2px solid #58A822FF' : ''};
  box-sizing: border-box;
  background-image: ${({image}) => image};
  background-position-y: ${({animation}) => animation};
  //background-position-y: -128px;
  //animation: load .5s steps(6, end) infinite;

  @keyframes load {
    100.0% {
      background-position-x: -384px;
    }
  }
`;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  div {
    display: flex;
  }
`;

class ChoiceChar extends WithRequest {
  constructor(props) {
    super(props);
    this.variants = {
      sex: ['male', 'female'],
      bodyColor: ['light', 'dark', 'peach'],
      hairType: ['1', '2', '3', '4', '5'],
      hairColor: ['blonde', 'blue', 'brunette', 'green', 'pink', 'raven', 'red'],
    }

    this.state = {
      errors: [],
      animation: getAnimation(4, 'front'),
      sex: this.variants.sex[0],
      bodyColor: this.variants.bodyColor[0],
      hairType: this.variants.hairType[0],
      hairColor: this.variants.hairColor[0],
    }
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if (prevProps.error !== error && error.msg === 'nameIsTaken') {
      const errors = [{
        param: 'login',
        msg: i18n.t(error.msg)
      }]
      this.setState({errors});
    }
  }

  render() {
    const {sex, bodyColor, hairType, hairColor} = this.state;
    const {dispatch} = this.props;

    return <>
      <PageTitle>{i18n.t('createChar')}</PageTitle>
      <OuterWrapper>

      {Object.entries(this.variants).map(([key, values]) => {
        return <>
          <Title>{i18n.t(key)}</Title>
          <InnerWrapper id={key}>

            {values.map((value) => {
              return <ChoiceBlock
                  id={value}
                  choice={this.state[key] === value}
                  onClick={this.changeParam}
                  image={atrChar({
                    sex: key === 'sex' ? value : sex,
                    bodyColor: key === 'bodyColor' ? value : bodyColor,
                    hairType: key === 'hairType' ? value : hairType,
                    hairColor: key === 'hairColor' ? value : hairColor
                  })}
                  animation={'-128px'}
              />
            })}

          </InnerWrapper>
        </>
      })}

      <Display>
        <div>
          {new Array(4).fill('').map((value, index) => {
            return <ChoiceBlock
                id={value}
                onClick={this.changeParam}
                image={atrChar({sex, bodyColor, hairType, hairColor})}
                animation={`-${ 64 * index + 1}px`}
            />
          })}
        </div>

        <Form onSubmit={this._onSubmit} errors={this.state.errors}>
          <Input
              title={i18n.t('characterName')}
              name="login"
              width="160px"
              margin="30px auto 30px auto"
              type="login"
              rules={{ required: true, minLength: 3, maxLength: 16 }}
          />
          <div>
            <Button
                text={i18n.t('create')}
                width="100px"
            />
            <Button
                text={i18n.t('back')}
                width="100px"
                margin="0 0 0 50px"
                onClick={() => dispatch({ type: 'SETTINGS_CHANGE_ROUTER', payload: ROUT_CHOICE_CHAR })}
            />
          </div>

        </Form>

      </Display>

    </OuterWrapper>
    </>
  }

  changeParam = (event) => {
    const value = event.target.id;
    const name = event.target.parentNode.id;
    this.setState({[name]: value});
  }

  _onSubmit = (data) => {
    const {sex, bodyColor, hairType, hairColor} = this.state;
    const {socket} = this.props;
    socket.emit('mainChar/create', {login: data.login, sex, bodyColor, hairType, hairColor});
  }
}

export default connect(
    (mapStateToProps) => ({
      socket: mapStateToProps.settings.socket,
      error: mapStateToProps.settings.error,
    })
)(ChoiceChar);
