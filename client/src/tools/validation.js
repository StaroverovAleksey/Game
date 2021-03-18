export default {
  required: {
    func: (value) => value,
    error: 'Обязательное поле',
  },
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
  spaceForbidden: {
    func: (value) => value.toString().trim().split('').findIndex((v) => v === ' ') === -1,
    error: 'Пробелы запрещены',
  },
  isNum: {
    func: (value) => !Number.isNaN(value)
        && parseInt(Number(value), 10) == value
        && !Number.isNaN(parseInt(value, 10)),
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
  format: {
    func: (file, reference) => {
      if (!file.type) {
        return true;
      }
      return reference.includes(file.type.split('/')[1]);
    },
    error: 'Неверный формат',
  },
};
