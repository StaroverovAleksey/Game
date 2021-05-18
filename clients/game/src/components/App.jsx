import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { PATH_LOGIN, PATH_REGISTRATION } from '../tools/routing';
import Game from './pages/game/Game';
import Empty from './pages/Empty';

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
    ) : (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Game} />
          <Route path={PATH_LOGIN} component={Login} />
          <Route path={PATH_REGISTRATION} component={Registration} />
          <Route component={Empty} />
        </Switch>
      </BrowserRouter>
    );
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
