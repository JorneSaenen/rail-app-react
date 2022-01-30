export const baseURL = 'https://api.irail.be';

export const dateNow = () => {
  const date = new Date().toLocaleDateString();
  if (date.includes('-')) {
    return date
      .split('-')
      .reverse()
      .map((el) => (el.length === 1 ? '0' + el : el))
      .join('-');
  }
  if (date.includes('/')) {
    return date
      .split('/')
      .reverse()
      .map((el) => (el.length === 1 ? '0' + el : el))
      .join('-');
  }
};

export const timeNow = new Date()
  .toLocaleTimeString()
  .split(':')
  .filter((el, i) => (i === 0 || i === 1 ? el : false))
  .join(':');

export const toCorrectDate = (dateStr) => {
  let date = new Date(dateStr).toLocaleDateString(); //=> 5-12-2021
  if (date.includes('-')) {
    return (date = date
      .split('-')
      .map((v, i) => {
        if (v.length === 1) {
          return '0' + v;
        }
        if (i === 2) {
          return v.slice(2, 4);
        } else {
          return v;
        }
      })
      .join(''));
  }
  if (date.includes('/')) {
    return (date = date
      .split('/')
      .map((v, i) => {
        if (v.length === 1) {
          return '0' + v;
        }
        if (i === 2) {
          return v.slice(2, 4);
        } else {
          return v;
        }
      })
      .join(''));
  }

  return date;
};

export const toCorrectTime = (timeStr) => timeStr.split(':').join('');

export const filtered = (array, input) => array.filter((item) => item.match(new RegExp(input, 'i'))).slice(0, 8);
