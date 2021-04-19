import PropTypes from 'prop-types';

export const Size = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export const Terrain = {
  name: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  passability: PropTypes.bool.isRequired,
};

export const MapCell = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  terrain: PropTypes.shape(Terrain).isRequired,
};
