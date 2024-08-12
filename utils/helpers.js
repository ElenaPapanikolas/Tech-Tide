const moment = require('moment');

// Helper function to format date
const formatDate = (date) => {
    const timezone = 'America/Los_Angeles';
    return moment(date).tz(timezone).format('MM/DD/YYYY h:mm:ss a');
}

module.exports = { formatDate };