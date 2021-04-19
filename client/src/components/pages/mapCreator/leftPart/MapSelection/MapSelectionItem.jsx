import React from 'react';
import styled from 'styled-components';
import WithRequest from '../../../../shells/ShellRequest';

const SelectedWrapper = styled.div`
  display: flex;
  width: ${({ type }) => (type === 'lead' ? '100%' : (type === 'group' ? '90%' : '76%'))};
  max-width: 340px;
  height: 28px;
  cursor: pointer;
  color: rgba(0, 0, 0);
  background-color: ${({ type, check }) => (type === 'group' || type === 'lead' ? '#387ea1' : (check ? 'rgba(57, 168, 57, 0.7)' : 'rgb(230, 230, 230)'))};
  border-radius: 15px;
  box-sizing: border-box;
  padding-right: 10px;
  margin-bottom: ${({ type }) => (type === 'lead' ? '8px' : '1px')};

  :hover {
    opacity: .7;
  }
`;

const StatusLabel = styled.div`
  display: ${({ type }) => (type === 'group' || type === 'lead' ? 'block' : 'none')};
  width: 28px;
  height: 28px;
  border-radius: 14px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0)')};
  transition: .2s;
  :after {
    display: block;
    background: transparent url('data:image/svg+xml;utf8,%3csvg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10"%3e%3cpolygon fill="white" points="0,0 8,5 0,10"/%3e%3c/svg%3e') 50% 50% no-repeat;
    content: '';
    width: 8px;
    height: 8px;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const NameContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: ${({ type }) => (type === 'lead' ? 'center' : 'start')};
  font-weight: 700;
  padding-top: 4px;
  padding-left: ${({ type }) => (type === 'lead' ? '0' : '10px')};
  overflow: hidden;
  white-space: nowrap;
  color: ${({ type }) => (type === 'group' || type === 'lead' ? '#efefef' : 'black')};
`;

class MapSelectionItem extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      name, type, id, onChange, open, check, onContextMenu,
    } = this.props;
    return (
      <SelectedWrapper
        id={id}
        type={type}
        check={check}
        onClick={onChange}
      >
        <StatusLabel
          type={type}
          open={open}
        />
        <NameContainer
          type={type}
          id={id}
          className="modalMenuWithin"
          onContextMenu={onContextMenu}
        >
          {name}
        </NameContainer>
      </SelectedWrapper>
    );
  }
}

MapSelectionItem.propTypes = {
};

export default MapSelectionItem;
