import React, { useState, useContext } from "react";
import { WeatherContext } from "../App";
import { ImSpinner6 } from "react-icons/im";

const Search = () => {
  const [Loader, setLoader] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(WeatherContext);
  const { setWeatherData } = useContext(WeatherContext);
  const { setSearchErrorStatus } = useContext(WeatherContext);
  let baseurl = `http://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=1635890035cbba097fd5c26c8ea672a1`;

  let getWeatherData = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let weatherData = await fetch(baseurl);
      setSearchErrorStatus(false);
      console.log(weatherData);
      if (weatherData.status !== 200) {
        setWeatherData(undefined);
        setSearchErrorStatus(true);
        throw new Error("API Internal Error");
      } else {
        let data = await weatherData.json();
        let FiveDays = data?.list.slice(0, 5);
        setWeatherData(FiveDays);
        console.log(FiveDays);
      }
    } catch (Errormsg) {
      console.log(Errormsg);
    } finally {
      setLoader(false);
    }
  };

  let onChangeHandler = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length < 1) {
      setWeatherData(undefined)
      setSearchErrorStatus(false);
    }
    console.log(e.target.value.length);
  };
  console.log("loader", Loader);

  return (
    <div>
      <form className="flex gap-4 sm:gap-1 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Enter city"
          value={searchQuery}
          onChange={onChangeHandler}
          className="border-2 border-orange-500 px-4 py-[6px] rounded-md outline-none"
        />
        <button
          className={`bg-orange-500 rounded-md px-9 py-[6px] sm:px-4 text-white self-center ${
            searchQuery ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={getWeatherData}
          disabled={searchQuery ? false : true}
        >
          Search
        </button>
        {Loader && (
          <div className="flex items-center justify-center sm:justify-normal">
            <ImSpinner6 size={30} className="rotate1" />
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
