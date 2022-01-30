import { useState, useEffect } from 'react';
import { baseURL, toCorrectDate, toCorrectTime } from './lib/helpers';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import Title from './components/Title';
import Form from './components/Form';
import ConnectionList from './components/ConnectionList';

const App = () => {
  // States
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [connections, setConnections] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);
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

  // Get Connections from input
  const handleSubmit = async (from, to, date, time) => {
    setError(false);
    if (from && to) {
      setLoading(true);
      try {
        const response = await axios(`${baseURL}/connections/?from=${from}&to=${to}&date=${toCorrectDate(date)}&time=${toCorrectTime(time)}&format=json&lang=nl`);
        const connectionsData = response.data.connection;
        setConnections(connectionsData);
        setSideOpen(false);
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
      <div className='bg-pink-200'>
        <div className='xl:container mx-auto min-h-full bg-pink-100 shadow-2xl font-body relative'>
          <div onClick={() => setSideOpen(!sideOpen)} className='text-2xl absolute left-3 top-3 cursor-pointer md:hidden z-[60]'>
            {sideOpen ? <AiOutlineCloseCircle /> : <GiHamburgerMenu />}
          </div>
          <div className='grid grid-cols-4 md:gap-3'>
            <aside
              className={`md:col-span-1 text-blue-600 border-r border-pink-200 min-h-screen md:static absolute -left-full md:left-0 ${
                sideOpen ? 'left-0' : '-left-full'
              } shadow-2xl md:shadow-none p-3 z-50 bg-pink-100 transition-all duration-300`}
            >
              <Title text='Bereken je route' />
              <Form handleSubmit={handleSubmit} stations={stations} loading={loading} error={error} />
            </aside>
            <main className='md:col-span-3 col-span-4 min-h-screen px-5'>
              <Title text='Trein routes' />
              {connections.length > 0 ? <ConnectionList connections={connections} /> : <img src='/treinfront.jpeg' alt='trein' className='rounded' />}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
