import { NextPage } from "next";
import Table from "../components/Table";
import React from "react";
import "regenerator-runtime/runtime";
import Link from "next/link";

const Home: NextPage = ({ data }: any) => {
  const sortedCountries = data["response"].sort((a: any, b: any) =>
    a.continent > b.continent ? 1 : -1
  );
  /*   console.log(sortedCountries)
   */
  const columns = React.useMemo(
    () => [
      {
        Header: "Continent",
        accessor: "continent",
      },
      {
        Header: "Country",
        accessor: "country",
        Cell: (e: any) => (
          <Link href={`/country/${e.value}`} passHref>
            <p className="cursor-pointer hover:bg-indigo-500 max-w-min p-1 hover:text-white rounded-md">
              {e.value}
            </p>
          </Link>
        ),
      },
      {
        Header: "Total Cases",
        accessor: "cases.total",
      },
      {
        Header: "Active Cases",
        accessor: "cases.active",
      },

      {
        Header: "Last Update",
        accessor: "time",
        Cell: (e: any) => {
          let lastUpdate = e.value.replace("T", " ");
          lastUpdate = lastUpdate.slice(0, lastUpdate.length - 9);
          return <p>{lastUpdate}</p>;
        },
      },
      {
        Header: "Population",
        accessor: "population",
      },
    ],
    []
  );

  return (
    <div className="w-full m-auto min-h-screen bg-gray-100 flex justify-center overflow-x-hidden">
      <div className="w-full flex-col px-2 md:px-0 justify-center max-w-max">
        <h1 className="text-4xl font-bold mt-10">COVID CASES</h1>
        <p className="mt-2 text-gray-500 mb-1 break-words">
          Click on the name of a country to find the details about it.
        </p>
        <p className="mt-2 text-gray-500 mb-7 break-words">
          Also, click on the header of the column to sort it.
        </p>
        <div className="w-full mb-10 flex-col justify-center mt-10 px-5 lg:px-0">
          <Table columns={columns} data={sortedCountries} />
        </div>
      </div>
    </div>
  );
};

export default Home;

const defaultEndpoint = "https://covid-193.p.rapidapi.com/statistics";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "67f1b9b329msh37f1aaceb84a3aep18c5fejsn7dd88e237824",
    },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
