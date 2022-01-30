import Title from './Title';
import ConnectionList from './ConnectionList';

const Main = ({ connections }) => {
  return (
    <main className='md:col-span-3 col-span-4 min-h-screen px-5'>
      <Title text='Trein routes' />
      {connections.length > 0 ? <ConnectionList connections={connections} /> : <img src='/treinfront.jpeg' alt='trein' className='rounded' />}
    </main>
  );
};

export default Main;
