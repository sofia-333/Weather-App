const key = `efc8ef5bf4616d6a57406e8cc5a0db03`;
const proxy = "https://cors-anywhere.herokuapp.com/";
//Get the location and show the weather there
window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    return fetch(`${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`)
      .then(response => response.json())

      .then(result => {
        const kelvin = result.current.temp;
        const celcius = kelvin - 273.15;
        const temp = document.getElementsByClassName("temperature")[0];
        temp.innerText = Math.round(celcius);
        const degree = document.getElementsByClassName("degree")[0];
        degree.innerText = "C";
        const description = document.getElementsByClassName("description")[0];
        description.innerText = result.current.weather[0].description;
        const city = document.getElementsByClassName("timezone")[0];
        city.innerText = result.timezone;

        const icon = document.getElementsByClassName("icon")[0];
        const iconID = result.current.weather[0].icon;
        icon.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;

        //Changing Fanenheit and Celcius on click
        temp.addEventListener("click", () => {
          if (degree.textContent === "C") {
            const farenheit = celcius * 9 / 5 + 32;
            temp.textContent = Math.round(farenheit);
            degree.textContent = "F";
          } else {
            temp.textContent = Math.round(celcius);
            degree.textContent = "C";
          }
        })
      })
  });
})

function SearchCity(city) {
  return fetch(`${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=5e47addd97d4df67901bdd558094888e`)
    .then(response => response.json())
}
const searchButton = document.getElementsByTagName('Button')[0];
document.getElementsByTagName('input')[0].value = "";
searchButton.addEventListener("click", Search);

function Search() {
  const inputCity = document.getElementsByTagName('input')[0].value;

  SearchCity(inputCity)
    .then(result => {
      const kelvin = result.main.temp;
      const celcius = kelvin - 273.15;
      const temp = document.getElementsByClassName("temperature")[0];
      temp.innerText = Math.round(celcius);
      const degree = document.getElementsByClassName("degree")[0];
      degree.innerText = "C";
      const description = document.getElementsByClassName("description")[0];
      description.innerText = result.weather[0].description;
      const city = document.getElementsByClassName("timezone")[0];
      city.innerText = inputCity;
      const icon = document.getElementsByClassName("icon")[0];
      const iconID = result.weather[0].icon;
      icon.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;

      temp.addEventListener("click", () => {
        if (degree.textContent === "C") {
          const farenheit = celcius * 9 / 5 + 32;
          temp.textContent = Math.round(farenheit);
          degree.textContent = "F";
          // console.log("if");
        } else {
          temp.textContent = Math.round(celcius);
          degree.textContent = "C";
          // console.log("else");
        }
      })
    })
    .catch(err => alert("City Is Not Found"))
}
