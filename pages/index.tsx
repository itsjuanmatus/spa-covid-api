import { NextPage } from 'next'
import Table from '../components/Table'
import React from 'react'
import 'regenerator-runtime/runtime'
import Link from 'next/link'

const Home: NextPage = ({ data }: any) => {
  const sortedCountries = data['response'].sort((a: any, b: any) =>
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
        accessor: 'country',
        Cell: (e: any) => <Link href={`/country/${e.value}`}>{e.value}</Link>
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

  return (
    <div className='w-full min-h-screen bg-gray-100 grid justify-items-center'>
      <div className='w-full max-w-5xl mb-10'>
        <h1 className='text-4xl font-bold mt-10'>COVID CASES</h1>
        <p className='mt-2 text-gray-500 mb-7'>Click on the name of a country to find the details about it</p>
        <Table columns={columns} data={sortedCountries} />
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
