import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fonTop, qwerty,
} from '../../../../tools/palette';
import { changeStateLeftMenu } from '../../../../redux/actions';
import { atrUtilsPath } from '../../../../tools/routing';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${fonTop};
`;

const CloseButton = styled.button`
  background-color: ${qwerty};
  background-image: ${({ menuState }) => atrUtilsPath(menuState ? 'closeMenuButton.png' : 'openMenuButton.png')};
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: 0 20px;
  border: none;
  cursor: pointer;
  outline: none;
  width: 40px;
  :hover {
    background-color: ${qwerty};
  }
`;

class TopPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { openLeftMenu, menuState } = this.props;
    return (
      <Container>

        <CloseButton
          onClick={openLeftMenu}
          menuState={menuState}
        />

      </Container>
    );
  }
}

TopPart.propTypes = {
  openLeftMenu: PropTypes.func.isRequired,
  menuState: PropTypes.bool.isRequired,
};

export default connect(
  (mapStateToProps) => (
    { menuState: mapStateToProps.setting.leftMenuState }
  ),
  (mapDispatchToProps) => ({
    openLeftMenu: () => mapDispatchToProps(changeStateLeftMenu()),
  }),
)(TopPart);
