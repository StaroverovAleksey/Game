import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TileField from './TileField';
import {Size} from "../../../../tools/types";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
`;

const InnerWrapper = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const Qwerty = styled.div`
  display: flex;
  position: absolute;
`;

const Asd = styled.div`
  position: relative;
  height: 30px;
  overflow: hidden;
`;

const Qaz = styled.div`
  text-align: center;
  padding-top: 5px;
  width: 64px;
  height: 30px;
`;

class MainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldX: 0,
      fieldY: 0,
    };
    this.wrapRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      wrapperWidth: this.wrapRef.current.offsetWidth,
      wrapperHeight: this.wrapRef.current.offsetHeight,
    })
  }

  render() {
    const { wrapperWidth, wrapperHeight, fieldX, fieldY } = this.state;
    const { size } = this.props;
    return (
      <OuterWrapper>

        <Asd>
          <Qwerty style={{top: `${fieldY}px`, left: `${fieldX}px`}}>
            {new Array(size.width).fill('').map((value, index) => {
              return <Qaz>{index + 1}</Qaz>;
            })}
          </Qwerty>
        </Asd>

        <InnerWrapper ref={this.wrapRef}>
          <TileField size={size}
                     wrapperWidth={wrapperWidth}
                     wrapperHeight={wrapperHeight}
                     onMouseMove={this._onMouseMove}
          />
        </InnerWrapper>

        <Asd>
          <Qwerty style={{top: `${fieldY}px`, left: `${fieldX}px`}}>
            {new Array(size.width).fill('').map((value, index) => {
              return <Qaz>{index + 1}</Qaz>;
            })}
          </Qwerty>
        </Asd>

      </OuterWrapper>
    );
  }

  _onMouseMove = (e) => {
    const { fieldX } = this.state;
    this.setState({fieldX: e});
  }
}

MainPart.propTypes = {
  size: PropTypes.shape(Size).isRequired,
};

export default connect(
  (mapStateToProps) => ({
    size: mapStateToProps.setting.size,
  }),
)(MainPart);
