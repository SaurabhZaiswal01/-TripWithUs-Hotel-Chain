const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const hotels = require('./hotels.js');
const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// Q1 Get the hotels sorted by pricing
app.get('/hotels/sort/pricing', (request, response) => {
  let sortedHotels = [...hotels];
  const { pricing } = request.query;

  if (pricing == 'low-to-high') {
    sortedHotels.sort((a, b) => a.price - b.price);
  } else if (pricing == 'high to low') {
    sortedHotels.sort((a, b) => b.price - a.price);
  }
  let result = sortedHotels;

  response.json({ hotels: result });
});

// Q2 Get the hotels sorted based on their Ratings
app.get('/hotels/sort/rating', (request, response) => {
  let sortedHotels = [...hotels];
  const { rating } = request.query;

  if (rating == 'low-to-high') {
    sortedHotels.sort((a, b) => a.rating - b.rating);
  } else if (rating == 'high to low') {
    sortedHotels.sort((a, b) => b.rating - a.rating);
  }
  let result = sortedHotels;

  response.json({ hotels: result });
});

// Q3 Get the Hotels sorted based on their Reviews
app.get('/hotels/sort/reviews', (request, response) => {
  let sortedHotels = [...hotels];
  const { reviews } = request.query;

  if (reviews == 'least-to-most') {
    sortedHotels.sort((a, b) => a.reviews - b.reviews);
  } else if (reviews == 'most-to-least') {
    sortedHotels.sort((a, b) => b.reviews - a.reviews);
  }
  let result = sortedHotels;

  response.json({ hotels: result });
});

// Q4 Filter the hotels based on the Hotel Amenity
function filterByAmenity(hotels, amenity) {
  return hotels.filter(
    (item) => item.amenity.toLowerCase() === amenity.toLowerCase()
  );
}
app.get('/hotels/filter/amenity', (request, response) => {
  const { amenity } = request.query;

  let result = filterByAmenity(hotels, amenity);

  response.json({ hotels: result });
});

// Q5 Filter the hotels based on the selected Country
function filterByCountry(hotels, country) {
  return hotels.filter(
    (item) => item.country.toLowerCase() === country.toLowerCase()
  );
}
app.get('/hotels/filter/country', (request, response) => {
  const { country } = request.query;

  let result = filterByCountry(hotels, country);

  response.json({ hotels: result });
});

// Q6 Filter the hotels based on the selected Category
function filterByCategory(hotels, category) {
  return hotels.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
}
app.get('/hotels/filter/category', (request, response) => {
  const { category } = request.query;

  let result = filterByCategory(hotels, category);

  response.json({ hotels: result });
});

// Q7 Send all hotels
app.get('/hotels', (request, response) => {
  let result = hotels;

  response.json({ hotels: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
