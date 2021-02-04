import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #0000ff;
  transition: 0.1s;
  height: ${({ open }) => (open ? '200px' : '0')};

  label {
    width: 50%;
    margin: 0;
    padding: 0;
    display: block;
    height: 15px
  ;
  }
  input {
    width: 50%;
  }
  button {
    width: 50%;
  }

`;

class AddTerrain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <button onClick={() => this.setState({ open: !open })}>{open ? 'Скрыть' : 'Добавить'}</button>
        <Wrapper open={open}>

          <label>Название</label>
          <label>Изображение</label>
          <input />
          <button />

          <label>Класс</label>
          <label>Проходимость</label>
          <input />
          <input type="checkbox" />

          <button>Добавить</button>
        </Wrapper>
      </>
    );
  }
}

export default AddTerrain;
