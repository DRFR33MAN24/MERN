
const toDollars = cents => {

    var dollars = cents / 100;
    dollars = dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
    return dollars;
}

module.exports = { toDollars }