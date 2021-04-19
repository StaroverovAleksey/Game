import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../controls/Button';
import Field from '../controls/Field';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${({y}) => y}px;
  left: ${({x}) => x}px;
  opacity: 1;
  z-index: 98;
`;

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      docWidth: document.documentElement.clientWidth,
      docHeight: document.documentElement.clientHeight,
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
      yCoord,
      data
    } = this.props;
    const {docWidth, docHeight} = this.state;
    return (

        <OuterWrapper
          x={this.ref.current && this.ref.current.offsetWidth + xCoord > docWidth ? docWidth - this.ref.current.offsetWidth : xCoord}
          y={this.ref.current && this.ref.current.offsetHeight + yCoord > docHeight ? docHeight - this.ref.current.offsetHeight : yCoord}
          className="modalMenu"
          ref={this.ref}>
          <Field>
            {data.map((value, index) => {
              return <Button
                text={value.title}
                margin={index < data.length - 1 ? '0 0 5px 0' : ''}
                key={`button_${index}`}
                onClick={value.callback}
              />;
            })}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ModalMenu;
