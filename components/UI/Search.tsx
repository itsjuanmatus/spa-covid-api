import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Search() {
  const [countryList, setCountryList] = useState<any>();

  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/countries", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "67f1b9b329msh37f1aaceb84a3aep18c5fejsn7dd88e237824",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCountryList(res);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  let countries: any;
  if (countryList != undefined) countries = countryList["response"];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(countries);
  let [inputSelected, setInputSelected] = React.useState(false);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);

    if (searchTerm.length <= 1) {
      setInputSelected(false);
    } else {
      setInputSelected(true);
    }

    console.log(searchTerm);
  };

  React.useEffect(() => {
    const results: any =
      countries &&
      countries.filter((e: any) =>
        e.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setSearchResults(results);
  }, [searchTerm, countries]);

  return (
    <div className="flex">
      <div>
        <input
          type="text"
          placeholder="🔍 Search country"
          value={searchTerm}
          onChange={handleChange}
          className="w-full py-2 pl-2 text-md text-black rounded-md border border-gray-dark mb-2"
        />
        <div className="grid absolute w-full max-w-max gap-y-2">
          {inputSelected &&
            searchResults.slice(0, 2).map((e: any) => (
              <div key={e} className="cursor-pointer">
                <Link href={`/country/${e}`} passHref>
                  <div
                    onClick={() => {
                      setSearchTerm("");
                      setInputSelected(false);
                    }}
                    className="text-black w-full bg-white px-16 py-2 rounded-md border border-gray-dark cursor-pointer hover:bg-gray-200"
                  >
                    {" "}
                    <p>{e}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
