import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Context } from "../utils/context";

function MDropdown() {
  const [cookies, _] = useCookies(["access_token"]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setYears] = useState([]);
  const [___, __, ____, setToday] = useContext(Context);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/year/used`, {
        headers: {
          Authorization: cookies.access_token,
        },
      })
      .then((res) => {
        console.log(res);
        var data = [];
        res.data.forEach((item) => {
          data.push({ name: item });
        });

        setYears(data);
      })
      .catch(() => {
        console.error("Error Getting Dropdown Years");
      });
  }, []);

  const handleDrop = (e) => {
    setSelectedYear(e.value);
    console.log(e.value);
    setToday(`${e.value.name}-12-31`);
  };

  return (
    <div>
      <Dropdown
        value={selectedYear}
        onChange={handleDrop}
        options={years}
        optionLabel="name"
        placeholder="Select Year"
        className="w-full md:w-14rem"
      />
    </div>
  );
}

export default MDropdown;
