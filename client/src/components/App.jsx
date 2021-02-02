import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const response = await fetch('http://localhost/api/map-cell/get');
    const q = await response.json();
    console.log(q);
  }

  render() {
    return <div>wewffewf</div>;
  }
}

export default App;
