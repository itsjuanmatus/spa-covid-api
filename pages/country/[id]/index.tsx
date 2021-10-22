import React from 'react'

const defaultEndpoint = `https://covid-193.p.rapidapi.com/statistics?country=`

export async function getServerSideProps ({ query }: any) {
  const { id } = query
  const res = await fetch(`${defaultEndpoint}${id}`, {
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

export default function Country ({ data }: any) {
  const countries = data['response'][0]

  console.log(countries)

  return (
    <div className='bg-gray-100 min-h-screen w-full grid justify-items-center'>
      <div className='flex-col justify-items-center'>
        <div className='grid justify-items-center mt-10'>
          <h3 className='text-red-400 font-bold text-sm'>
            Your country result
          </h3>
          <h1 className='text-6xl font-bold'>{countries.country}</h1>
          <p className='text-gray-500 mt-2'>Continent - {countries.continent}</p>
        </div>
        <div className='grid grid-cols-3 mt-24 gap-x-10'>
          <div className='bg-white shadow-sm border-1 border-gray-100 p-8 w-full max-w-4xl rounded-md'>
            <div>
              <h2 className='text-5xl font-bold text-blue-800'>
                {countries.cases.total}
              </h2>
              <p className='text-gray-500'>Total Cases as of Today</p>
              <div className='grid mt-5 gap-x-10'>
                <div>
                  <p className='text-gray-500'>NEW CASES</p>
                  <p className='text-gray-700 font-bold text-xl'>
                    {countries.cases.new}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
          <div className='bg-white shadow-sm border-1 border-gray-100 p-8 w-full max-w-4xl rounded-md'>
            <div>
              <h2 className='text-5xl font-bold text-red-500'>
                {countries.deaths.total}
              </h2>
              <p className='text-gray-500'>Total Deaths as of Today</p>
              <div className='grid grid-cols-2 mt-5 gap-x-10'>
                <div>
                  <p className='text-gray-500'>NEW DEATHS</p>
                  <p className='text-gray-700 font-bold text-xl'>
                    {countries.deaths.new}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
          <div className='bg-white shadow-sm border-1 border-gray-100 p-8 w-full max-w-4xl rounded-md'>
            <div>
              <h2 className='text-5xl font-bold text-blue-800'>
                {countries.cases.recovered}
              </h2>
              <p className='text-gray-500'>Recovered as of today</p>
              <div className='grid grid-cols-2 mt-5 gap-x-10'>
                <div>
                  <p className='text-gray-500'>CRITICAL</p>
                  <p className='text-gray-700 font-bold text-xl'>
                    {countries.cases.critical}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="font-semibold">Last Update - {countries.day}</h3>

      </div>
    </div>
  )
}
