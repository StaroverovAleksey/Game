import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MapCreator from './pages/mapCreator/MapCreator';

const Error = styled.p`
  font-size: 36px;
  text-align: center;
`;

class App extends React.Component {
  render() {
    const { error } = this.props;
    return error ? (
      <Error>
        {`Косяк. Код ошибки: ${error.status}`}
        <br />
        Обнови страницу, может быть, поможет.
      </Error>
    ) : <MapCreator />;
  }
}

App.propTypes = {
  error: PropTypes.any.isRequired,
};

export default connect(
  (mapStateToProps) => (
    { error: mapStateToProps.setting.error }
  ),
  undefined,
)(App);
