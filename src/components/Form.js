import { useState } from 'react';
import { dateNow, timeNow, filtered } from '../lib/helpers';
import { AiOutlineSearch } from 'react-icons/ai';

const Form = ({ handleSubmit, stations, loading, error }) => {
  // States
  const [date, setDate] = useState(dateNow());
  const [time, setTime] = useState(timeNow);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Filters
  const stationNames = stations.map((station) => station.name.split(' ').join('-'));
  const filteredFromSearch = filtered(stationNames, from);
  const filteredToSearch = filtered(stationNames, to);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(from, to, date, time);
      }}
    >
      <div className='mb-3 flex flex-col px-3'>
        <label htmlFor='vertrek' className='mb-2'>
          Vertrek
        </label>
        <input type='text' list='from' className='form-input px-2 py-2 rounded border' onChange={(e) => setFrom(e.target.value)} />
        <datalist id='from'>{from.length >= 2 && filteredFromSearch.map((el) => <option value={el} key={el} />)}</datalist>
      </div>
      <div className='mb-3 flex flex-col px-3'>
        <label htmlFor='bestemming' className='mb-2'>
          Bestemming
        </label>
        <input type='text' list='to' className='form-input px-2 py-2 rounded border' onChange={(e) => setTo(e.target.value)} />
        <datalist id='to'>{to.length >= 2 && filteredToSearch.map((el) => <option value={el} key={el} />)}</datalist>
      </div>
      <div className='mb-3 flex flex-col px-3'>
        <label htmlFor='date' className='mb-2'>
          Datum
        </label>
        <input type='date' className='form-input px-2 py-2 rounded border' value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className='mb-3 flex flex-col px-3'>
        <label htmlFor='time' className='mb-2'>
          Tijd
        </label>
        <input type='time' className='form-input px-2 py-2 rounded border' value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className='flex flex-col px-3'>
        <button
          disabled={loading}
          type='submit'
          className={`inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-3 ${
            loading ? 'cursor-progress' : null
          }`}
        >
          {loading ? (
            <div className='flex justify-center items-center'>
              <div className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            <div className='flex gap-2 justify-center items-center text-[16px]'>
              Zoeken
              <AiOutlineSearch />
            </div>
          )}
        </button>
        {error && <p className='text-red-500 pt-3'>Geen verbindingen gevonden</p>}
      </div>
    </form>
  );
};

export default Form;
