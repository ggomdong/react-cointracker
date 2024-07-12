import { createBrowserRouter } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Price from './routes/Price';
import Chart from './routes/Chart';
import App from './App';
import { basename } from 'path';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Coins />,
        },
        {
          path: '/:coinId',
          element: <Coin />,
          children: [
            {
              path: '/:coinId/price',
              element: <Price />,
            },
            {
              path: '/:coinId/chart',
              element: <Chart />,
            },
          ],
        },
      ],
    },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
);

export default router;
