import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";
import i18n from "i18next";
import Button from "../atomic/Button";
import {ROUT_CREATE_CHAR} from "../../tools/routing";
import {connect} from "react-redux";
import {atrUtilsPath} from "../../tools/utils";
import Charrr from "./Charrr";
import Loading from "./Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 36px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CharsWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  background-image: ${() => atrUtilsPath('choiceCharFon.png')};
  width: ${({width}) => `${width}px`};
  height: 192px;
  margin-bottom: 36px;
`;


const NotChar = styled.p`
  font-size: 36px;
  margin-top: 0;
  text-align: center;
  color: #cb7a7a;
`;

class ChoiceChar extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      choiceChar: false,
      chars: null
    }
  }

  componentDidMount() {
    const {socket, chars} = this.props;
    socket.emit('auth/getMainCharList');
    if (chars && chars.length) {
      this._propsToState();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {chars} = this.props;
    if (prevProps.chars !== chars) {
      this._propsToState();
    }
  }

  render() {
    const {choiceChar, chars} = this.state;
    const {dispatch} = this.props;
    if (!chars) {
      return <Loading/>;
    }
    return <Wrapper>
      <Title>{i18n.t('choiceChar')}</Title>

      {chars.length
          ? <CharsWrapper width={(chars.length + 2) * 64}>
            {chars.map((char, index) => {
              return <div onClick={this._choice} id={index}>
                <Charrr char={char}/>
              </div>
            })}
          </CharsWrapper>
          : <NotChar>{i18n.t('createChar')}</NotChar>
      }

      <ButtonWrapper>
        <Button
            text={i18n.t('comeIn')}
            width="100px"
            disabled={!choiceChar}
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

  _propsToState = () => {
    const {chars} = this.props;
    const charsCopy = chars.map((value, index) => {
      const valueCopy = JSON.parse(JSON.stringify(value));
      valueCopy.location = {y: 1, x: index + 2};
      return valueCopy
    });
    this.setState({chars: charsCopy});
  }

  _unChoice = (id) => {
    const {chars} = this.state;
    const charsCopy = chars.map((value) => JSON.parse(JSON.stringify(value)));
    charsCopy[id].location.y = 1;
    charsCopy[id].direction = 'back';
    this.setState({chars: charsCopy, choiceChar: false}, () => setTimeout(() => {
      const charsCopy1 = charsCopy.map((w) => JSON.parse(JSON.stringify(w)));
      charsCopy1[id].direction = 'front';
      this.setState({chars: charsCopy1});
    }, 1000));
  }

  _choice = ({currentTarget}) => {
    const {chars, choiceChar} = this.state;
    const {id} = currentTarget;
    const charsCopy = chars.map((value) => JSON.parse(JSON.stringify(value)));

    if (choiceChar === id) {

      this._unChoice(id);

    } else {
      if (choiceChar) {
        //this._unChoice(choiceChar);
        charsCopy[choiceChar].location.y = 1;
        charsCopy[choiceChar].direction = 'back';
      }
      charsCopy[id].location.y = 2;
      charsCopy[id].direction = 'front';
      this.setState({chars: charsCopy, choiceChar: id}, () => setTimeout(() => {
        const charsCopy1 = charsCopy.map((w) => JSON.parse(JSON.stringify(w)));
        charsCopy1[choiceChar].direction = 'front';
        this.setState({chars: charsCopy1});
      }, 1000));
    }

  }
}

export default connect(
    (mapStateToProps) => ({
      socket: mapStateToProps.settings.socket,
      chars: mapStateToProps.choiceChar.chars,
    })
)(ChoiceChar);
