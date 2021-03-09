import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../controls/Button';
import Field from '../controls/Field';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${({x}) => x}px;
  left: ${({y}) => y}px;
  opacity: 1;
  z-index: 98;
  background-color: red;
  width: 100px;
  height: 100px;
`;

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.tabInterceptor);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.tabInterceptor);
  }

  render() {
    const {
      xCoord,
      yCoord
    } = this.props;
    return (
      <OuterWrapper
        x={xCoord}
        y={yCoord}
        className="modalMenu">
      </OuterWrapper>
    );
  }

  tabInterceptor = (event) => {
    const {focus} = this.state;
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setState({focus: focus === 'buttonNo' ? 'buttonYes' : 'buttonNo'});
    }
  }
}

ModalMenu.propTypes = {
  xCoord: PropTypes.number.isRequired,
  yCoord: PropTypes.number.isRequired,
};

export default ModalMenu;
