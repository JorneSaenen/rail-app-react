import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import { baseURL, toCorrectDate, toCorrectTime } from './lib/helpers';
import ConnectionList from './components/ConnectionList';
import Title from './components/Title';

const App = () => {
  // States
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [connections, setConnections] = useState([]);
  // useEffect for all stations on init
  useEffect(() => {
    const getAllStations = async () => {
      try {
        const stationsResp = await axios(`${baseURL}/stations/?format=json&lang=nl`);
        setStations(stationsResp.data.station);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getAllStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (from, to, date, time) => {
    setError(false);
    if (from && to) {
      setLoading(true);
      try {
        const response = await axios(`${baseURL}/connections/?from=${from}&to=${to}&date=${toCorrectDate(date)}&time=${toCorrectTime(time)}&format=json&lang=nl`);
        const connectionsData = response.data.connection;
        setConnections(connectionsData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className='xl:container mx-auto min-h-full bg-pink-100'>
        <div className='grid grid-cols-4 gap-3'>
          <aside className='col-span-1  text-blue-600 border-r border-pink-200 min-h-screen'>
            <Title text='Bereken je route' />
            <Form handleSubmit={handleSubmit} stations={stations} loading={loading} error={error} />
          </aside>
          <main className='col-span-3'>
            <Title text='Routes' />
            <ConnectionList connections={connections} />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
