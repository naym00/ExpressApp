function c_f_1()
{
    let str_from_btn = document.getElementById("btn-1").innerText;
    if (str_from_btn.localeCompare("Convert to Fahrenheit") == 0)
    {
        
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-1").innerText.replace("oC", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-1").innerText.replace("oC", "")));

        let high_fahrenheit = two_digit_after_point(((9*heigh_temperature)+160)/5).toString();
        let low_fahrenheit = two_digit_after_point(((9*low_temperature)+160)/5).toString();

        document.getElementById("high-1").innerHTML = high_fahrenheit + "<sup>o</sup>F";
        document.getElementById("low-1").innerHTML = low_fahrenheit + "<sup>o</sup>F";
        document.getElementById("btn-1").innerHTML = "Convert to Celsius";
    }
    else if (str_from_btn.localeCompare("Convert to Celsius") == 0)
    {
          
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-1").innerText.replace("oF", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-1").innerText.replace("oF", "")));
   
        let high_celsius = two_digit_after_point((5*(heigh_temperature - 32))/9).toString();
        let low_celsius = two_digit_after_point((5*(low_temperature - 32))/9).toString();

        document.getElementById("high-1").innerHTML = high_celsius + "<sup>o</sup>C";
        document.getElementById("low-1").innerHTML = low_celsius + "<sup>o</sup>C";
        document.getElementById("btn-1").innerHTML = "Convert to Fahrenheit";
    }
}

function c_f_2()
{
    let str_from_btn = document.getElementById("btn-2").innerText;
    if (str_from_btn.localeCompare("Convert to Fahrenheit") == 0)
    {
        
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-2").innerText.replace("oC", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-2").innerText.replace("oC", "")));

        let high_fahrenheit = two_digit_after_point(((9*heigh_temperature)+160)/5).toString();
        let low_fahrenheit = two_digit_after_point(((9*low_temperature)+160)/5).toString();

        document.getElementById("high-2").innerHTML = high_fahrenheit + "<sup>o</sup>F";
        document.getElementById("low-2").innerHTML = low_fahrenheit + "<sup>o</sup>F";
        document.getElementById("btn-2").innerHTML = "Convert to Celsius";
    }
    else if (str_from_btn.localeCompare("Convert to Celsius") == 0)
    {
          
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-2").innerText.replace("oF", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-2").innerText.replace("oF", "")));
   
        let high_celsius = two_digit_after_point((5*(heigh_temperature - 32))/9).toString();
        let low_celsius = two_digit_after_point((5*(low_temperature - 32))/9).toString();

        document.getElementById("high-2").innerHTML = high_celsius + "<sup>o</sup>C";
        document.getElementById("low-2").innerHTML = low_celsius + "<sup>o</sup>C";
        document.getElementById("btn-2").innerHTML = "Convert to Fahrenheit";
    }
}

function c_f_3()
{
    let str_from_btn = document.getElementById("btn-3").innerText;
    if (str_from_btn.localeCompare("Convert to Fahrenheit") == 0)
    {
        
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-3").innerText.replace("oC", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-3").innerText.replace("oC", "")));

        let high_fahrenheit = two_digit_after_point(((9*heigh_temperature)+160)/5).toString();
        let low_fahrenheit = two_digit_after_point(((9*low_temperature)+160)/5).toString();

        document.getElementById("high-3").innerHTML = high_fahrenheit + "<sup>o</sup>F";
        document.getElementById("low-3").innerHTML = low_fahrenheit + "<sup>o</sup>F";
        document.getElementById("btn-3").innerHTML = "Convert to Celsius";
    }
    else if (str_from_btn.localeCompare("Convert to Celsius") == 0)
    {
          
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-3").innerText.replace("oF", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-3").innerText.replace("oF", "")));
   
        let high_celsius = two_digit_after_point((5*(heigh_temperature - 32))/9).toString();
        let low_celsius = two_digit_after_point((5*(low_temperature - 32))/9).toString();

        document.getElementById("high-3").innerHTML = high_celsius + "<sup>o</sup>C";
        document.getElementById("low-3").innerHTML = low_celsius + "<sup>o</sup>C";
        document.getElementById("btn-3").innerHTML = "Convert to Fahrenheit";
    }
}

function c_f_4()
{
    let str_from_btn = document.getElementById("btn-4").innerText;
    if (str_from_btn.localeCompare("Convert to Fahrenheit") == 0)
    {
        
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-4").innerText.replace("oC", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-4").innerText.replace("oC", "")));

        let high_fahrenheit = two_digit_after_point(((9*heigh_temperature)+160)/5).toString();
        let low_fahrenheit = two_digit_after_point(((9*low_temperature)+160)/5).toString();

        document.getElementById("high-4").innerHTML = high_fahrenheit + "<sup>o</sup>F";
        document.getElementById("low-4").innerHTML = low_fahrenheit + "<sup>o</sup>F";
        document.getElementById("btn-4").innerHTML = "Convert to Celsius";
    }
    else if (str_from_btn.localeCompare("Convert to Celsius") == 0)
    {
          
        let heigh_temperature = two_digit_after_point(parseFloat(document.getElementById("high-4").innerText.replace("oF", "")));
        let low_temperature = two_digit_after_point(parseFloat(document.getElementById("low-4").innerText.replace("oF", "")));
   
        let high_celsius = two_digit_after_point((5*(heigh_temperature - 32))/9).toString();
        let low_celsius = two_digit_after_point((5*(low_temperature - 32))/9).toString();

        document.getElementById("high-4").innerHTML = high_celsius + "<sup>o</sup>C";
        document.getElementById("low-4").innerHTML = low_celsius + "<sup>o</sup>C";
        document.getElementById("btn-4").innerHTML = "Convert to Fahrenheit";
    }
}

function two_digit_after_point(num)
{
    return Math.floor(num) + (Math.floor(100*(num - Math.floor(num))))/100;
}

function dataFromInput()
{
    let country = document.getElementById("country_input").value;
    let city = document.getElementById("city_input").value;

    console.log(country);
    console.log(city);
}