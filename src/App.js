import React, { useState } from 'react';
import './App.css';
const api = {
  key: "14d7c4033758a88244030000970eaf03",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [quary, setQuary] = useState("")
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${quary}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuary("")
          console.log(result);
        })
    }
  }

  const dateBilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobar", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp <= 16) ? "appWarm" : "app") : "app"}>
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search...."
            onChange={e => setQuary(e.target.value)}
            value={quary}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&#176;c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
