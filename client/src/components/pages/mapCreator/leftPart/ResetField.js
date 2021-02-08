import React from 'react';
import styled from 'styled-components';
import Field from '../../../controls/Field';
import Button from '../../../controls/Button';

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
          />
      </Field>
    );
  }

  _onSubmit = (data) => {
    console.log(data);
  }
}

export default ResetField;
