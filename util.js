const applyCut = cents => {
  if (cents <= 10) {
    return cents;
  } else {
    return cents - Math.floor(cents * 0.2);
  }
};

module.exports = { applyCut };
