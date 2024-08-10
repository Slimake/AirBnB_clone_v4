//const $ = window.$

const input = 'input[type=checkbox]';
let checkedCheckboxes = {};
// Function to update the object dict based on checkbox state
function updateCheckedCheckboxes(checkbox) {
  const checkboxId = $(checkbox).attr('data-id');
  const checkboxName = $(checkbox).attr('data-name');

  if ($(checkbox).is(':checked')) {
    // Add ID to the object dict if checked
    if (!(checkbox in checkedCheckboxes)) {
      checkedCheckboxes[checkboxId] = checkboxName;
    }
  } else {
    // Remove ID from the object dict if unchecked
    delete checkedCheckboxes[checkboxId];
  }
}

$(document).ready(function () {
    $(input).on('change', function() {
        updateCheckedCheckboxes(this);

        checkboxValues = Object.values(checkedCheckboxes).join(', ');
        console.log(checkboxValues);
        $('.amenities h4').text(checkboxValues);
    });
});
