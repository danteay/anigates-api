export const isEmpty = (value) => {
  switch (value) {
    case '':
    case 0:
    case null:
    case NaN:
    case undefined:
    case {}:
    case []:
      return true;
    default:
      return false;
  }
};
