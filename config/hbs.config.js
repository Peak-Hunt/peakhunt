const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('option', function (selectedValue, value) {
    const selectedProperty = value == selectedValue ? 'selected' : '';
    return new hbs.SafeString(`<option value=${value} ${selectedProperty}>${value}</option>`);
});

hbs.registerHelper('objOption', function (selectedValue, value) {
    const selectedProperty = value.key == selectedValue ? 'selected' : '';
    return new hbs.SafeString(`<option value=${value.key} ${selectedProperty}>${value.name}</option>`);
});