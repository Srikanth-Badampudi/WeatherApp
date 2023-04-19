import { useState, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";

export const WeatherContext = createContext(null);

function App() {
  let [searchQuery, setSearchQuery] = useState(undefined);
  let [weatherData, setWeatherData] = useState(undefined);
   let [searchErrorStatus, setSearchErrorStatus] = useState(false);
  return (
    <div className="App">
      <WeatherContext.Provider
        value={{
          searchQuery,
          setSearchQuery,
          weatherData,
          setWeatherData,
          searchErrorStatus,
          setSearchErrorStatus,
        }}
      >
        <Header />
        <Body />
      </WeatherContext.Provider>
    </div>
  );
}

export default App;
