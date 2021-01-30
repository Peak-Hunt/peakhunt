const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('option', (option, value) => {
    return option === value ? ' selected' : '';
})