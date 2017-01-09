import isString from 'lodash/isString';

export default function(value) {
  if (isString(value)) {
    return value !== 'no';
  } else {
    return !!value;
  }
}