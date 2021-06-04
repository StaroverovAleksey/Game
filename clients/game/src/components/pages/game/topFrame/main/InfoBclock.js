import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import i18n from "i18next";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);
  height: 0;
  font-size: 12px;
  color: white;
  background-color: red;
`;

const String = styled.span`
  display: inline-block;
  white-space: nowrap;
  transform: rotate(180deg);
  background-color: red;
  animation: disabled 1s infinite;

  @keyframes disabled {
    100.0% {opacity: 0;}
  }
`;

class InfoBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strings: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {strings} = this.state;
        const {error} = this.props;
        if (prevProps.error !== error && error.address === 'MAIN_CHAR') {
            this.setState({strings: strings.concat([error.msg])});

            setTimeout(() => {
                const copyStrings = this.state.strings.concat([]);
                copyStrings.shift();
                this.setState({strings: copyStrings});
            }, 900);
        }
    }

    render() {
        const {strings} = this.state;
        const {error} = this.props;
        return <Wrapper>
            {strings.map((value) => {
                return <String>{i18n.t(value)}</String>
            })}
        </Wrapper>;
    }
}

export default connect(
    (mapStateToProps) => ({
        error: mapStateToProps.settings.error,
    })
)(InfoBlock);
