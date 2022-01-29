import ConnectionDetail from './ConnectionDetail';

const ConnectionList = ({ connections }) => {
  return (
    <>
      {connections.map((connection) => (
        <ConnectionDetail connection={connection} key={connection.id} />
      ))}
    </>
  );
};

export default ConnectionList;
