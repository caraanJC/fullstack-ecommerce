export const compareUsername = (a, b) => {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
};

export const compareName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const compareDate = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
};

export const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const toStandardTime = (time) => {
  time = time.split(':'); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = '' + hours;
  } else if (hours > 12) {
    timeValue = '' + (hours - 12);
  } else if (hours === 0) {
    timeValue = '12';
  }

  timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
  timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM

  // show

  return timeValue;
};

export const toNormalTime = (time) => {
  const date = new Date(time).toLocaleString('en-US', {
    timeZone: 'Asia/Taipei',
  });
  return date;
};

export const notify = (popup, setupPopup, message, type) => {
  if (!popup.timeout) {
    setupPopup({
      message,
      type,
      timeout: setTimeout(() => {
        setupPopup({ message: '', type: '', timeout: '' });
      }, 2500),
    });
  } else {
    clearTimeout(popup.timeout);
    setupPopup({
      message,
      type,
      timeout: setTimeout(() => {
        setupPopup({ message: '', type: '', timeout: '' });
      }, 5000),
    });
  }
};
