import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { atrTerrainsPath } from '../../../../tools/routing';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
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
  position: absolute;
  top: -20px;
  left: 0;
`;

const Row = styled.div`
  display: flex;
`;

const Tile = styled.div`
  display: inline-block;
  min-width: 64px;
  height: 64px;
  border: 1px black solid;
  background-image: ${({ fileName }) => atrTerrainsPath(fileName)};
`;

class MainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    const { size, mapCells } = this.props;
    const data = {};
    mapCells.map((value) => {
      const name = `x${value.x}y${value.y}`;
      data[name] = value.type;
    });
    this.setState({ data });
  }

  render() {
    const { size } = this.props;
    const { data } = this.state;
    return (
      <OuterWrapper>
        {data
          ? (
            <InnerWrapper>
              <Qwerty>
                {new Array(size.width).fill('').map((value, index1) => (
                  <Row>
                    {new Array(size.height).fill('').map((value, index) => {
                      const name = `x${index1 + 1}y${index + 1}`;
                      console.log(name);
                      return <Tile fileName={data[name] ? data[name].fileName : ''} />;
                    })}
                  </Row>
                ))}
              </Qwerty>

            </InnerWrapper>
          )
          : null}
      </OuterWrapper>
    );
  }
}

MainPart.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(
  (mapStateToProps) => ({
    size: mapStateToProps.setting.size,
    mapCells: mapStateToProps.mapCell.mapCells,
  }),
)(MainPart);
