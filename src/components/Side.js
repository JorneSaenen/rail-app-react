import Title from './Title';
import Form from './Form';

const Side = ({ sideOpen, handleSubmit, stations, loading, error }) => {
  return (
    <aside
      className={`md:col-span-1 text-blue-600 border-r border-pink-200 min-h-screen md:static absolute -left-full md:left-0 ${
        sideOpen ? 'left-0' : '-left-full'
      } shadow-2xl md:shadow-none p-3 z-50 bg-pink-100 transition-all duration-300`}
    >
      <Title text='Bereken je route' />
      <Form handleSubmit={handleSubmit} stations={stations} loading={loading} error={error} />
    </aside>
  );
};

export default Side;
