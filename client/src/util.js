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

function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

function Last7Days() {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(getFormattedDate(d));
  }

  return result.join(",");
}

module.exports = { toDollars, getOS, getFormattedDate, Last7Days };
