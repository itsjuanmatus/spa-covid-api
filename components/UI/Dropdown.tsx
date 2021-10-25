import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
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

  let countries;
  if (countryList != undefined) countries = countryList["response"];
  /*   console.log(countries)
   */
  const [selected, setSelected] = useState(countries && countries[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Label className="block text-sm font-medium text-gray-700 mt-5"></Listbox.Label>
      <div className="mt-1 relative">
        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-2 pr-20 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span className="flex items-center">
            {selected || (countries && countries[3])}
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {countries &&
              countries.map((country: any) => (
                <Listbox.Option
                  key={country}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-indigo-600" : "text-gray-900",
                      "cursor-pointer select-none relative py-2 pl-3 pr-9"
                    )
                  }
                  value={country}
                >
                  <Link href={`/country/${country}`}>{country}</Link>
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
