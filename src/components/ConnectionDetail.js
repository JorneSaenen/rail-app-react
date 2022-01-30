import { BsInfoCircle } from 'react-icons/bs';

const ConnectionDetail = ({ connection, id }) => {
  console.log(connection);
  return (
    <div className='mt-9 border-dashed border-b-2 border-blue-400 pb-5'>
      <ol className='sm:flex'>
        <li className='relative mb-10 sm:mb-0 sm:min-w-[33%]'>
          <div className='flex items-center'>
            <div className='z-10 flex items-center justify-center w-7 h-7 rounded-full shrink-0'>
              <img src='/train.svg' alt='train' />
            </div>
            <div className='hidden sm:flex w-full bg-blue-600 h-0.5'></div>
          </div>
          <div className='mt-3 sm:pr-8 sm:mt-4'>
            <h3 className='flex items-center mb-1 text-xl font-semibold text-gray-800'>{connection.departure.station}</h3>
            <time className='text-md text-gray-500 font-semibold'>
              {new Date(+connection.departure.time * 1000).toLocaleDateString()} | {new Date(+connection.departure.time * 1000).toLocaleTimeString()}
            </time>
            <p className='mt-2 text-gray-500'>Trein: {connection.departure.vehicleinfo.shortname}</p>
            <p className='text-gray-500'>Platform: {connection.departure.platform}</p>
            <p className='text-gray-500'>Richting: {connection.departure.direction.name}</p>
          </div>
        </li>
        <li className='relative mb-10 sm:mb-0 sm:min-w-[33%]'>
          <div className='flex items-center'>
            <div className='z-10 flex items-center justify-center w-7 h-7 rounded-full shrink-0'>
              <img src='/stop.svg' alt='stop' />
            </div>
            <div className='hidden sm:flex w-full bg-blue-600 h-0.5'></div>
          </div>
          <div className='mt-3 sm:pr-8 sm:mt-4'>
            <h3 className='flex items-center mb-1 text-xl font-semibold text-gray-800'>Duur: {connection.duration / 60} min</h3>
            <time className='text-md text-gray-500'>Aantal tussenstops: {connection.departure.stops ? connection.departure.stops.number : 0}</time>
            <p className='mt-2 mb-2 text-gray-500'>Vertraging: {connection.departure.delay} min</p>
            {connection.departure.stops && (
              <ul className='mt-2 mb-2 text-gray-500'>
                {connection.departure.stops.stop.map((stop) => (
                  <>
                    <li className='font-semibold'>
                      Tussenstop {+stop.id + 1}: {stop.station}
                    </li>
                    <li className='pl-2 text-gray-800'>Aankomststijd: {new Date(+stop.scheduledArrivalTime * 1000).toLocaleTimeString()}</li>
                    <li className='pl-2 text-gray-800 pb-2'>Vertrektijk: {new Date(+stop.scheduledDepartureTime * 1000).toLocaleTimeString()}</li>
                  </>
                ))}
              </ul>
            )}
            <hr />
            {connection.departure.alerts && (
              <ul>
                <p className='mb-1 flex gap-2 items-center'>
                  <BsInfoCircle /> Extra info:
                </p>
                {connection.alerts.alert.map((alert) => (
                  <li className='text-red-500 pb-3 text-md'>{alert.description}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li className='relative sm:mb-0 sm:min-w-[33%]'>
          <div className='flex items-center'>
            <div className='z-10 flex items-center justify-center w-7 h-7 rounded-full shrink-0'>
              <img src='/train.svg' alt='train' />
            </div>
            <div className='hidden sm:flex w-full bg-blue-600 h-0.5'></div>
          </div>
          <div className='mt-3 sm:pr-8 sm:mt-4'>
            <h3 className='flex items-center mb-1 text-xl font-semibold text-gray-800'>{connection.arrival.station}</h3>
            <time className='text-md text-gray-500 font-semibold'>
              {' '}
              {new Date(+connection.arrival.time * 1000).toLocaleDateString()} | {new Date(+connection.arrival.time * 1000).toLocaleTimeString()}
            </time>
            <p className='mt-2 text-gray-500'>Aankomst platform: {connection.arrival.platform}</p>
            <p className='mt-2 text-gray-500'>Wandel afstand: {connection.arrival.walking} min</p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default ConnectionDetail;
