import React from 'react';
import { render } from 'react-dom';
import './styles/styles.css';
import image from './assets/images/blue.jpg';

const App = () => (
  <div className="container">
    <h1>Сборка автоматизации под стек MERN (01.2021)</h1>
    <img alt="sdf" src={image} width={200} height={200} />
  </div>
);

render(<App />, document.getElementById('app'));
