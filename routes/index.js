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

router.get('/', function (req, res, next) {
  res.render('new_index', { sss: 'Express' });
});


router.get("/all/bangladesh/dhaka", function (req, res, next) {

  var country = "bangladesh";
  var city = "dhaka";
  axios
    .get("https://api.weatherapi.com/v1/history.json?key=1025c15bcdb04428906103946212912&q=" + country + "&q=" + city + "&dt=2021-12-25&end_dt=2021-12-26&aqi=yes")
    .then((response) => {

      var da_ta = response.data;
      var jsonObject = JSON.stringify(da_ta);
      var jsObject = JSON.parse(jsonObject);

      var all_keys = Object.keys(jsObject);

      // console.log(jsObject[all_keys[1]].forecastday[0].day.maxtemp_c);  //Single Day Data
      console.log(jsObject);

      console.log(jsObject[all_keys[0]].localtime);
      console.log(jsObject[all_keys[1]].forecastday[0].day.maxtemp_c);
      
      // console.log(jsObject[all_keys[1]].localtime);
      // console.log(jsObject[all_keys[1]].forecastday[1].day.maxtemp_c);

      // console.log(jsObject[all_keys[1]].localtime);
      // console.log(jsObject[all_keys[1]].forecastday[2].day.maxtemp_c);


      console.log(all_keys);
      // let daysWeather = jsObject.forecast.forecastday;
      // daysWeather[0]   First Day
      // daysWeather[0]   Second Day
      // ...........................
      // ...........................
      // ...........................
      // daysWeather[n]   nth Day

      // jsObject.location.name         City
      // jsObject.location.country      Country
      // jsObject.location.localtime    Searching Time

      console.log(jsObject.location.country);


    })
    .catch((error) => {
      console.log(error);
    });
});



// //router.get("/all/:country/:city", function (req, res, next) {


//   router.get("/all/bangladesh/dhaka", function (req, res, next) {
//     // var country = req.params.country;
//     // var city = req.params.city;
//     var country = "bangladesh";
//     var city = "dhaka";
//     axios
//       .get("https://api.weatherapi.com/v1/history.json?key=1025c15bcdb04428906103946212912&q=" + country + "&q=" + city + "&dt=2021-12-27&end_dt=2021-12-28&aqi=yes")
//       .then((response) => {
//         console.log(response.data);
//         // var jsonObject = JSON.stringify(response.data);
//         // console.log(jsonObject);
//         // var object = JSON.parse(jsonObject);

//         // console.log(object.keys);

//         // for (x in object) {
//         //   res.render("index", { title: object[x].name, test: object[x].country });
//         //   // res.render("index", { title: object[x].country });
//         // }
//         // for (x in object) {
//         //    res.render("index", { title: object.current.cloud });
//         //}

//         // res.render("index", { title: "" + Object.keys(object) });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

module.exports = router;