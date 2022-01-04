# ExpressApp
Through this project you will be able to know the weather of any country.
There is two way to know about the weather of a country.
#If you hit to this url http://localhost:3000/all/bangladesh/khulna
By hitting this URL you will get the information of Khulna city which is a city of Bangladesh.
#If you hit to this url http://localhost:3000/all/bangladesh
By hitting this url you will get the information of capital city which is Dhaka and which is also a city of Bangladesh.
Note: If you hit the wrong url it will take you to an alert page.

This information will be fetched from weather api.
If you see the weather of a country for the first time, it will fetch data from api and data will be stored to a json file.
Next time the data will show from the file for that same country.

And you are able to hit once in 10 seconds.
If you hit more than one then it will show a message.

# Main Process
In this project i have collected 7 days data. And days are dynamically handled.
And have segmented these to four sections. 
#Section1:
December February High Temperature: 1st day's high temperature.
December February Low Temperature: 1st day's low temperature.

#Section2:
March May High Temperature: Average of 2nd and 3rd day's high temperature.
March May Low Temperature: Average of 2nd and 3rd day's low temperature.

#Section3:
June August High Temperature: Average of 4th and 5th day's high temperature.
June August Low Temperature: Average of 4th and 5th day's low temperature.

#Section4:
September November High Temperature: Average of 6th and 7th day's high temperature.
September November Low Temperature: Average of 6th and 7th day's low temperature.

#Tools and Packages
##Tools (1)NodeJS (ExpressJS) (2)Pug template (3) HTML (4) CSS
##Packages (1)Axios (2)Express-Rate-Limit

