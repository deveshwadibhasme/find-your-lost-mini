import React from 'react'

const SearchMissing = ({handleSearch,search,setSearch,markAsFound,results}) => {
  return (
    <>
    {/* Search Form */}
    <form onSubmit={handleSearch} className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Search Missing Persons</h2>
        <input type="text" placeholder="Name" 
               value={search.name} onChange={e => setSearch({...search, name: e.target.value})} 
               className='block w-full p-2 mb-4 border border-gray-300 rounded' />
        <input type="number" placeholder="Age" 
               value={search.age} onChange={e => setSearch({...search, age: e.target.value})} 
               className='block w-full p-2 mb-4 border border-gray-300 rounded' />
        <button type="submit" className='bg-blue-500 text-white p-2 rounded cursor-pointer'>Search</button>
      </form>

      {/* Search Results */}
      <div>
        {results === '' ? 'Search Properly' :
          results.map(person => (
          <div key={person._id} className='border border-gray-300 p-4 mb-4 rounded'>
            <h3 className='text-xl font-semibold'>{person.name} ({person.age})</h3>
            <p className='mb-2'>{person.description}</p>
            <p className='mb-2'>Contact: {person.contact}</p>
            {!person.found && (
              <button onClick={() => markAsFound(person._id)} className='bg-green-500 text-white p-2 rounded cursor-pointer'>
                Mark as Found and Notify Family
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchMissing