const ConnectionDetail = ({ connection }) => {
  return (
    <div>
      <p>{connection.departure.station}</p>
      <p>
        {new Date(+connection.departure.time * 1000).toLocaleDateString()} | {new Date(+connection.departure.time * 1000).toLocaleTimeString()}
      </p>
      <p>{connection.arrival.station}</p>
      <p>
        {new Date(+connection.arrival.time * 1000).toLocaleDateString()} | {new Date(+connection.arrival.time * 1000).toLocaleTimeString()}
      </p>
      <p>Duur: {connection.duration / 60} min</p>
      <hr />
    </div>
  );
};

export default ConnectionDetail;
