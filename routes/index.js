var express = require("express");
var router = express.Router();
var axios = require("axios").default;
var fs = require('fs');

let December_February_High_C = 0;
let December_February_High_F = 0;
let December_February_Low_C = 0;
let December_February_Low_F = 0;
let March_May_High_C = 0;
let March_May_High_F = 0;
let March_May_Low_C = 0;
let March_May_Low_F = 0;
let June_August_High_C = 0;
let June_August_High_F = 0;
let June_August_Low_C = 0;
let June_August_Low_F = 0;
let September_November_High_C = 0;
let September_November_High_F = 0;
let September_November_Low_C = 0;
let September_November_Low_F = 0;

let d_1 = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
let date_1 = d_1.getFullYear().toString() + "-" + (d_1.getMonth() + 1).toString() + "-" + d_1.getDate().toString();

let d_2 = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
let date_2 = d_2.getFullYear().toString() + "-" + (d_2.getMonth() + 1).toString() + "-" + d_2.getDate().toString();



router.get("/all/:country", function (req, res, next) {

  let country = req.params.country.toLowerCase();

  fs.readFile('country.txt', 'utf8', function (err, data) {
    if (data.length != 0) {
      let country_Array = data.substring(0, data.length - 1).split("-");
      let flag = 0;
      for (let i in country_Array) {
        if (country_Array[i].localeCompare(country) == 0) {
          fs.readFile("json_info_files_country/" + country + '.json', 'utf8', function (err, data) {
            let jsObject = JSON.parse(data);
            let searching_time = jsObject.location.localtime;

            let forecast_object = jsObject.forecast.forecastday;
            for (let i in forecast_object) {

              let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
              let max_temperature_in_f = forecast_object[i].day.maxtemp_f;

              let min_temperature_in_c = forecast_object[i].day.mintemp_c;
              let min_temperature_in_f = forecast_object[i].day.mintemp_f;
              // Partitioning for four section

              // Section-1 December to February(Day-1)
              if (i == 0) {
                December_February_High_C = max_temperature_in_c;
                December_February_High_F = max_temperature_in_f;
                December_February_Low_C = min_temperature_in_c;
                December_February_Low_F = min_temperature_in_f;
              }
              // Section-2 March to May(Day-2 & Day-3)
              else if (i >= 1 && i <= 2) {
                March_May_High_C += max_temperature_in_c;
                March_May_High_F += max_temperature_in_f;
                March_May_Low_C += min_temperature_in_c;
                March_May_Low_F += min_temperature_in_f;
              }
              // Section-3 June to August(Day-4 & Day-5)
              else if (i >= 3 && i <= 4) {
                June_August_High_C += max_temperature_in_c;
                June_August_High_F += max_temperature_in_f;
                June_August_Low_C += min_temperature_in_c;
                June_August_Low_F += min_temperature_in_f;
              }
              // Section-4 September to November(Day-6 & Day-7)
              else {
                September_November_High_C += max_temperature_in_c;
                September_November_High_F += max_temperature_in_f;
                September_November_Low_C += min_temperature_in_c;
                September_November_Low_F += min_temperature_in_f;
              }
            }
            March_May_High_C = March_May_High_C / 2;
            March_May_High_F = March_May_High_F / 2;
            March_May_Low_C = March_May_Low_C / 2;
            March_May_Low_F = March_May_Low_F / 2;

            June_August_High_C = June_August_High_C / 2;
            June_August_High_F = June_August_High_F / 2;
            June_August_Low_C = June_August_Low_C / 2;
            June_August_Low_F = June_August_Low_F / 2;

            September_November_High_C = September_November_High_C / 2;
            September_November_High_F = September_November_High_F / 2;
            September_November_Low_C = September_November_Low_C / 2;
            September_November_Low_F = September_November_Low_F / 2;

            let dfhc = December_February_High_C;
            let dfhf = December_February_High_F;
            let dflc = December_February_Low_C;
            let dflf = December_February_Low_F;
            let mmhc = March_May_High_C;
            let mmhf = March_May_High_F;
            let mmlc = March_May_Low_C;
            let mmlf = March_May_Low_F;
            let jahc = June_August_High_C;
            let jahf = June_August_High_F;
            let jalc = June_August_Low_C;
            let jalf = June_August_Low_F;
            let snhc = September_November_High_C;
            let snhf = September_November_High_F;
            let snlc = September_November_Low_C;
            let snlf = September_November_Low_F;

            let capitalize_country = String.fromCharCode(country[0].charCodeAt() - 32).concat(country.substring(1, country.length));
            res.render('index', {
              title: capitalize_country,
              statement_1: "Weather in " + capitalize_country,
              statement_2: "View the weather forecast for " + capitalize_country + " vacation rental to confirm your best time to global.",

              December_February_High_C: two_digit_after_point(dfhc).toString(),
              December_February_High_F: two_digit_after_point(dfhf).toString(),
              December_February_Low_C: two_digit_after_point(dflc).toString(),
              December_February_Low_F: two_digit_after_point(dflf).toString(),
              March_May_High_C: two_digit_after_point(mmhc).toString(),
              March_May_High_F: two_digit_after_point(mmhf).toString(),
              March_May_Low_C: two_digit_after_point(mmlc).toString(),
              March_May_Low_F: two_digit_after_point(mmlf).toString(),
              June_August_High_C: two_digit_after_point(jahc).toString(),
              June_August_High_F: two_digit_after_point(jahf).toString(),
              June_August_Low_C: two_digit_after_point(jalc).toString(),
              June_August_Low_F: two_digit_after_point(jalf).toString(),
              September_November_High_C: two_digit_after_point(snhc).toString(),
              September_November_High_F: two_digit_after_point(snhf).toString(),
              September_November_Low_C: two_digit_after_point(snlc).toString(),
              September_November_Low_F: two_digit_after_point(snlf).toString(),

              searching_time: "Your Searching Time: " + searching_time.toString()
            });
          });

          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        axios
          .get("https://api.weatherapi.com/v1/history.json?key=353c28eb27db4f278e481755213112&q=" + country + "&dt=" + date_1 + "&end_dt=" + date_2 + "&aqi=yes")
          .then((response) => {

            let da_ta = response.data;
            let jsonObject = JSON.stringify(da_ta);
            let jsObject = JSON.parse(jsonObject);

            if (country.localeCompare(jsObject.location.country.toLowerCase()) == 0) {
              let searching_time = jsObject.location.localtime;

              let buffer_1 = new Buffer.from(country + "-");
              fs.open('country.txt', 'a', function (err, fd) {
                if (err) {
                  console.log('Cant open file');
                } else {
                  fs.write(fd, buffer_1, 0, buffer_1.length,
                    null, function (err, writtenbytes) {
                      if (err) {
                        console.log('Cant write to file');
                      } else {
                        console.log(writtenbytes + ' characters added to file');
                      }
                    })
                }
              })

              var path = "json_info_files_country/" + country + '.json';
              let buffer_2 = new Buffer.from(jsonObject);
              fs.open(path, 'a', function (err, fd) {
                if (err) {
                  console.log('Cant open file');
                } else {
                  fs.write(fd, buffer_2, 0, buffer_2.length,
                    null, function (err, writtenbytes) {
                      if (err) {
                        console.log('Cant write to file');
                      } else {
                        console.log(writtenbytes + ' characters added to file');
                      }
                    })
                }
              })
              let forecast_object = jsObject.forecast.forecastday;
              for (let i in forecast_object) {

                let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
                let max_temperature_in_f = forecast_object[i].day.maxtemp_f;

                let min_temperature_in_c = forecast_object[i].day.mintemp_c;
                let min_temperature_in_f = forecast_object[i].day.mintemp_f;
                // Partitioning for four section

                // Section-1 December to February(Day-1)
                if (i == 0) {
                  December_February_High_C = max_temperature_in_c;
                  December_February_High_F = max_temperature_in_f;
                  December_February_Low_C = min_temperature_in_c;
                  December_February_Low_F = min_temperature_in_f;
                }
                // Section-2 March to May(Day-2 & Day-3)
                else if (i >= 1 && i <= 2) {
                  March_May_High_C += max_temperature_in_c;
                  March_May_High_F += max_temperature_in_f;
                  March_May_Low_C += min_temperature_in_c;
                  March_May_Low_F += min_temperature_in_f;
                }
                // Section-3 June to August(Day-4 & Day-5)
                else if (i >= 3 && i <= 4) {
                  June_August_High_C += max_temperature_in_c;
                  June_August_High_F += max_temperature_in_f;
                  June_August_Low_C += min_temperature_in_c;
                  June_August_Low_F += min_temperature_in_f;
                }
                // Section-4 September to November(Day-6 & Day-7)
                else {
                  September_November_High_C += max_temperature_in_c;
                  September_November_High_F += max_temperature_in_f;
                  September_November_Low_C += min_temperature_in_c;
                  September_November_Low_F += min_temperature_in_f;
                }
              }
              March_May_High_C = March_May_High_C / 2;
              March_May_High_F = March_May_High_F / 2;
              March_May_Low_C = March_May_Low_C / 2;
              March_May_Low_F = March_May_Low_F / 2;

              June_August_High_C = June_August_High_C / 2;
              June_August_High_F = June_August_High_F / 2;
              June_August_Low_C = June_August_Low_C / 2;
              June_August_Low_F = June_August_Low_F / 2;

              September_November_High_C = September_November_High_C / 2;
              September_November_High_F = September_November_High_F / 2;
              September_November_Low_C = September_November_Low_C / 2;
              September_November_Low_F = September_November_Low_F / 2;

              let dfhc = December_February_High_C;
              let dfhf = December_February_High_F;
              let dflc = December_February_Low_C;
              let dflf = December_February_Low_F;
              let mmhc = March_May_High_C;
              let mmhf = March_May_High_F;
              let mmlc = March_May_Low_C;
              let mmlf = March_May_Low_F;
              let jahc = June_August_High_C;
              let jahf = June_August_High_F;
              let jalc = June_August_Low_C;
              let jalf = June_August_Low_F;
              let snhc = September_November_High_C;
              let snhf = September_November_High_F;
              let snlc = September_November_Low_C;
              let snlf = September_November_Low_F;

              let capitalize_country = String.fromCharCode(country[0].charCodeAt() - 32).concat(country.substring(1, country.length));
              res.render('index', {
                title: capitalize_country,
                statement_1: "Weather in " + capitalize_country,
                statement_2: "View the weather forecast for " + capitalize_country + " vacation rental to confirm your best time to global.",

                December_February_High_C: two_digit_after_point(dfhc).toString(),
                December_February_High_F: two_digit_after_point(dfhf).toString(),
                December_February_Low_C: two_digit_after_point(dflc).toString(),
                December_February_Low_F: two_digit_after_point(dflf).toString(),
                March_May_High_C: two_digit_after_point(mmhc).toString(),
                March_May_High_F: two_digit_after_point(mmhf).toString(),
                March_May_Low_C: two_digit_after_point(mmlc).toString(),
                March_May_Low_F: two_digit_after_point(mmlf).toString(),
                June_August_High_C: two_digit_after_point(jahc).toString(),
                June_August_High_F: two_digit_after_point(jahf).toString(),
                June_August_Low_C: two_digit_after_point(jalc).toString(),
                June_August_Low_F: two_digit_after_point(jalf).toString(),
                September_November_High_C: two_digit_after_point(snhc).toString(),
                September_November_High_F: two_digit_after_point(snhf).toString(),
                September_November_Low_C: two_digit_after_point(snlc).toString(),
                September_November_Low_F: two_digit_after_point(snlf).toString(),

                searching_time: "Your Searching Time: " + searching_time.toString()
              });
            }
            else {
              res.render('invalid-url', { title: 'Invalid URL' });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    else {
      axios
        .get("https://api.weatherapi.com/v1/history.json?key=353c28eb27db4f278e481755213112&q=" + country + "&dt=" + date_1 + "&end_dt=" + date_2 + "&aqi=yes")
        .then((response) => {
          let jsonObject = JSON.stringify(response.data);
          let jsObject = JSON.parse(jsonObject);

          if (country.localeCompare(jsObject.location.country.toLowerCase()) == 0) {
            let searching_time = jsObject.location.localtime;
            let buffer_1 = new Buffer.from(country + "-");
            fs.open('country.txt', 'a', function (err, fd) {
              if (err) {
                console.log('Cant open file');
              } else {
                fs.write(fd, buffer_1, 0, buffer_1.length,
                  null, function (err, writtenbytes) {
                    if (err) {
                      console.log('Cant write to file');
                    } else {
                      console.log(writtenbytes + ' characters added to file');
                    }
                  })
              }
            })

            var path = "json_info_files_country/" + country + '.json';
            let buffer_2 = new Buffer.from(jsonObject);
            fs.open(path, 'a', function (err, fd) {
              if (err) {
                console.log('Cant open file');
              } else {
                fs.write(fd, buffer_2, 0, buffer_2.length,
                  null, function (err, writtenbytes) {
                    if (err) {
                      console.log('Cant write to file');
                    } else {
                      console.log(writtenbytes + ' characters added to file');
                    }
                  })
              }
            })

            let forecast_object = jsObject.forecast.forecastday;
            for (let i in forecast_object) {

              let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
              let max_temperature_in_f = forecast_object[i].day.maxtemp_f;

              let min_temperature_in_c = forecast_object[i].day.mintemp_c;
              let min_temperature_in_f = forecast_object[i].day.mintemp_f;
              // Partitioning for four section

              // Section-1 December to February(Day-1)
              if (i == 0) {
                December_February_High_C = max_temperature_in_c;
                December_February_High_F = max_temperature_in_f;
                December_February_Low_C = min_temperature_in_c;
                December_February_Low_F = min_temperature_in_f;
              }
              // Section-2 March to May(Day-2 & Day-3)
              else if (i >= 1 && i <= 2) {
                March_May_High_C += max_temperature_in_c;
                March_May_High_F += max_temperature_in_f;
                March_May_Low_C += min_temperature_in_c;
                March_May_Low_F += min_temperature_in_f;
              }
              // Section-3 June to August(Day-4 & Day-5)
              else if (i >= 3 && i <= 4) {
                June_August_High_C += max_temperature_in_c;
                June_August_High_F += max_temperature_in_f;
                June_August_Low_C += min_temperature_in_c;
                June_August_Low_F += min_temperature_in_f;
              }
              // Section-4 September to November(Day-6 & Day-7)
              else {
                September_November_High_C += max_temperature_in_c;
                September_November_High_F += max_temperature_in_f;
                September_November_Low_C += min_temperature_in_c;
                September_November_Low_F += min_temperature_in_f;
              }
            }
            March_May_High_C = March_May_High_C / 2;
            March_May_High_F = March_May_High_F / 2;
            March_May_Low_C = March_May_Low_C / 2;
            March_May_Low_F = March_May_Low_F / 2;

            June_August_High_C = June_August_High_C / 2;
            June_August_High_F = June_August_High_F / 2;
            June_August_Low_C = June_August_Low_C / 2;
            June_August_Low_F = June_August_Low_F / 2;

            September_November_High_C = September_November_High_C / 2;
            September_November_High_F = September_November_High_F / 2;
            September_November_Low_C = September_November_Low_C / 2;
            September_November_Low_F = September_November_Low_F / 2;

            let dfhc = December_February_High_C;
            let dfhf = December_February_High_F;
            let dflc = December_February_Low_C;
            let dflf = December_February_Low_F;
            let mmhc = March_May_High_C;
            let mmhf = March_May_High_F;
            let mmlc = March_May_Low_C;
            let mmlf = March_May_Low_F;
            let jahc = June_August_High_C;
            let jahf = June_August_High_F;
            let jalc = June_August_Low_C;
            let jalf = June_August_Low_F;
            let snhc = September_November_High_C;
            let snhf = September_November_High_F;
            let snlc = September_November_Low_C;
            let snlf = September_November_Low_F;

            let capitalize_country = String.fromCharCode(country[0].charCodeAt() - 32).concat(country.substring(1, country.length));
            res.render('index', {
              title: capitalize_country,
              statement_1: "Weather in " + capitalize_country,
              statement_2: "View the weather forecast for " + capitalize_country + " vacation rental to confirm your best time to global.",

              December_February_High_C: two_digit_after_point(dfhc).toString(),
              December_February_High_F: two_digit_after_point(dfhf).toString(),
              December_February_Low_C: two_digit_after_point(dflc).toString(),
              December_February_Low_F: two_digit_after_point(dflf).toString(),
              March_May_High_C: two_digit_after_point(mmhc).toString(),
              March_May_High_F: two_digit_after_point(mmhf).toString(),
              March_May_Low_C: two_digit_after_point(mmlc).toString(),
              March_May_Low_F: two_digit_after_point(mmlf).toString(),
              June_August_High_C: two_digit_after_point(jahc).toString(),
              June_August_High_F: two_digit_after_point(jahf).toString(),
              June_August_Low_C: two_digit_after_point(jalc).toString(),
              June_August_Low_F: two_digit_after_point(jalf).toString(),
              September_November_High_C: two_digit_after_point(snhc).toString(),
              September_November_High_F: two_digit_after_point(snhf).toString(),
              September_November_Low_C: two_digit_after_point(snlc).toString(),
              September_November_Low_F: two_digit_after_point(snlf).toString(),

              searching_time: "Your Searching Time: " + searching_time.toString()
            });
          }
          else {
            res.render('invalid-url', { title: 'Invalid URL' });
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

});


router.get("/all/:country/:city", function (req, res, next) {

  let country = req.params.country.toLowerCase();
  let city = req.params.city.toLowerCase();

  fs.readFile('country_city.txt', 'utf8', function (err, data) {
    if (data.length != 0) {
      let country_city_Array = data.substring(0, data.length - 1).split("-");
      let flag = 0;
      for (let i in country_city_Array) {
        if (country_city_Array[i].localeCompare(country + "_" + city) == 0) {
          fs.readFile("json_info_files_country_city/" + country + "_" + city + '.json', 'utf8', function (err, data) {
            let jsObject = JSON.parse(data);
            let searching_time = jsObject.location.localtime;

            let forecast_object = jsObject.forecast.forecastday;
            for (let i in forecast_object) {

              let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
              let max_temperature_in_f = forecast_object[i].day.maxtemp_f;

              let min_temperature_in_c = forecast_object[i].day.mintemp_c;
              let min_temperature_in_f = forecast_object[i].day.mintemp_f;
              // Partitioning for four section

              // Section-1 December to February(Day-1)
              if (i == 0) {
                December_February_High_C = max_temperature_in_c;
                December_February_High_F = max_temperature_in_f;
                December_February_Low_C = min_temperature_in_c;
                December_February_Low_F = min_temperature_in_f;
              }
              // Section-2 March to May(Day-2 & Day-3)
              else if (i >= 1 && i <= 2) {
                March_May_High_C += max_temperature_in_c;
                March_May_High_F += max_temperature_in_f;
                March_May_Low_C += min_temperature_in_c;
                March_May_Low_F += min_temperature_in_f;
              }
              // Section-3 June to August(Day-4 & Day-5)
              else if (i >= 3 && i <= 4) {
                June_August_High_C += max_temperature_in_c;
                June_August_High_F += max_temperature_in_f;
                June_August_Low_C += min_temperature_in_c;
                June_August_Low_F += min_temperature_in_f;
              }
              // Section-4 September to November(Day-6 & Day-7)
              else {
                September_November_High_C += max_temperature_in_c;
                September_November_High_F += max_temperature_in_f;
                September_November_Low_C += min_temperature_in_c;
                September_November_Low_F += min_temperature_in_f;
              }
            }
            March_May_High_C = March_May_High_C / 2;
            March_May_High_F = March_May_High_F / 2;
            March_May_Low_C = March_May_Low_C / 2;
            March_May_Low_F = March_May_Low_F / 2;

            June_August_High_C = June_August_High_C / 2;
            June_August_High_F = June_August_High_F / 2;
            June_August_Low_C = June_August_Low_C / 2;
            June_August_Low_F = June_August_Low_F / 2;

            September_November_High_C = September_November_High_C / 2;
            September_November_High_F = September_November_High_F / 2;
            September_November_Low_C = September_November_Low_C / 2;
            September_November_Low_F = September_November_Low_F / 2;

            let dfhc = December_February_High_C;
            let dfhf = December_February_High_F;
            let dflc = December_February_Low_C;
            let dflf = December_February_Low_F;
            let mmhc = March_May_High_C;
            let mmhf = March_May_High_F;
            let mmlc = March_May_Low_C;
            let mmlf = March_May_Low_F;
            let jahc = June_August_High_C;
            let jahf = June_August_High_F;
            let jalc = June_August_Low_C;
            let jalf = June_August_Low_F;
            let snhc = September_November_High_C;
            let snhf = September_November_High_F;
            let snlc = September_November_Low_C;
            let snlf = September_November_Low_F;

            let capitalize_country = String.fromCharCode(country[0].charCodeAt() - 32).concat(country.substring(1, country.length));
            let capitalize_city = String.fromCharCode(city[0].charCodeAt() - 32).concat(city.substring(1, city.length));
            res.render('index', {
              title: capitalize_country + ", " + capitalize_city,
              statement_1: "Weather in " + capitalize_city + ", " + capitalize_country,
              statement_2: "View the weather forecast for " + capitalize_country + " before booking your " + capitalize_country + " vacation rental to confirm your best time to global.",

              December_February_High_C: two_digit_after_point(dfhc).toString(),
              December_February_High_F: two_digit_after_point(dfhf).toString(),
              December_February_Low_C: two_digit_after_point(dflc).toString(),
              December_February_Low_F: two_digit_after_point(dflf).toString(),
              March_May_High_C: two_digit_after_point(mmhc).toString(),
              March_May_High_F: two_digit_after_point(mmhf).toString(),
              March_May_Low_C: two_digit_after_point(mmlc).toString(),
              March_May_Low_F: two_digit_after_point(mmlf).toString(),
              June_August_High_C: two_digit_after_point(jahc).toString(),
              June_August_High_F: two_digit_after_point(jahf).toString(),
              June_August_Low_C: two_digit_after_point(jalc).toString(),
              June_August_Low_F: two_digit_after_point(jalf).toString(),
              September_November_High_C: two_digit_after_point(snhc).toString(),
              September_November_High_F: two_digit_after_point(snhf).toString(),
              September_November_Low_C: two_digit_after_point(snlc).toString(),
              September_November_Low_F: two_digit_after_point(snlf).toString(),

              searching_time: "Your Searching Time: " + searching_time.toString()
            });
          });

          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        axios
          .get("https://api.weatherapi.com/v1/history.json?key=353c28eb27db4f278e481755213112&q=" + country + "&q=" + city + "&dt=" + date_1 + "&end_dt=" + date_2 + "&aqi=yes")
          .then((response) => {

            let da_ta = response.data;
            let jsonObject = JSON.stringify(da_ta);
            let jsObject = JSON.parse(jsonObject);

            if (Math.abs(city.localeCompare(jsObject.location.name.toLowerCase())) + Math.abs(country.localeCompare(jsObject.location.country.toLowerCase())) == 0) {
              let searching_time = jsObject.location.localtime;

              let buffer_1 = new Buffer.from(country + "_" + city + "-");
              fs.open('country_city.txt', 'a', function (err, fd) {
                if (err) {
                  console.log('Cant open file');
                } else {
                  fs.write(fd, buffer_1, 0, buffer_1.length,
                    null, function (err, writtenbytes) {
                      if (err) {
                        console.log('Cant write to file');
                      } else {
                        console.log(writtenbytes + ' characters added to file');
                      }
                    })
                }
              })

              var path = "json_info_files_country_city/" + country + "_" + city + '.json';
              let buffer_2 = new Buffer.from(jsonObject);
              fs.open(path, 'a', function (err, fd) {
                if (err) {
                  console.log('Cant open file');
                } else {
                  fs.write(fd, buffer_2, 0, buffer_2.length,
                    null, function (err, writtenbytes) {
                      if (err) {
                        console.log('Cant write to file');
                      } else {
                        console.log(writtenbytes + ' characters added to file');
                      }
                    })
                }
              })
              let forecast_object = jsObject.forecast.forecastday;
              for (let i in forecast_object) {

                let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
                let max_temperature_in_f = forecast_object[i].day.maxtemp_f;

                let min_temperature_in_c = forecast_object[i].day.mintemp_c;
                let min_temperature_in_f = forecast_object[i].day.mintemp_f;
                // Partitioning for four section

                // Section-1 December to February(Day-1)
                if (i == 0) {
                  December_February_High_C = max_temperature_in_c;
                  December_February_High_F = max_temperature_in_f;
                  December_February_Low_C = min_temperature_in_c;
                  December_February_Low_F = min_temperature_in_f;
                }
                // Section-2 March to May(Day-2 & Day-3)
                else if (i >= 1 && i <= 2) {
                  March_May_High_C += max_temperature_in_c;
                  March_May_High_F += max_temperature_in_f;
                  March_May_Low_C += min_temperature_in_c;
                  March_May_Low_F += min_temperature_in_f;
                }
                // Section-3 June to August(Day-4 & Day-5)
                else if (i >= 3 && i <= 4) {
                  June_August_High_C += max_temperature_in_c;
                  June_August_High_F += max_temperature_in_f;
                  June_August_Low_C += min_temperature_in_c;
                  June_August_Low_F += min_temperature_in_f;
                }
                // Section-4 September to November(Day-6 & Day-7)
                else {
                  September_November_High_C += max_temperature_in_c;
                  September_November_High_F += max_temperature_in_f;
                  September_November_Low_C += min_temperature_in_c;
                  September_November_Low_F += min_temperature_in_f;
                }
              }
              March_May_High_C = March_May_High_C / 2;
              March_May_High_F = March_May_High_F / 2;
              March_May_Low_C = March_May_Low_C / 2;
              March_May_Low_F = March_May_Low_F / 2;

              June_August_High_C = June_August_High_C / 2;
              June_August_High_F = June_August_High_F / 2;
              June_August_Low_C = June_August_Low_C / 2;
              June_August_Low_F = June_August_Low_F / 2;

              September_November_High_C = September_November_High_C / 2;
              September_November_High_F = September_November_High_F / 2;
              September_November_Low_C = September_November_Low_C / 2;
              September_November_Low_F = September_November_Low_F / 2;

              let dfhc = December_February_High_C;
              let dfhf = December_February_High_F;
              let dflc = December_February_Low_C;
              let dflf = December_February_Low_F;
              let mmhc = March_May_High_C;
              let mmhf = March_May_High_F;
              let mmlc = March_May_Low_C;
              let mmlf = March_May_Low_F;
              let jahc = June_August_High_C;
              let jahf = June_August_High_F;
              let jalc = June_August_Low_C;
              let jalf = June_August_Low_F;
              let snhc = September_November_High_C;
              let snhf = September_November_High_F;
              let snlc = September_November_Low_C;
              let snlf = September_November_Low_F;

              let capitalize_country = String.fromCharCode(country[0].charCodeAt() - 32).concat(country.substring(1, country.length));
              let capitalize_city = String.fromCharCode(city[0].charCodeAt() - 32).concat(city.substring(1, city.length));
              res.render('index', {
                title: capitalize_country + ", " + capitalize_city,
                statement_1: "Weather in " + capitalize_city + ", " + capitalize_country,
                statement_2: "View the weather forecast for " + capitalize_country + " before booking your " + capitalize_country + " vacation rental to confirm your best time to global.",

                December_February_High_C: two_digit_after_point(dfhc).toString(),
                December_February_High_F: two_digit_after_point(dfhf).toString(),
                December_February_Low_C: two_digit_after_point(dflc).toString(),
                December_February_Low_F: two_digit_after_point(dflf).toString(),
                March_May_High_C: two_digit_after_point(mmhc).toString(),
                March_May_High_F: two_digit_after_point(mmhf).toString(),
                March_May_Low_C: two_digit_after_point(mmlc).toString(),
                March_May_Low_F: two_digit_after_point(mmlf).toString(),
                June_August_High_C: two_digit_after_point(jahc).toString(),
                June_August_High_F: two_digit_after_point(jahf).toString(),
                June_August_Low_C: two_digit_after_point(jalc).toString(),
                June_August_Low_F: two_digit_after_point(jalf).toString(),
                September_November_High_C: two_digit_after_point(snhc).toString(),
                September_November_High_F: two_digit_after_point(snhf).toString(),
                September_November_Low_C: two_digit_after_point(snlc).toString(),
                September_November_Low_F: two_digit_after_point(snlf).toString(),

                searching_time: "Your Searching Time: " + searching_time.toString()
              });
            }
            else {
              res.render('invalid-url', { title: 'Invalid URL' });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    else {
      axios
        .get("https://api.weatherapi.com/v1/history.json?key=353c28eb27db4f278e481755213112&q=" + country + "&q=" + city + "&dt=" + date_1 + "&end_dt=" + date_2 + "&aqi=yes")
        .then((response) => {
          let jsonObject = JSON.stringify(response.data);
          let jsObject = JSON.parse(jsonObject);

          if (Math.abs(city.localeCompare(jsObject.location.name.toLowerCase())) + Math.abs(country.localeCompare(jsObject.location.country.toLowerCase())) == 0) {
            let searching_time = jsObject.location.localtime;
            let buffer_1 = new Buffer.from(country + "_" + city + "-");
            fs.open('country_city.txt', 'a', function (err, fd) {
              if (err) {
                console.log('Cant open file');
              } else {
                fs.write(fd, buffer_1, 0, buffer_1.length,
                  null, function (err, writtenbytes) {
                    if (err) {
                      console.log('Cant write to file');
                    } else {
                      console.log(writtenbytes + ' characters added to file');
                    }
                  })
              }
            })

            var path = "json_info_files_country_city/" + country + "_" + city + '.json';
            let buffer_2 = new Buffer.from(jsonObject);
            fs.open(path, 'a', function (err, fd) {
              if (err) {
                console.log('Cant open file');
              } else {
                fs.write(fd, buffer_2, 0, buffer_2.length,
                  null, function (err, writtenbytes) {
                    if (err) {
                      console.log('Cant write to file');
                    } else {
                      console.log(writtenbytes + ' characters added to file');
                    }
                  })
              }
            })

            let forecast_object = jsObject.forecast.forecastday;
            for (let i in forecast_object) {

              let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
              let max_temperature_in_f = forecast_object[i].day.maxtemp_f;

              let min_temperature_in_c = forecast_object[i].day.mintemp_c;
              let min_temperature_in_f = forecast_object[i].day.mintemp_f;
              // Partitioning for four section

              // Section-1 December to February(Day-1)
              if (i == 0) {
                December_February_High_C = max_temperature_in_c;
                December_February_High_F = max_temperature_in_f;
                December_February_Low_C = min_temperature_in_c;
                December_February_Low_F = min_temperature_in_f;
              }
              // Section-2 March to May(Day-2 & Day-3)
              else if (i >= 1 && i <= 2) {
                March_May_High_C += max_temperature_in_c;
                March_May_High_F += max_temperature_in_f;
                March_May_Low_C += min_temperature_in_c;
                March_May_Low_F += min_temperature_in_f;
              }
              // Section-3 June to August(Day-4 & Day-5)
              else if (i >= 3 && i <= 4) {
                June_August_High_C += max_temperature_in_c;
                June_August_High_F += max_temperature_in_f;
                June_August_Low_C += min_temperature_in_c;
                June_August_Low_F += min_temperature_in_f;
              }
              // Section-4 September to November(Day-6 & Day-7)
              else {
                September_November_High_C += max_temperature_in_c;
                September_November_High_F += max_temperature_in_f;
                September_November_Low_C += min_temperature_in_c;
                September_November_Low_F += min_temperature_in_f;
              }
            }
            March_May_High_C = March_May_High_C / 2;
            March_May_High_F = March_May_High_F / 2;
            March_May_Low_C = March_May_Low_C / 2;
            March_May_Low_F = March_May_Low_F / 2;

            June_August_High_C = June_August_High_C / 2;
            June_August_High_F = June_August_High_F / 2;
            June_August_Low_C = June_August_Low_C / 2;
            June_August_Low_F = June_August_Low_F / 2;

            September_November_High_C = September_November_High_C / 2;
            September_November_High_F = September_November_High_F / 2;
            September_November_Low_C = September_November_Low_C / 2;
            September_November_Low_F = September_November_Low_F / 2;

            let dfhc = December_February_High_C;
            let dfhf = December_February_High_F;
            let dflc = December_February_Low_C;
            let dflf = December_February_Low_F;
            let mmhc = March_May_High_C;
            let mmhf = March_May_High_F;
            let mmlc = March_May_Low_C;
            let mmlf = March_May_Low_F;
            let jahc = June_August_High_C;
            let jahf = June_August_High_F;
            let jalc = June_August_Low_C;
            let jalf = June_August_Low_F;
            let snhc = September_November_High_C;
            let snhf = September_November_High_F;
            let snlc = September_November_Low_C;
            let snlf = September_November_Low_F;

            let capitalize_country = String.fromCharCode(country[0].charCodeAt() - 32).concat(country.substring(1, country.length));
            let capitalize_city = String.fromCharCode(city[0].charCodeAt() - 32).concat(city.substring(1, city.length));
            res.render('index', {
              title: capitalize_country + ", " + capitalize_city,
              statement_1: "Weather in " + capitalize_city + ", " + capitalize_country,
              statement_2: "View the weather forecast for " + capitalize_country + " before booking your " + capitalize_country + " vacation rental to confirm your best time to global.",

              December_February_High_C: two_digit_after_point(dfhc).toString(),
              December_February_High_F: two_digit_after_point(dfhf).toString(),
              December_February_Low_C: two_digit_after_point(dflc).toString(),
              December_February_Low_F: two_digit_after_point(dflf).toString(),
              March_May_High_C: two_digit_after_point(mmhc).toString(),
              March_May_High_F: two_digit_after_point(mmhf).toString(),
              March_May_Low_C: two_digit_after_point(mmlc).toString(),
              March_May_Low_F: two_digit_after_point(mmlf).toString(),
              June_August_High_C: two_digit_after_point(jahc).toString(),
              June_August_High_F: two_digit_after_point(jahf).toString(),
              June_August_Low_C: two_digit_after_point(jalc).toString(),
              June_August_Low_F: two_digit_after_point(jalf).toString(),
              September_November_High_C: two_digit_after_point(snhc).toString(),
              September_November_High_F: two_digit_after_point(snhf).toString(),
              September_November_Low_C: two_digit_after_point(snlc).toString(),
              September_November_Low_F: two_digit_after_point(snlf).toString(),

              searching_time: "Your Searching Time: " + searching_time.toString()
            });
          }
          else {
            res.render('invalid-url', { title: 'Invalid URL' });
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

});
function two_digit_after_point(num) {
  let chn_num = num * 1.000000001;
  return chn_num.toString().split('.')[0] + "." + chn_num.toString().split('.')[1].substring(0, 2);
}

module.exports = router;