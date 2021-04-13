import PropTypes from 'prop-types';

export const Size = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export const Terrain = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  passability: PropTypes.bool.isRequired,
};

export const MapCell = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  terrain: PropTypes.shape(Terrain).isRequired,
};
