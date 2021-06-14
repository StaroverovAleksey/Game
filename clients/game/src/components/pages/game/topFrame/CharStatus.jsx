import React from 'react';
import styled from 'styled-components';
import InfoButton from "../../../icons/InfoButton";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: ${({left}) => left};
  margin: 0;
  background-color: #c0c0c0;
  color: #387ea1;
  font-weight: bold;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: ${({left}) => left ? '10px' : 0};
  padding: 0 5px 5px 5px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
`;

const InnerWrapper = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const NickName = styled.div`
  padding-left: 30px;
`;

const Lvl = styled.div`
  font-weight: bold;
  padding-left: 10px;
`;

const HealthWrapper = styled.div`
  width: 300px;
  height: 10px;
  border: 1px black solid;
  background-color: #36af3a;
  margin-bottom: 1px;
  border-radius: 3px;
`;

const ManaWrapper = styled.div`
  width: 300px;
  height: 10px;
  border: 1px black solid;
  background-color: #376da7;
  border-radius: 3px;
`;

class CharStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const {left} = this.props;
      const {name} = this.props.data;
    return (
      <OuterWrapper left={left}>
          <InnerWrapper>
              <NickName>{name}</NickName>
              <Lvl>{'[ 7 ]'}</Lvl>
              <InfoButton margin={'2px 0 0 10px'}/>
          </InnerWrapper>
          <HealthWrapper/>
          <ManaWrapper/>
      </OuterWrapper>
    );
  }
}

export default CharStatus;
