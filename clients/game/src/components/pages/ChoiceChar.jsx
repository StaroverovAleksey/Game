import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";
import i18n from "i18next";
import Button from "../atomic/Button";
import {ROUT_CREATE_CHAR, ROUT_REGISTRATION} from "../../tools/routing";
import {connect} from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
    return <Wrapper>
      <Title>{i18n.t('choiceChar')}</Title>
      <ButtonWrapper>
        <Button
            text={i18n.t('comeIn')}
            width="100px"
            disabled={choiceChar}
        />
        <Button
            text={i18n.t('create')}
            width="100px"
            margin="0 0 0 50px"
            onClick={() => dispatch({ type: 'SETTINGS_CHANGE_ROUTER', payload: ROUT_CREATE_CHAR })}
        />
      </ButtonWrapper>
    </Wrapper>

  }
}

export default connect(
    (mapStateToProps) => ({
      chars: mapStateToProps.choiceChar,
    })
)(ChoiceChar);
