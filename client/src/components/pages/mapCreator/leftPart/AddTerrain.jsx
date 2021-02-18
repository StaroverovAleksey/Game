import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #39dda0;
  transition: 0.1s;
  height: ${({ open }) => (open ? '200px' : '0')};

  div {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  label {
    width: 50%;
    margin: 0;
    padding: 0;
    display: block;
    height: 15px
  ;
  }
  /*input {
    width: 50%;
  }
  button {
    width: 50%;
  }*/

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

          <div>
            <label>Название</label>
            <input />
            <label>Класс</label>
            <input />
            <label>Номер</label>
            <input />
          </div>
          <div>
            <label>Изображение</label>
            <input type="file" />
            <label>Проходимость</label>

            <input type="checkbox" />

            <button>Добавить</button>
          </div>

        </Wrapper>
      </>
    );
  }
}

export default AddTerrain;
