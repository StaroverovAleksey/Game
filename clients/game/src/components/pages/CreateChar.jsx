import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";
import i18n from "i18next";
import Button from "../atomic/Button";
import {ROUT_CHOICE_CHAR, ROUT_CREATE_CHAR, ROUT_REGISTRATION} from "../../tools/routing";
import {connect} from "react-redux";

const OuterWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  background-color: red;
`;

const Title = styled.h1`
  text-align: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
`;

const InterfaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: sienna;
  
  h2 {
    margin: 0;
  }
  
  div {
    display: flex;
    
    div {
      width: 64px;
      height: 64px;
      background-color: blue;
      cursor: pointer;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
`;

class ChoiceChar extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      choiceChar: true,
    }
  }

  render() {
    const {choiceChar} = this.state;
    const {dispatch} = this.props;
    return <OuterWrapper>
      <Title>{i18n.t('createChar')}</Title>
      <ContentWrapper>
        <InterfaceWrapper onClick={this.changeParam}>

          <h2>{i18n.t('sex')}</h2>
          <div id={'sex'}>
            <div id={'male'}/>
            <div id={'female'}/>
          </div>

          <h2>{i18n.t('bodyColor')}</h2>
          <div id={'bodyColor'}>
            <div id={'light'}/>
            <div id={'dark'}/>
            <div id={'peach'}/>
          </div>

          <h2>{i18n.t('hairType')}</h2>
          <div id={'hairType'}>
            <div id={'1'}/>
            <div id={'2'}/>
            <div id={'3'}/>
            <div id={'4'}/>
            <div id={'5'}/>
          </div>

          <h2>{i18n.t('hairColor')}</h2>
          <div id={'hairColor'}>
            <div id={'blonde'}/>
            <div id={'blue'}/>
            <div id={'brunette'}/>
            <div id={'green'}/>
            <div id={'pink'}/>
            <div id={'raven'}/>
            <div id={'red'}/>
          </div>

        </InterfaceWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Button
            text={i18n.t('create')}
            width="100px"
            disabled={choiceChar}
        />
        <Button
            text={i18n.t('back')}
            width="100px"
            margin="0 0 0 50px"
            onClick={() => dispatch({ type: 'SETTINGS_CHANGE_ROUTER', payload: ROUT_CHOICE_CHAR })}
        />
      </ButtonWrapper>
    </OuterWrapper>

  }

  changeParam = (event) => {
    console.log(event.target);
  }
}

export default connect()(ChoiceChar);
