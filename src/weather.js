const API_KEY = "c14e8c1f0abac065fc7df81c19802e64";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url).then(resopnse => resopnse.json()).then(data => {
        console.log(data.name, data.weather[0].main);
    });
    fetch(url)
    .then(resopnse => resopnse.json())
    .then(data => {
        const weather = document.querySelector("#weather span:last-child");
        const city = document.querySelector("#weather span:first-child");
        city.innerText = data.name;
        weather.innerText = `: ${data.weather[0].main}  ${data.main.temp}℃`;
    });
}

function onGeoError(){
    alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);