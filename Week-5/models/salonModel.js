const { getDatabase } = require('../databaseConnection');

const getSalonCollection = () => getDatabase().collection("salons");

module.exports = { getSalonCollection };
