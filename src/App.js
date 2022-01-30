import { useState, useEffect } from 'react';
import { baseURL, toCorrectDate, toCorrectTime } from './lib/helpers';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import Side from './components/Side';
import Main from './components/Main';

const App = () => {
  // States
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [connections, setConnections] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);

  // useEffect for fetching all stations on initial load
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

  // Get Connections from input on submit
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
            <Side handleSubmit={handleSubmit} stations={stations} loading={loading} error={error} sideOpen={sideOpen} />
            <Main connections={connections} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
