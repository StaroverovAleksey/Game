import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TileField from './TileField';
import TopScroll from "./TopScroll";
import SideScroll from "./SideScroll";
import {isEmpty} from "../../../../../../../src/utils/utils";
import Loading from "../../Loading";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 0;
  box-sizing: border-box;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
`;

const EmptyMapsList = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  user-select: none;
  color: #ef9898;
`;

class MainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldX: 0,
      fieldY: 0,
    };
  }

  render() {
    const { fieldX, fieldY } = this.state;
    const { selectedMap, loadingMapSells } = this.props;
    return (
      <OuterWrapper>

        {isEmpty(selectedMap) ?
          <EmptyMapsList>Список карт пуст.<br/>Создайте карту</EmptyMapsList>
        : loadingMapSells ?
            <Loading />
        : <React.Fragment>

                <TopScroll left={fieldX}/>

                <InnerWrapper>
                  <SideScroll top={fieldY}/>
                  <TileField onMouseMove={this._onMouseMove}
                  />
                </InnerWrapper>

              </React.Fragment>
        }

      </OuterWrapper>
    );
  }

  _onMouseMove = (fieldX, fieldY) => {
    this.setState({fieldX, fieldY});
  }
}

MainPart.propTypes = {
  selectedMap: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default connect(
  (mapStateToProps) => ({
    selectedMap: mapStateToProps.setting.selectedMap,
    loadingMapSells: mapStateToProps.setting.loadingMapSells,
  }),
)(MainPart);
