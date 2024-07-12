import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import { useParams } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams<'coinId'>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId!)
    // { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: 'Price',
        //       data:
        //         data?.map((price) => ({
        //           x: price.time_close,
        //           y: price.close,
        //         })) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: { mode: 'dark' },
        //     chart: {
        //       height: 500,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: 'transparent',
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     stroke: {
        //       curve: 'smooth',
        //       width: 4,
        //     },
        //     xaxis: {
        //       axisTicks: {
        //         show: false,
        //       },
        //       axisBorder: {
        //         show: false,
        //       },
        //       labels: {
        //         show: false,
        //       },
        //       type: 'datetime',
        //       categories: data?.map((price) => price.time_close),
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     fill: {
        //       type: 'gradient',
        //       gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
        //     },
        //     colors: ['#0fbcf9'],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // />
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'Price',
              data:
                data?.map((price) => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            theme: { mode: isDark ? 'dark' : 'light' },
            chart: {
              height: 300,
              width: 300,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            stroke: {
              curve: 'smooth',
            },
            xaxis: {
              // axisTicks: {
              //   show: false,
              // },
              // axisBorder: {
              //   show: false,
              // },
              // labels: {
              //   show: false,
              // },
              type: 'datetime',
              categories: data?.map(
                (price) => (price.time_close as any) * 1000
              ),
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
