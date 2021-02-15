import React from 'react';

const withRequest = (Component) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Component props={this.props} />
      );
    }
  }
  return WrappedComponent;
};

export default withRequest;
