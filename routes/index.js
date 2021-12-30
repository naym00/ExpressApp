var express = require("express");
var router = express.Router();
var axios = require("axios").default;
var fs = require('fs');

router.get("/all/:country/:city", function (req, res, next) {

  let country = req.params.country.toLowerCase();
  let city = req.params.city.toLowerCase();

  fs.readFile('country_city.txt', 'utf8', function (err, data) {
    if (data.length != 0) {
      let country_city_Array = data.substring(0, data.length - 1).split("-");
      let flag = 0;
      for (let i in country_city_Array) {
        if (country_city_Array[i].localeCompare(country + "_" + city) == 0) {
          fs.readFile("json_info_files/" + country + "_" + city + '.json', 'utf8', function (err, data) {
            let jsObject = JSON.parse(data);
            let searching_time = jsObject.location.localtime;

            let December_February_High = 0;
            let December_February_Low = 0;
            let March_May_High = 0;
            let March_May_Low = 0;
            let June_August_High = 0;
            let June_August_Low = 0;
            let September_November_High = 0;
            let September_November_Low = 0;

            let forecast_object = jsObject.forecast.forecastday;
            for (let i in forecast_object) {

              let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
              let min_temperature_in_c = forecast_object[i].day.mintemp_c;
              // Partitioning for four section

              // Section-1 December to February(Day-1)
              if (i == 0) {
                December_February_High = max_temperature_in_c;
                December_February_Low = min_temperature_in_c;
              }
              // Section-2 March to May(Day-2 & Day-3)
              else if (i >= 1 && i <= 2) {
                March_May_High += max_temperature_in_c;
                March_May_Low += min_temperature_in_c;
              }
              // Section-3 June to August(Day-4 & Day-5)
              else if (i >= 3 && i <= 4) {
                June_August_High += max_temperature_in_c;
                June_August_Low += min_temperature_in_c;
              }
              // Section-4 September to November(Day-6 & Day-7)
              else {
                September_November_High += max_temperature_in_c;
                September_November_Low += min_temperature_in_c;
              }
            }
            March_May_High = March_May_High / 2;
            March_May_Low = March_May_Low / 2;

            June_August_High = June_August_High / 2;
            June_August_Low = June_August_Low / 2;

            September_November_High = September_November_High / 2;
            September_November_Low = September_November_Low / 2;

            let dfh = December_February_High;
            let dfl = December_February_Low;

            let mmh = March_May_High;
            let mml = March_May_Low;

            let jah = June_August_High;
            let jal = June_August_Low;

            let snh = September_November_High;
            let snl = September_November_Low;

            res.render('index', {
              December_February_High: (Math.floor(dfh) + (Math.floor(100 * (dfh - Math.floor(dfh)))) / 100).toString(),
              December_February_Low: (Math.floor(dfl) + (Math.floor(100 * (dfl - Math.floor(dfl)))) / 100).toString(),

              March_May_High: (Math.floor(mmh) + (Math.floor(100 * (mmh - Math.floor(mmh)))) / 100).toString(),
              March_May_Low: (Math.floor(mml) + (Math.floor(100 * (mml - Math.floor(mml)))) / 100).toString(),

              June_August_High: (Math.floor(jah) + (Math.floor(100 * (jah - Math.floor(jah)))) / 100).toString(),
              June_August_Low: (Math.floor(jal) + (Math.floor(100 * (jal - Math.floor(jal)))) / 100).toString(),

              September_November_High: (Math.floor(snh) + (Math.floor(100 * (snh - Math.floor(snh)))) / 100).toString(),
              September_November_Low: (Math.floor(snl) + (Math.floor(100 * (snl - Math.floor(snl)))) / 100).toString(),

              searching_time: "Your Searching Time: " + searching_time.toString()
            });


          });

          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        axios
          .get("https://api.weatherapi.com/v1/history.json?key=1025c15bcdb04428906103946212912&q=" + country + "&q=" + city + "&dt=2021-12-23&end_dt=2021-12-29&aqi=yes")
          .then((response) => {

            let da_ta = response.data;
            let jsonObject = JSON.stringify(da_ta);
            let jsObject = JSON.parse(jsonObject);
            console.log(jsObject.location.name.toLowerCase().localeCompare(city) + jsObject.location.country.toLowerCase().localeCompare(country));
            if (jsObject.location.name.toLowerCase().localeCompare(city) + jsObject.location.country.toLowerCase().localeCompare(country) != 0) {
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

              var path = "json_info_files/" + country + "_" + city + '.json';
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

              let December_February_High = 0;
              let December_February_Low = 0;
              let March_May_High = 0;
              let March_May_Low = 0;
              let June_August_High = 0;
              let June_August_Low = 0;
              let September_November_High = 0;
              let September_November_Low = 0;

              let forecast_object = jsObject.forecast.forecastday;
              for (let i in forecast_object) {

                let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
                let min_temperature_in_c = forecast_object[i].day.mintemp_c;
                // Partitioning for four section

                // Section-1 December to February(Day-1)
                if (i == 0) {
                  December_February_High = max_temperature_in_c;
                  December_February_Low = min_temperature_in_c;
                }
                // Section-2 March to May(Day-2 & Day-3)
                else if (i >= 1 && i <= 2) {
                  March_May_High += max_temperature_in_c;
                  March_May_Low += min_temperature_in_c;
                }
                // Section-3 June to August(Day-4 & Day-5)
                else if (i >= 3 && i <= 4) {
                  June_August_High += max_temperature_in_c;
                  June_August_Low += min_temperature_in_c;
                }
                // Section-4 September to November(Day-6 & Day-7)
                else {
                  September_November_High += max_temperature_in_c;
                  September_November_Low += min_temperature_in_c;
                }
              }
              March_May_High = March_May_High / 2;
              March_May_Low = March_May_Low / 2;

              June_August_High = June_August_High / 2;
              June_August_Low = June_August_Low / 2;

              September_November_High = September_November_High / 2;
              September_November_Low = September_November_Low / 2;

              let dfh = December_February_High;
              let dfl = December_February_Low;

              let mmh = March_May_High;
              let mml = March_May_Low;

              let jah = June_August_High;
              let jal = June_August_Low;

              let snh = September_November_High;
              let snl = September_November_Low;

              res.render('index', {
                December_February_High: (Math.floor(dfh) + (Math.floor(100 * (dfh - Math.floor(dfh)))) / 100).toString(),
                December_February_Low: (Math.floor(dfl) + (Math.floor(100 * (dfl - Math.floor(dfl)))) / 100).toString(),

                March_May_High: (Math.floor(mmh) + (Math.floor(100 * (mmh - Math.floor(mmh)))) / 100).toString(),
                March_May_Low: (Math.floor(mml) + (Math.floor(100 * (mml - Math.floor(mml)))) / 100).toString(),

                June_August_High: (Math.floor(jah) + (Math.floor(100 * (jah - Math.floor(jah)))) / 100).toString(),
                June_August_Low: (Math.floor(jal) + (Math.floor(100 * (jal - Math.floor(jal)))) / 100).toString(),

                September_November_High: (Math.floor(snh) + (Math.floor(100 * (snh - Math.floor(snh)))) / 100).toString(),
                September_November_Low: (Math.floor(snl) + (Math.floor(100 * (snl - Math.floor(snl)))) / 100).toString(),

                searching_time: "Your Searching Time: " + searching_time.toString()
              });
            }
            else {
              window.alert("Wrong URL!!");
            }

          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    else {
      axios
        .get("https://api.weatherapi.com/v1/history.json?key=1025c15bcdb04428906103946212912&q=" + country + "&q=" + city + "&dt=2021-12-23&end_dt=2021-12-29&aqi=yes")
        .then((response) => {

          let da_ta = response.data;
          let jsonObject = JSON.stringify(da_ta);
          let jsObject = JSON.parse(jsonObject);

          if (jsObject.location.name.toLowerCase().localeCompare(city) + jsObject.location.country.toLowerCase().localeCompare(country) != 0) {
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

            var path = "json_info_files/" + country + "_" + city + '.json';
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

            let December_February_High = 0;
            let December_February_Low = 0;
            let March_May_High = 0;
            let March_May_Low = 0;
            let June_August_High = 0;
            let June_August_Low = 0;
            let September_November_High = 0;
            let September_November_Low = 0;

            let forecast_object = jsObject.forecast.forecastday;
            for (let i in forecast_object) {

              let max_temperature_in_c = forecast_object[i].day.maxtemp_c;
              let min_temperature_in_c = forecast_object[i].day.mintemp_c;
              // Partitioning for four section

              // Section-1 December to February(Day-1)
              if (i == 0) {
                December_February_High = max_temperature_in_c;
                December_February_Low = min_temperature_in_c;
              }
              // Section-2 March to May(Day-2 & Day-3)
              else if (i >= 1 && i <= 2) {
                March_May_High += max_temperature_in_c;
                March_May_Low += min_temperature_in_c;
              }
              // Section-3 June to August(Day-4 & Day-5)
              else if (i >= 3 && i <= 4) {
                June_August_High += max_temperature_in_c;
                June_August_Low += min_temperature_in_c;
              }
              // Section-4 September to November(Day-6 & Day-7)
              else {
                September_November_High += max_temperature_in_c;
                September_November_Low += min_temperature_in_c;
              }
            }
            March_May_High = March_May_High / 2;
            March_May_Low = March_May_Low / 2;

            June_August_High = June_August_High / 2;
            June_August_Low = June_August_Low / 2;

            September_November_High = September_November_High / 2;
            September_November_Low = September_November_Low / 2;

            let dfh = December_February_High;
            let dfl = December_February_Low;

            let mmh = March_May_High;
            let mml = March_May_Low;

            let jah = June_August_High;
            let jal = June_August_Low;

            let snh = September_November_High;
            let snl = September_November_Low;

            res.render('index', {
              December_February_High: (Math.floor(dfh) + (Math.floor(100 * (dfh - Math.floor(dfh)))) / 100).toString(),
              December_February_Low: (Math.floor(dfl) + (Math.floor(100 * (dfl - Math.floor(dfl)))) / 100).toString(),

              March_May_High: (Math.floor(mmh) + (Math.floor(100 * (mmh - Math.floor(mmh)))) / 100).toString(),
              March_May_Low: (Math.floor(mml) + (Math.floor(100 * (mml - Math.floor(mml)))) / 100).toString(),

              June_August_High: (Math.floor(jah) + (Math.floor(100 * (jah - Math.floor(jah)))) / 100).toString(),
              June_August_Low: (Math.floor(jal) + (Math.floor(100 * (jal - Math.floor(jal)))) / 100).toString(),

              September_November_High: (Math.floor(snh) + (Math.floor(100 * (snh - Math.floor(snh)))) / 100).toString(),
              September_November_Low: (Math.floor(snl) + (Math.floor(100 * (snl - Math.floor(snl)))) / 100).toString(),

              searching_time: "Your Searching Time: " + searching_time.toString()
            });

          }
          else {
            window.alert("Wrong URL!!");
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

});

module.exports = router;