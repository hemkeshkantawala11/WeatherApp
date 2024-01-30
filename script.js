const form = document.querySelector(".inputForm")
form.addEventListener("submit", handleSubmit)
async function handleSubmit(e) {
    e.preventDefault()
    const city = document.querySelector(".inputCity").value
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '68b2da1fcdmsh865f3e560824cc6p199851jsn9ef6ba345b28',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        document.querySelector(".city").textContent = result.location.city;
        document.querySelector(".country").textContent = "                              "+result.location.country;
        document.querySelector(".temprature").textContent = Math.round(result.current_observation.condition.temperature) + "°F"
        document.querySelector(".sky").textContent = result.current_observation.condition.text
        document.querySelector(".min-max").textContent = `${result.forecasts[0].high}°f / ${result.forecasts[0].low}°f`
        if(document.querySelector(".sky").textContent === "Cloudy"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("cloudy");
        }
        if(document.querySelector(".sky").textContent === "Smoke"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("Smoke");
        }
        if(document.querySelector(".sky").textContent === "Haze"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("Haze");
        }
        if(document.querySelector(".sky").textContent === "Sunny"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("Sunny");
        }
        if(document.querySelector(".sky").textContent === "Partly Cloudy"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("PC");
        }
        if(document.querySelector(".sky").textContent === "Showers"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("rainy");
        }
        if(document.querySelector(".sky").textContent === "Mostly Cloudy"){
            document.querySelector("body").classList = [];
            document.querySelector("body").classList.add("mc");
        }


        const tableBody = document.querySelector('.weather-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        result.forecasts.forEach((forecast) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${forecast.day}</td>
            <td>${new Date(forecast.date * 1000).toLocaleDateString()}</td>
            <td>${forecast.high}°F</td>
            <td>${forecast.low}°F</td>
            <td>${forecast.text}</td>
        `;
            tableBody.appendChild(row);
        });





    } catch (error) {
        console.error(error);
    }
}


























