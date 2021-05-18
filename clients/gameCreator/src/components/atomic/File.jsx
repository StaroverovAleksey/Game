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
  left: 6px;
  top: -16px;
  margin: 0;
  font-size: 14px;
  color: #999;
`;

const Status = styled.p`
  position: absolute;
  bottom: -15px;
  margin: 0;
  left: 6px;
  font-size: 14px;
  color: #ef9898;
  white-space: nowrap;
`;

const Image = styled.label`
  position: relative;
  overflow: hidden;
  display: block;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  cursor: pointer;
  border: 2px #dde5ff solid;
  background-image: ${({ path }) => path};
  opacity: ${({ active }) => (active ? '0.4' : '1')};
  :hover {
    opacity: ${({ active }) => (active ? '0.4' : '0.7')};
    z-index: 1;
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
      path: props.path,
    };
    this.ref = React.createRef();
    this.refImg = React.createRef();
  }

  static contextType = FormContext;

  componentDidMount() {
    if (typeof this.context.subscribe === 'function') {
      this.context.subscribe(this);
    }
  }

  render() {
    const { status, path } = this.state;
    const { name } = this.props;
    const index = this.context.errors.findIndex((value) => value.param === name);
    const errorMsg = index > -1 ? this.context.errors[index].msg : '';
    const {
      title, width, margin, onClick,
    } = this.props;
    return (
      <Wrapper
        width={width}
        margin={margin}
      >
        <Title>{title}</Title>
        <Image
          onClick={onClick}
          path={path}
        >
          <Input
            type="file"
            onChange={this._onChange}
            ref={this.ref}
          />
          <img ref={this.refImg}/>
        </Image>
        <Status>{errorMsg || status}</Status>
      </Wrapper>
    );
  }

  _onChange = (event) => {

    const preview = this.refImg.current;
    const file    = event.target.files[0];
    const reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

    const { name } = this.props;
    const files = event.target.files;
    if (files.length > 1) {
      this.setState({status: 'Только 1 файл'});
    } else {
      this.setState({status: files[0].name, file: files[0]}, () => {
        this.context.onChange(name, files[0]);
        this.validation();
      });
    }
  }

  validation = async () => {
    const {file} = this.state;
    const {rules} = this.props;
    let flag = true;
    for (let key in rules) {
      if (rules.hasOwnProperty(key) && validation.hasOwnProperty(key)) {
        flag = await validation[key].func(file, rules[key]);
      }
      if (!flag) {
        this.setState({status: validation[key].error(rules[key])})
        break;
      }
    }
    return new Promise((resolve, reject) => {
      flag ? resolve() : reject()
    });
  }

  reset = () => {
    this.setState({file: {}, status: '',}, () => {
      this.ref.current.value = '';
      this.refImg.current.src = '';
    });
  }
}

File.defaultProps = {
  path: '',
  title: '',
  width: '190px',
  margin: '0 0 0 0',
  onClick: null,
  focus: false,
};

File.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  focus: PropTypes.bool,
};

export default File;
