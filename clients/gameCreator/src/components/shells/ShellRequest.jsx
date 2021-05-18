import React from 'react';
import PropTypes from 'prop-types';
import Field from '../atomic/Field';

class WithRequest extends React.Component {
  render() {
    return null;
  }

  request = async (path, method, body, type='application/json') => {
    const {addError} = this.props;
    try {
      const answer = await fetch(path, {
        method,
        credentials: 'include',
        headers: type === 'form' ? {} : {
          'Content-Type': type
        }, body});
      if (answer.status === 200 || answer.status === 400) {
        return await answer.json();
      } else {
        addError({status: answer.status});
      }
    } catch (error) {
      addError({status: 418, error: error});
    }
  }

  GET = async (path) => {
    if (typeof path === 'string') {
      return await this.request(path, 'GET');
    } else {
      return await Promise.all(path.map((value) => this.request(value, 'GET')));
    }
  }

  POST = async (path, body) => {
      return await this.request(path, 'POST', body);
  }

  POST_FORM = async (path, body) => {
      return await this.request(path, 'POST', body, 'form');
  }

  PATCH = async (path, body) => {
      return await this.request(path, 'PATCH', body);
  }

  PATCH_FORM = async (path, body) => {
      return await this.request(path, 'PATCH', body, 'form');
  }

  DELETE = async (path, body) => {
    return await this.request(path, 'DELETE', body);
  }
}

Field.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WithRequest;
