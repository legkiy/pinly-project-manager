import { RouterProvider } from 'react-router';
import { router } from './router';
import MuiThemeProvider from './MuiThemeProvider';

const ConfigLayput = () => {
  return (
    <MuiThemeProvider>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
};
export default ConfigLayput;
