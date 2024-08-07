const moment = require('moment');

// Helper function to format date
const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY h:mm:ss a');
}

module.exports = { formatDate };