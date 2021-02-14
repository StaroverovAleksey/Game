import React from 'react';
import styled from 'styled-components';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteAllMapSells} from "../../../../redux/actions";
import {API_DELETE_ALL_MAP_CELLS, API_GET_TERRAINS} from "../../../../tools/routing";

const Title = styled.h3`
  margin: 0 0 15px 0;
  text-align: center;
`;

class ResetField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      height: '',
    };
  }

  render() {
    return (
      <Field>
        <Title>Очистить поле</Title>
          <Button
            text="Очистить"
            width="100px"
            onClick={this._resetField}
          />
      </Field>
    );
  }

  _resetField = async () => {
    const {resetField} = this.props;

    const answer = await fetch(API_DELETE_ALL_MAP_CELLS, {method: 'DELETE'});
    if (answer.status === 200) {
      resetField();
    }
  }
}

ResetField.propTypes = {
  resetField: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    resetField: (data) => mapDispatchToProps(deleteAllMapSells(data)),
  }),
)(ResetField);
