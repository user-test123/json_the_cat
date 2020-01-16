const request = require("request");

const args = process.argv[2];

const argv = "https://api.thecatapi.com/v1/breeds/search?q=" + args;

request(argv, (error, response, body) => {
  const data = JSON.parse(body);
  console.log(data[0].description);
  console.log(typeof data);
  // console.log(body[2]);

  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
});
