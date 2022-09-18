export const urls = {
  chairs: {
    available: 'https://img.icons8.com/cotton/64/000000/accent-chair--v1.png',
   // selected: 'https://img.icons8.com/cotton/64/000000/accent-chair--v2.png',
    selected: 'http://localhost:3000/res/selected.png',
    booked: 'https://img.icons8.com/cotton/64/000000/lawson-chair--v2.png',
    amended: 'https://img.icons8.com/color/48/000000/office-chair-2.png',
    disabled: 'https://img.icons8.com/pastel-glyph/64/000000/accent-chair--v1.png',
    allotedToYourTeam: 'http://localhost:3000/res/selected.png',
  },
};

export const getChair = (status, a=null, b) => {
  let chair = null;
  switch (status) {
    case 'A':
      chair = urls.chairs.available;
      break;
    case 'B':
      if (a == b) {
        chair = urls.chairs.allotedToYourTeam;
      } else {
        chair = urls.chairs.booked;
      }
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
