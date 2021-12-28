var express = require("express");
var router = express.Router();
var axios = require("axios").default;
/* GET home page. */
// router.get("/", function (req, res, next) {
//   var country = "Bangladesh";
//   var city = "Dhaka";
//   axios
//     .get(
//       "http://api.weatherapi.com/v1/current.json?key=24fd1c53215c4f9dbc195356212812&q=" +
//         country +
//         "&q=" +
//         city +
//         "&aqi=no"
//     )
//     .then((response) => {
//       console.log(response.data);
//       console.log(response.data);
//       var jsonObject = JSON.stringify(response.data);
//       console.log(jsonObject);
//       var object = JSON.parse(jsonObject);

//       console.log(object.keys);

//       // for (x in object) {
//       //   res.render("index", { title: object[x].name, test: object[x].country });
//       //   // res.render("index", { title: object[x].country });
//       // }
//       // for (x in object) {
//       res.render("index", { title: object.current.cloud });
//       //}

//       // res.render("index", { title: "" + Object.keys(object) });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get("/all/:country/:city", function (req, res, next) {
  var country = req.params.country;
  var city = req.params.city;
  axios
    .get(
      "http://api.weatherapi.com/v1/current.json?key=24fd1c53215c4f9dbc195356212812&q=" +
        country +
        "&q=" +
        city +
        "&aqi=no"
    )
    .then((response) => {
      console.log(response.data);
      console.log(response.data);
      var jsonObject = JSON.stringify(response.data);
      console.log(jsonObject);
      var object = JSON.parse(jsonObject);

      console.log(object.keys);

      // for (x in object) {
      //   res.render("index", { title: object[x].name, test: object[x].country });
      //   // res.render("index", { title: object[x].country });
      // }
      // for (x in object) {
      res.render("index", { title: object.current.cloud });
      //}

      // res.render("index", { title: "" + Object.keys(object) });
    })
    .catch((error) => {
      console.log(error);
    });
});

// module.exports = app;

module.exports = router;