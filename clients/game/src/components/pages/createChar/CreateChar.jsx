import React from 'react';
import styled from 'styled-components';
import WithRequest from "../../shells/ShellRequest";
import i18n from "i18next";
import Button from "../../atomic/Button";
import {ROUT_CHOICE_CHAR} from "../../../tools/routing";
import {connect} from "react-redux";
import Interface from "./Interface";

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
`;

class ChoiceChar extends WithRequest {
  constructor(props) {
    super(props);

    this.state = {
      choiceChar: true
    }
  }

  render() {
    const {choiceChar} = this.state;
    const {dispatch} = this.props;
    return <OuterWrapper>
      <Title>{i18n.t('createChar')}</Title>
      <ContentWrapper>

          <Interface/>

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

}

export default connect()(ChoiceChar);
