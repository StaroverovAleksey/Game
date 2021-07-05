import React from 'react';
import styled from 'styled-components';
import WithRequest from "../../shells/ShellRequest";
import i18n from "i18next";
import {connect} from "react-redux";

const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: sienna;
`;

const Title = styled.h2`
  margin: 0;
`;

const InnerWrapper = styled.div`
  display: flex;
`;

const ChoiceBlock = styled.div`
  width: 64px;
  height: 64px;
  background-color: blue;
  cursor: pointer;
  border: ${({choice}) => choice ? '1px solid white' : ''};
  box-sizing: border-box;
`;



class Interface extends WithRequest {
  constructor(props) {
    super(props);
    this.variants = {
      sex: ['male', 'female'],
      bodyColor: ['light', 'dark', 'peach'],
      hairType: ['1', '2', '3', '4', '5'],
      hairColor: ['blonde', 'blue', 'brunette', 'green', 'pink', 'raven', 'red'],
    }

    this.state = {
      choiceChar: true,
      sex: this.variants.sex[0],
      bodyColor: this.variants.bodyColor[0],
      hairType: this.variants.hairType[0],
      hairColor: this.variants.hairColor[0],
    }
  }

  render() {
      return <OuterWrapper>

        {Object.entries(this.variants).map(([key, values]) => {
          return <>
            <Title>{i18n.t(key)}</Title>
            <InnerWrapper id={key}>

              {values.map((value) => {
                return <ChoiceBlock
                    id={value}
                    choice={this.state[key] === value}
                    onClick={this.changeParam}
                />
              })}

            </InnerWrapper>
          </>
        })}

      </OuterWrapper>

  }

  changeParam = (event) => {
    const value = event.target.id;
    const name = event.target.parentNode.id;
    this.setState({[name]: value});
  }
}

export default connect()(Interface);
