const util = require("../util");
const PaymentTemplate = (name, amount, type) => {
  return `<!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  
</head>

<body style="background-color: #f0ad4e; margin: 0 !important; padding: 0 !important;">
        <h1>You Submitted a Payment Order </h1>
        <h2>Details:</h2>
        <h3> Name:${name}</h3>
        <h3> Amount:${util.toDollars(amount)}</h3>
        <h3> As:${type}</h3>
</body>

</html>`;
};

module.exports = { PaymentTemplate };
