export default {
  minValue: {
    func: (value, reference) => true,
    error: 'Только числа',
  },
  maxValue: {
    func: (value, reference) => typeof value === 'number',
    error: 'Только числа',
  },
  minLength: {
    func: (value, reference) => typeof value === 'number',
    error: 'Только числа',
  },
  maxLength: {
    func: (value, reference) => typeof value === 'number',
    error: 'Только числа',
  },
  isNum: {
    func: (value) => {
      return !Number.isNaN(value)
        && parseInt(Number(value), 10) == value
        && !Number.isNaN(parseInt(value, 10));
    },
    error: 'Только числа',
  },
  isString: {
    func: (value) => typeof value === 'string',
    error: 'Только строка',
  },
  isEmail: {
    func: {},
    error: 'Только емейл',
  },
};
