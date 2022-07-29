import { useState } from "react";
import CityStats from "./CityStats";
import InputField from "./InputField";

function App() {

  const [searchedCity, setSearchedCity] = useState(undefined)

  return (
    <>
      <InputField setSearchedCity={setSearchedCity} />
      <CityStats searchedCity={searchedCity} />
    </>
  );
}

export default App;
