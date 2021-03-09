import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../controls/Button';
import Field from '../controls/Field';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${({x}) => x}px;
  left: ${({y}) => y}px;
  opacity: 1;
  z-index: 98;
`;

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this._closeModalMenu);
    document.addEventListener('contextmenu', this._closeModalMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._closeModalMenu);
    document.removeEventListener('contextmenu', this._closeModalMenu);
  }

  render() {
    const {
      xCoord,
      yCoord
    } = this.props;
    return (

        <OuterWrapper
          x={xCoord}
          y={yCoord}
          className="modalMenu"
          ref={this.ref}>
          <Field>
            <Button
              text="Изменить"
              margin="0 0 5px 0"
            /><Button
              text="Удалить"
            />
          </Field>
        </OuterWrapper>

    );
  }

  _closeModalMenu = (event) => {
    if (!this.ref.current.contains(event.target) && this.state.open) {
      this.props.closeCallback();
    } else {
      this.setState({open: true});
    }
  }
}

ModalMenu.propTypes = {
  xCoord: PropTypes.number.isRequired,
  yCoord: PropTypes.number.isRequired,
  closeCallback: PropTypes.func.isRequired,
};

export default ModalMenu;
