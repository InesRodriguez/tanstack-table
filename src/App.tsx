import { FC } from 'react';
import { Outlet } from 'react-router';

 const App: FC = () => {
  return (
    <div>
      <h1>App test Tanstaxck table + query</h1>
      <Outlet />
    </div>
  );
};
export default App
