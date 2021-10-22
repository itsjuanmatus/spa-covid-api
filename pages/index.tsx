import { NextPage } from 'next'
import Table from '../components/Table'
import React, { useState } from 'react'

const Home: NextPage = ({ data }: any) => {

  const { info } = data
  const [results, updateResults] = useState(data)

  const sortedCountries = results['response'].sort((a: any, b: any) =>
    a.continent > b.continent ? 1 : -1
  )
  console.log(sortedCountries)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Continent',
        accessor: 'continent'
      },
      {
        Header: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Total Cases',
        accessor: 'cases.total'
      },
      {
        Header: 'Active Cases',
        accessor: 'cases.active'
      },

      {
        Header: 'Last Update',
        accessor: 'day'
      },
      {
        Header: 'Population',
        accessor: 'population'
      }
    ],
    []
  )

  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint
  })

  const { current } = page

  function handleOnSubmitSearch (e: any) {
    e.preventDefault()

    const { currentTarget = {} } = e
    const fields = Array.from(currentTarget?.elements)
    const fieldQuery: any = fields.find((field: any) => field.name === 'query')

    const value = fieldQuery.value || ''
    const endpoint = `https://covid-193.p.rapidapi.com/statistics?country=${value}`

    updatePage({
      current: endpoint
    })

  }

  return (
    <div className='w-full min-h-screen bg-gray-100 grid justify-items-center'>
      <div className='w-full max-w-5xl'>
        {/*  <Table columns={columns} data={sortedCountries} /> */}
        <h1 className='text-2xl font-bold'>Covid Cases App</h1>
        <form className='search' onSubmit={handleOnSubmitSearch}>
          <input
            name='query'
            type='search'
            className='p-2 border-gray-100 shadow-sm rounded-md mt-3'
          />
          <button className='bg-indigo-700 text-white px-3 py-2 rounded-md ml-2'>
            Search
          </button>
        </form>

        <ul className='grid gap-y-2 mt-10'>
          <li className='grid grid-cols-5 bg-white rounded-md border-gray-100 shadow-sm p-3 '>
            <h3>Continent</h3>
            <h3>Country</h3>
            <h3>Total Cases</h3>
            <h3>Last Update</h3>
            <h3>Population</h3>
          </li>
          {sortedCountries.map((country: any) => {
            return (
              <li
                key={country}
                className='grid grid-cols-5 bg-white rounded-md border-gray-100 shadow-sm p-3'
              >
                <h3>{country.continent}</h3>
                <h3>{country.country}</h3>
                <h3>{country.cases.total}</h3>
                <h3>{country.day}</h3>
                <h3>{country.population}</h3>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home

const defaultEndpoint = 'https://covid-193.p.rapidapi.com/statistics'

export async function getServerSideProps () {
  const res = await fetch(defaultEndpoint, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '67f1b9b329msh37f1aaceb84a3aep18c5fejsn7dd88e237824'
    }
  })
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
