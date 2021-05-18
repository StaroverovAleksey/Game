import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
`;

const Field = (props) => {
  const {
    children,
    className,
  } = props;
  return <Container className={className}>{children}</Container>;
};

Field.defaultProps = {
  children: [],
  className: '',
};

Field.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.node.isRequired,
  ]),
  className: PropTypes.string,
};

export default Field;
