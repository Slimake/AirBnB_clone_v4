const $ = window.$;
const input = 'input[type=checkbox]';
const checkedCheckboxes = {};
// Function to update the object dict based on checkbox state
function updateCheckedCheckboxes (checkbox) {
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
  $(input).on('change', function () {
    updateCheckedCheckboxes(this);

    const checkboxValues = Object.values(checkedCheckboxes).join(', ');
    $('.amenities h4').text(checkboxValues);
  });

  const url = 'http://localhost:5001/api/v1';
  $.get(`${url}/status`, function (data, textStatus) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: `${url}/places_search`,
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      data.forEach(place => {
        const article = $('<article></article>');

        $('section.places').append(article);

        const titleBox = $('<div></div>').addClass('title_box');
        article.append(titleBox);
        titleBox.append($('<h2></h2>').text(place.name));
        titleBox.append($('<div></div>').addClass('price_by_night').text(`$${place.price_by_night}`));

        const information = $('<div></div>').addClass('information');
        article.append(information);
        information.append($('<div></div>').addClass('max_guest').text(`${place.max_guest} Guests`));
        information.append($('<div></div>').addClass('number_rooms').text(`${place.number_rooms} Bedrooms`));
        information.append($('<div></div>').addClass('number_bathrooms').text(`${place.number_bathrooms} Bathrooms`));

        const description = $('<div></div>').addClass('description').text(place.description);
        article.append(description);
      });
    }
  });
});
