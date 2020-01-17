const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);

// });

// fetchCoordsByIP("66.207.199.230", (error, data) => {
// console.log("Data", data);
// console.log("Error", error);
// });

// const examCoords = { latitude: "49.27670", longitude: "-123.13000" };

// fetchISSFlyOverTimes(examCoords, (error, times) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Return:", times);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
