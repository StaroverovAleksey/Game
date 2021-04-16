import React from 'react';
import styled from 'styled-components';
import WithRequest from '../../../shells/ShellRequest';
import { atrUtilsPath } from '../../../../tools/routing';

const SelectedWrapper = styled.div`
  display: flex;
  width: ${({ width }) => `${width}%`};
  height: 28px;
  cursor: pointer;
  color: rgba(0, 0, 0);
  background-color: rgb(230, 230, 230);
  //background-color: #98ef98;
  border-radius: 15px;
  margin-bottom: 1px;
`;

const StatusLabel = styled.div`
  display: ${({ type }) => (type === 'group' ? 'block' : 'none')};
  width: 28px;
  height: 28px;
  background-color: #d2d6d9;
  border-radius: 14px;
  background-image: ${({ menuState }) => atrUtilsPath(menuState ? 'closeMenuButton.png' : 'openMenuButton.png')};
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 4px 4px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0)')};
  transition: .2s;
`;

const NameContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: start;
  font-weight: bold;
  font-size: 18px;
  padding-top: 3px;
  padding-left: 10px;
  box-sizing: border-box;
`;

class MapSelectionItem extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      name, width, type, id, onChange, open,
    } = this.props;
    return (
      <SelectedWrapper
        width={width}
        id={id}
        onClick={onChange}
      >
        <StatusLabel
          type={type}
          open={open}
        />
        <NameContainer>
          {name}
        </NameContainer>
      </SelectedWrapper>
    );
  }
}

MapSelectionItem.propTypes = {
};

export default MapSelectionItem;
