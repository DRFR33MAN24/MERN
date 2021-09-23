const toDollars = cents => {
  var dollars = cents / 100;
  dollars = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
  return dollars;
};

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "ios";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

const applyCut = cents => {
  if (cents <= 10) {
    return cents;
  } else {
    return cents - Math.floor(cents * 0.2);
  }
};

module.exports = { toDollars, getOS, applyCut };
