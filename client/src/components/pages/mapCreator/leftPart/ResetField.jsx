import React from 'react';
import styled from 'styled-components';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteAllMapSells, setError} from "../../../../redux/actions";
import {API_DELETE_MAP_CELL} from "../../../../tools/routing";
import WithRequest from "../../../shells/ShellRequest";
import Confirm from "../../../modal/Confirm";

const Title = styled.h3`
  margin: 0 0 15px 0;
  text-align: center;
`;

class ResetField extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  render() {
    const {modal} = this.state;
    return (
      <Field>
        <Title>Очистить поле</Title>
          <Button
            text="Очистить"
            width="100px"
            onClick={() => this.setState({modal: true})}
          />

        {modal ?
          <Confirm
            description={'Уверен?'}
            onSuccess={this._resetField}
            onCancel={() => this.setState({modal: false})}
          />
        : null}

      </Field>
    );
  }

  _resetField = async () => {
    const {resetField} = this.props;
    await this.DELETE(API_DELETE_MAP_CELL);
    this.setState({modal: false})
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
