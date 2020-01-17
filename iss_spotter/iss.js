const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //values you return in iss to index have to correspond to the paramterts in the index

    const ip = JSON.parse(body).ip;
    callback(null, ip);

    // const data = JSON.parse(body);

    // console.log(data);
    // console.log("statusCode:", response && response.statusCode);

    // const fetchCoordsByIP = function(ip, callback) {
    //   request("https://api.ipify.org/?format=json", (error, response, body) => {
  });
};

// const fetchCoordsByIP = function(ip, callback) {
//   request("https://ipvigilante.com/" + ip, (error, response, body) => {
//     const coords = JSON.parse(body);
//     // console.log(typof(coords));
//     // console.log(ip, "ggygyg");
//     // console.log(coords);
//     console.log("longitude:", coords.data.longitude);
//     console.log("latitude:", coords.data.latitude);

//     if (error) {
//       return callback(error, null);
//     }

//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     //values you return in iss to index have to correspond to the paramterts in the index

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

const fetchISSFlyOverTimes = function(coords, callback) {
  // const { longitude, latitude } = coords;
  // const longitude = coords.longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passing times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //values you return in iss to index have to correspond to the paramterts in the index

    const time = JSON.parse(body);
    callback(null, time);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, examCoords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(examCoords, (error, nextPasses) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
