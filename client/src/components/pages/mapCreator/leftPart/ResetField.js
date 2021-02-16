import React from 'react';
import styled from 'styled-components';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteAllMapSells, setError} from "../../../../redux/actions";
import {API_DELETE_ALL_MAP_CELLS} from "../../../../tools/routing";
import WithRequest from "../../../shells/ShellRequest";

const Title = styled.h3`
  margin: 0 0 15px 0;
  text-align: center;
`;

class ResetField extends WithRequest {
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
    await this.DELETE(API_DELETE_ALL_MAP_CELLS);
    resetField();
  }
}

ResetField.propTypes = {
  resetField: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    resetField: (data) => mapDispatchToProps(deleteAllMapSells(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(ResetField);
