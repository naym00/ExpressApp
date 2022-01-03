function c_f()
{
    let str_from_btn = document.getElementById("ctof").innerText;
    console.log("Clicked");
    if (str_from_btn.localeCompare("Convert to Fahrenheit") == 0)
    {
        
        let heigh_temperature_1 = two_digit_after_point(parseFloat(document.getElementById("high-1").innerText.replace("oC", "")));
        let low_temperature_1 = two_digit_after_point(parseFloat(document.getElementById("low-1").innerText.replace("oC", "")));

        let heigh_temperature_2 = two_digit_after_point(parseFloat(document.getElementById("high-2").innerText.replace("oC", "")));
        let low_temperature_2 = two_digit_after_point(parseFloat(document.getElementById("low-2").innerText.replace("oC", "")));

        let heigh_temperature_3 = two_digit_after_point(parseFloat(document.getElementById("high-3").innerText.replace("oC", "")));
        let low_temperature_3 = two_digit_after_point(parseFloat(document.getElementById("low-3").innerText.replace("oC", "")));

        let heigh_temperature_4 = two_digit_after_point(parseFloat(document.getElementById("high-4").innerText.replace("oC", "")));
        let low_temperature_4 = two_digit_after_point(parseFloat(document.getElementById("low-4").innerText.replace("oC", "")));


        let high_fahrenheit_1 = two_digit_after_point(((9*heigh_temperature_1)+160)/5).toString();
        let low_fahrenheit_1 = two_digit_after_point(((9*low_temperature_1)+160)/5).toString();

        let high_fahrenheit_2 = two_digit_after_point(((9*heigh_temperature_2)+160)/5).toString();
        let low_fahrenheit_2 = two_digit_after_point(((9*low_temperature_2)+160)/5).toString();

        let high_fahrenheit_3 = two_digit_after_point(((9*heigh_temperature_3)+160)/5).toString();
        let low_fahrenheit_3 = two_digit_after_point(((9*low_temperature_3)+160)/5).toString();

        let high_fahrenheit_4 = two_digit_after_point(((9*heigh_temperature_4)+160)/5).toString();
        let low_fahrenheit_4 = two_digit_after_point(((9*low_temperature_4)+160)/5).toString();

        document.getElementById("high-1").innerHTML = high_fahrenheit_1 + "<sup>o</sup>F";
        document.getElementById("low-1").innerHTML = low_fahrenheit_1 + "<sup>o</sup>F";

        document.getElementById("high-2").innerHTML = high_fahrenheit_2 + "<sup>o</sup>F";
        document.getElementById("low-2").innerHTML = low_fahrenheit_2 + "<sup>o</sup>F";

        document.getElementById("high-3").innerHTML = high_fahrenheit_3 + "<sup>o</sup>F";
        document.getElementById("low-3").innerHTML = low_fahrenheit_3 + "<sup>o</sup>F";

        document.getElementById("high-4").innerHTML = high_fahrenheit_4 + "<sup>o</sup>F";
        document.getElementById("low-4").innerHTML = low_fahrenheit_4 + "<sup>o</sup>F";

        document.getElementById("btn-for-convert").innerHTML = "Convert to Celsius";
    }
    else if (str_from_btn.localeCompare("Convert to Celsius") == 0)
    {
          
        let heigh_temperature_1 = two_digit_after_point(parseFloat(document.getElementById("high-1").innerText.replace("oF", "")));
        let low_temperature_1 = two_digit_after_point(parseFloat(document.getElementById("low-1").innerText.replace("oF", "")));

        let heigh_temperature_2 = two_digit_after_point(parseFloat(document.getElementById("high-2").innerText.replace("oF", "")));
        let low_temperature_2 = two_digit_after_point(parseFloat(document.getElementById("low-2").innerText.replace("oF", "")));

        let heigh_temperature_3 = two_digit_after_point(parseFloat(document.getElementById("high-3").innerText.replace("oF", "")));
        let low_temperature_3 = two_digit_after_point(parseFloat(document.getElementById("low-3").innerText.replace("oF", "")));

        let heigh_temperature_4 = two_digit_after_point(parseFloat(document.getElementById("high-4").innerText.replace("oF", "")));
        let low_temperature_4 = two_digit_after_point(parseFloat(document.getElementById("low-4").innerText.replace("oF", "")));
   
        let high_celsius_1 = two_digit_after_point((5*(heigh_temperature_1 - 32))/9).toString();
        let low_celsius_1 = two_digit_after_point((5*(low_temperature_1 - 32))/9).toString();

        let high_celsius_2 = two_digit_after_point((5*(heigh_temperature_2 - 32))/9).toString();
        let low_celsius_2 = two_digit_after_point((5*(low_temperature_2 - 32))/9).toString();

        let high_celsius_3 = two_digit_after_point((5*(heigh_temperature_3 - 32))/9).toString();
        let low_celsius_3 = two_digit_after_point((5*(low_temperature_3 - 32))/9).toString();

        let high_celsius_4 = two_digit_after_point((5*(heigh_temperature_4 - 32))/9).toString();
        let low_celsius_4 = two_digit_after_point((5*(low_temperature_4 - 32))/9).toString();

        document.getElementById("high-1").innerHTML = high_celsius_1 + "<sup>o</sup>C";
        document.getElementById("low-1").innerHTML = low_celsius_1 + "<sup>o</sup>C";

        document.getElementById("high-2").innerHTML = high_celsius_2 + "<sup>o</sup>C";
        document.getElementById("low-2").innerHTML = low_celsius_2 + "<sup>o</sup>C";

        document.getElementById("high-3").innerHTML = high_celsius_3 + "<sup>o</sup>C";
        document.getElementById("low-3").innerHTML = low_celsius_3 + "<sup>o</sup>C";

        document.getElementById("high-4").innerHTML = high_celsius_4 + "<sup>o</sup>C";
        document.getElementById("low-4").innerHTML = low_celsius_4 + "<sup>o</sup>C";

        document.getElementById("btn-for-convert").innerHTML = "Convert to Fahrenheit";
    }
}

function two_digit_after_point(num)
{
    return Math.floor(num) + (Math.floor(100*(num - Math.floor(num))))/100;
}