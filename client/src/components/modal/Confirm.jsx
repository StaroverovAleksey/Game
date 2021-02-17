import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../controls/Button';
import Field from '../controls/Field';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  z-index: 98;
`;

const InnerWrapper = styled.div`
  min-width: 300px;
  display: inline-block;
  margin: 300px auto;
  z-index: 99;
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  text-align: center;
`;

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.tabInterceptor);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.tabInterceptor);
  }

  render() {
    const { focus } = this.state;
    const {
      description, onSuccess, onCancel,
    } = this.props;
    return (
      <OuterWrapper>
        <InnerWrapper>
          <Field>
            <Title>{description}</Title>
            <div>
              <Button
                text="Нет"
                width="100px"
                margin="0 100px 0 0"
                onClick={onCancel}
                focus={focus === 'buttonNo'}
              />
              <Button
                text="Да"
                width="100px"
                onClick={onSuccess}
                focus={focus === 'buttonYes'}
              />
            </div>
          </Field>
        </InnerWrapper>

      </OuterWrapper>
    );
  }

  tabInterceptor = (event) => {
    const {focus} = this.state;
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setState({focus: focus === 'buttonNo' ? 'buttonYes' : 'buttonNo'});
    }
  }
}

Confirm.propTypes = {
  description: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirm;
