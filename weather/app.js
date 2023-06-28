(async () => {
    let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const d = new Date()
    day = day[d.getDay()]
    document.getElementById('day').innerText = day;
    document.getElementById('date').innerText = d.toLocaleDateString();
    let location = document.getElementById('select-location')
    location.addEventListener('input', async () => {
        let city = await location.value
        const cities = ['karachi', 'islamabad', 'lahore', 'murree', 'quetta']
        const latitude = ['24.8607', '33.6844', '31.5204', '33.9070', '30.1798']
        const longitude = ['67.0011', '73.0479', '74.3587', '73.3943', '66.9750']
        let locationIndex = 0;
        cities.forEach((value) => {
            if (city === value) {
                locationIndex = cities.indexOf(value)
            }
        })
        document.querySelector('.location').innerText = city;

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude[locationIndex]}&longitude=${longitude[locationIndex]}&current_weather=true&windspeed_unit=mph&hourly=temperature_2m&hourly=cloudcover&hourly=relativehumidity_2m&hourly=rain&hourly=showers&hourly=visibility&hourly=apparent_temperature&hourly=soil_temperature_0cm`);
        const jsonData = await response.json();

        document.querySelector('.weather-temp').innerText = jsonData.current_weather.temperature + "°C";
        document.getElementById('wind-speed').innerText = jsonData.current_weather.windspeed + 'km/h';
        document.getElementById('wind-direction').innerText = jsonData.current_weather.winddirection + '°';
        document.getElementById('weather-code').innerText = jsonData.current_weather.weathercode;

        let date = d.getDate();
        let month = d.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        let year = d.getFullYear();
        let time = d.toLocaleTimeString();
        time = time[0]

        if (time < 10) {
            time = '0' + time;
        }
        time = time + ':00'

        let currentTime = `${year}-${month}-${date}T${time}`
        let timeIndex = 0;
        let timeArr = jsonData.hourly.time

        timeArr.forEach((value) => {
            if (currentTime === value) {
                timeIndex = timeArr.indexOf(value)
            }
        })

        document.getElementById('cloud-cover').innerText = jsonData.hourly.cloudcover[timeIndex] + '%';
        document.getElementById('rain').innerText = jsonData.hourly.rain[timeIndex] + 'mm';
        document.getElementById('humidity').innerText = jsonData.hourly.relativehumidity_2m[timeIndex] + '%';
        document.getElementById('shower').innerText = jsonData.hourly.showers[timeIndex] + 'mm';
        document.getElementById('soil-temp').innerText = jsonData.hourly.soil_temperature_0cm[timeIndex] + '°C';
        document.getElementById('apperent-temp').innerText = jsonData.hourly.apparent_temperature[timeIndex] + '°C';
        document.getElementById('visibility').innerText = (jsonData.hourly.visibility[timeIndex] / 1000) + 'km';

        var ctx = document.getElementById('myChart').getContext('2d');

        const labels = jsonData.hourly.time.slice(0, 24);
        const data = {
            labels: labels.map((time) => new Date(time).getHours() + ' hr'),
            datasets: [{
                label: `Today's Temperature`,
                data: jsonData.hourly.temperature_2m,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
        
        var myChart = new Chart(ctx, {
            type: 'line',
            data: data
        });

        document.getElementById('myChart').style.display = 'block';
    });
})();
