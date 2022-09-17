export const urls = {
  chairs: {
    available: 'https://cdn-icons-png.flaticon.com/512/1723/1723651.png',
    selected: 'https://cdn-icons-png.flaticon.com/512/1723/1723655.png',
    booked: 'https://cdn-icons-png.flaticon.com/512/1723/1723596.png',
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
