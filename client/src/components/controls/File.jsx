import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import validation from "../../tools/validation";
import {FormContext} from "../../tools/context";

const Wrapper = styled.div`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  position: relative;
`;

const Title = styled.p`
  position: absolute;
  top: -16px;
  left: 6px;
  margin: 0;
  font-size: 14px;
  color: #999;
`;

const Status = styled.p`
  position: absolute;
  bottom: -15px;
  left: 6px;
  margin: 0;
  font-size: 14px;
  color: #ef9898;
  white-space: nowrap;
`;

const Label = styled.label`
  display: block;
  width: 100%;
  height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  padding-top: 5px;
  background-color: #dde5ff;
  border: none;
  border-radius: 5px;
  outline: none;
  text-align: center;
  :hover, :focus {
    box-shadow: 0 1px 2px 0 rgb(32 33 36 / 28%);
  }
  :active {
    box-shadow: inset 0 1px 2px 0 rgb(32 33 36 / 28%);
  }
`;

const Input = styled.input`
  display: none;
`;

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      status: '',
    };
    this.ref = React.createRef();
  }

  static contextType = FormContext;

  componentDidMount() {
    if (typeof this.context.subscribe === 'function') {
      this.context.subscribe(this._validation);
    }
  }

  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    if (prevProps.focus !== focus) {
      if (focus) {
        this.ref.current.focus();
      }
    }
  }

  render() {
    const { status } = this.state;
    const {
      title, width, margin, onClick,
    } = this.props;
    return (
      <Wrapper
        width={width}
        margin={margin}
      >
        <Title>{title}</Title>
        <Label
          onClick={onClick}
          ref={this.ref}
        >
          Загрузить
          <Input
            type="file"
            onChange={this._onChange}
          />
        </Label>
        <Status>{status}</Status>
      </Wrapper>
    );
  }

  _onChange = (event) => {
    const { name } = this.props;
    const files = event.target.files;
    if (files.length > 1) {
      this.setState({status: 'Только 1 файл'});
    } else {
      this.setState({status: files[0].name, file: files[0]}, () => {
        this.context.onChange(name, files[0]);
        this._validation();
      });
    }
  }

  _validation = async () => {
    const {file} = this.state;
    const {rules} = this.props;
    let flag = true;
    for (let key in rules) {
      if (rules.hasOwnProperty(key) && validation.hasOwnProperty(key)) {
        flag = await validation[key].func(file, rules[key]);
      }
      if (!flag) {
        this.setState({status: validation[key].error})
        break;
      }
    }
    return new Promise((resolve, reject) => {
      flag ? resolve() : reject()
    });
  }
}

File.defaultProps = {
  title: '',
  width: '190px',
  margin: '0 0 0 0',
  onClick: null,
  focus: false,
};

File.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  focus: PropTypes.bool,
};

export default File;
