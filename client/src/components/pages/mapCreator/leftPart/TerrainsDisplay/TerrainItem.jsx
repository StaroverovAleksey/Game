import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pathToImage } from '../../../../../tools/routing';
import ModalMenu from '../../../../modal/ModalMenu';

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  border-right: 2px #dde5ff solid;
  border-bottom: 2px #dde5ff solid;
  cursor: pointer;
  :nth-child(5n + 5) {
    border-right: none;
  }
  :nth-last-child(-n + ${({ remainder }) => remainder}) {
    border-bottom: none;
  }
  :hover >div {
    opacity: ${({ active }) => (active ? '0.4' : '0.7')};
    z-index: 1;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
  }
`;

const Image = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: ${({ path }) => path};
  opacity: ${({ active }) => (active ? '0.4' : '1')};
  :hover {
    opacity: ${({ active }) => (active ? '0.4' : '0.7')};
    z-index: 1;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
  }
`;

const Choice = styled.span`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  box-sizing: border-box;
  background-image: ${({ active }) => (active ? 'url(../src/assets/images/icons/qwerty.png)' : '')};
  background-position: top;
  background-size: cover;
  opacity: 1;
`;

const Name = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  color: white;
  padding: 0 5px;
  border-radius: 5px;
  white-space: nowrap;
  box-sizing: border-box;
  max-width: 100%;
  z-index: 2;
`;

const Number = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  font-size: 24px;
  font-weight: bold;
  color: white;
  padding: 0 5px;
  border-radius: 10px;
  z-index: 2;
`;

class TerrainItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      terrain, remainder, callBack, active,
    } = this.props;
    return (
      <Wrapper
        remainder={remainder}
        active={active}
        onClick={() => callBack(terrain)}
      >
        <Image
          path={pathToImage(terrain.fileName)}
          onClick={() => callBack(terrain)}
          active={active}
        />
        <Name>{terrain.name}</Name>
        <Number>{terrain.number}</Number>
        <Choice
          active={active}
          className="modalMenuWithin"
          id={terrain.number}
        />
      </Wrapper>
    );
  }
}

TerrainItem.propTypes = {
  terrain: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  remainder: PropTypes.number.isRequired,
  callBack: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default TerrainItem;
