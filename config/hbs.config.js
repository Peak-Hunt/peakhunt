const hbs = require("hbs");
const path = require("path");

hbs.registerPartials(path.join(__dirname, "../views/partials"));

hbs.registerHelper("option", function (selectedValue, value) {
  const selectedProperty = value == selectedValue ? "selected" : "";
  return new hbs.SafeString(
    `<option value=${value} ${selectedProperty}>${value}</option>`
  );
});

hbs.registerHelper("isInvalid", (error) => {
  return error ? "is-invalid" : "";
});

hbs.registerHelper("formError", (error) => {
  return error ? new hbs.SafeString(`<div class="invalid-feedback">${error}</div>`) : "";
});
