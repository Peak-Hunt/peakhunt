const hbs = require('hbs');
const path = require('path');
const constants = require('../public/js/constants.js');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('option', function (selectedValue, value) {
    const selectedProperty = value == selectedValue ? 'selected' : '';
    return new hbs.SafeString(`<option value=${value} ${selectedProperty}>${value}</option>`);
});

hbs.registerHelper('objOption', function (selectedValue, value) {
    const selectedProperty = value.key == selectedValue ? 'selected' : '';
    return new hbs.SafeString(`<option value=${value.key} ${selectedProperty}>${value.name}</option>`);
});

hbs.registerHelper('sportKeyToName', function (sportKey) {
    const result = constants.SPORTS.filter(sport => sport.key === sportKey);
    return result.length > 0 ? result[0].name : '';
});

hbs.registerHelper('stringifyLocation', function (location) {
    return JSON.stringify(location)
})

hbs.registerHelper ("setChecked", function (value, currentValue) {
    if ( value == currentValue ) {
       return "checked";
    } else {
       return "";
    }
 });