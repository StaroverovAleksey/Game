import React from 'react';
import styled from 'styled-components';
import WithRequest from "../../shells/ShellRequest";
import i18n from "i18next";
import {connect} from "react-redux";
import Interface from "./Interface";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

class ChoiceChar extends WithRequest {
  constructor(props) {
    super(props);
  }

  render() {
    return <>
      <Title>{i18n.t('createChar')}</Title>
      <OuterWrapper>

        <ContentWrapper>

          <Interface onSubmit={this._onSubmit}/>

        </ContentWrapper>
      </OuterWrapper>
    </>


  }

  _onSubmit = (data) => {
    console.log(data);
  }

}

export default connect()(ChoiceChar);
