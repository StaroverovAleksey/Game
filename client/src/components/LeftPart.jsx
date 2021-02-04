import React from 'react';
import styled from 'styled-components';
import AddTerrain from './AddTerrain';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: ${({ open }) => (open ? '40vw' : '0')};
  height: 100vh;
  background-color: red;
  transition: 0.1s;
  div {
    opacity: ${({ open }) => (open ? '100%' : '0')};
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: -30px;
  width: 30px;
  height: 60px;
  cursor: pointer;
`;
const MapSize = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 80%;
  div {
    display: flex;
    width: 100%;
  }
  h3 {
    display: inline-block;
    text-align: center;
    margin-bottom: 5px;
    width: 100%;
  }
  input {
    width: 40%;
    height: 30px;
    box-sizing: border-box;
    cursor: text;
  }
  button {
    width: 20%;
    min-width: 100px;
    height: 30px;
    cursor: pointer;
  }
`;

class LeftPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  render() {
    const { open } = this.state;
    return (
      <Container open={open}>
        <CloseButton onClick={() => this.setState({ open: !open })} />

        <MapSize>
          <h3>Размеры поля</h3>
          <div>
            <input />
            <input />
            <button>Применить</button>
          </div>
        </MapSize>

        <MapSize>
          <h3>Очистить поле</h3>
          <button>Очистить</button>
        </MapSize>

        <MapSize>
          <h3>Новая местность</h3>
          <AddTerrain />
        </MapSize>
      </Container>
    );
  }
}

export default LeftPart;
