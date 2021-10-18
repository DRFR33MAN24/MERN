const applyCut = cents => {
  if (cents <= 10) {
    return cents;
  } else {
    return cents - Math.floor(cents * 0.2);
  }
};

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return month + "/" + day + "/" + year;
}

const toDollars = cents => {
  var dollars = cents / 100;
  dollars = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
  return dollars;
};

module.exports = { applyCut, getFormattedDate, toDollars };
