export const urls = {
  chairs: {
    available: 'https://img.icons8.com/ios/100/000000/office-chair-2.png',
    selected: 'https://img.icons8.com/fluency/96/000000/office-chair-2.png',
    booked: 'https://img.icons8.com/ios-filled/100/000000/office-chair-2.png',
    amended: 'https://img.icons8.com/color/48/000000/office-chair-2.png',
  },
};

export const getChair = (status) => {
  let chair = null;
  switch (status) {
    case 'A':
      chair = urls.chairs.available;
      break;
    case 'B':
      chair = urls.chairs.booked;
      break;
    case 'S':
      chair = urls.chairs.selected;
      break;
    case 'E':
      chair = urls.chairs.amended;
      break;
    default:
      chair = urls.chairs.available;
  }
  return chair;
};
