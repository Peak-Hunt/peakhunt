const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('selectedSport', (option, sport) => {
    return option === sport ? 'selected' : '';
})

hbs.registerHelper('selectedDifficulty', (option, difficulty) => {
    return option === difficulty ? 'selected' : '';
})