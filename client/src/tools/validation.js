export default {
  required: {
    func: (value) => value.toString().trim(),
    error: () => 'Обязательное поле',
  },
  minValue: {
    func: (value, reference) => parseInt(value, 10) >= reference,
    error: (reference) => `мин. знач. ${reference}`,
  },
  maxValue: {
    func: (value, reference) => parseInt(value, 10) <= reference,
    error: (reference) => `макс. знач. ${reference}`,
  },
  minLength: {
    func: (value, reference) => value.toString().trim().length >= reference,
    error: (reference) => `мин. длина ${reference}`,
  },
  maxLength: {
    func: (value, reference) => value.toString().trim().length <= reference,
    error: (reference) => `макс. длина ${reference}`,
  },
  spaceForbidden: {
    func: (value) => value.toString().trim().split('').findIndex((v) => v === ' ') === -1,
    error: () => 'Пробелы запрещены',
  },
  isNum: {
    func: (value) => !Number.isNaN(value)
        && parseInt(Number(value), 10) == value
        && !Number.isNaN(parseInt(value, 10)),
    error: () => 'Только числа',
  },
  isEmail: {
    func: {},
    error: () => 'Только емейл',
  },
  format: {
    func: (file, reference) => {
      if (!file.type) {
        return true;
      }
      return reference.includes(file.type.split('/')[1]);
    },
    error: () => 'Неверный формат',
  },
};
