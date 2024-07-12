import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from '../api';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const Tr = styled.tr`
  color: ${(props) => props.theme.textColor};
  text-align: left;
  border-bottom: 1px solid #dddddd;
`;

const Th = styled.th`
  background-color: ${(props) => props.theme.accentColor};
  padding: 12px 15px;
`;

const Td = styled.td`
  padding: 12px 15px;
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useParams<'coinId'>();
  const { isLoading, data } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId!)
    // {
    //   refetchInterval: 5000,
    // }
  );
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <Table>
          <Tr>
            <Th>가격(USD)</Th>
            <Td>${data?.quotes.USD.price.toFixed(3)}</Td>
          </Tr>
          <Tr>
            <Th>총 시가</Th>
            <Td>${data?.quotes.USD.market_cap.toFixed(3)}</Td>
          </Tr>
          <Tr>
            <Th>거래량(24H)</Th>
            <Td>{data?.quotes.USD.volume_24h.toFixed(3)}</Td>
          </Tr>
          <Tr>
            <Th>변동(24H)</Th>
            <Td>{data?.quotes.USD.percent_change_24h.toFixed(2)}%</Td>
          </Tr>
          <Tr>
            <Th>변동(7D)</Th>
            <Td>{data?.quotes.USD.percent_change_7d.toFixed(2)}%</Td>
          </Tr>
          <Tr>
            <Th>최고가(USD)</Th>
            <Td>${data?.quotes.USD.ath_price.toFixed(3)}</Td>
          </Tr>
          <Tr>
            <Th>최고가날짜</Th>
            <Td>{data?.quotes.USD.ath_date}</Td>
          </Tr>
        </Table>
      )}
    </div>
  );
}

export default Price;
