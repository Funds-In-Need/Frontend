"use client";
import React from 'react';
import { cacheExchange, createClient, fetchExchange, Provider, useQuery } from 'urql';

interface ExampleComponentProps {
  address: string;
}

// Create the GraphQL client
const client = createClient({
  url: 'https://gateway.thegraph.com/api/f1737e343238f9ec401c6295d9a58b54/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk',
  exchanges: [cacheExchange, fetchExchange],
});

// The GraphQL query with dynamic input
const QUERY = `
  query ($id: String!) {
    account(id: $id) {
      deposits {
        asset {
          symbol
        }
        amountUSD
        timestamp
      }
      borrows {
        asset {
          symbol
        }
        amountUSD
        timestamp
      }
    }
  }
`;

// The GraphQL query component
const ExampleComponent: React.FC<ExampleComponentProps> = ({ address }) => {
  // Execute the GraphQL query using the `useQuery` hook
  const [result] = useQuery({
    query: QUERY,
    variables: { id: address.toLowerCase() },
    pause: !address, // Pause the query if the address is not provided
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if account data is available
  if (!data?.account) {
    return <p>No data available for the given address.</p>;
  }

  // Calculate total deposits and borrows if data is available
  let totalDeposits = 0;
  let totalBorrows = 0;
  const monthlyDeposits: { [key: string]: number } = {};
  const monthlyBorrows: { [key: string]: number } = {};

  const oneYearAgoTimestamp = Math.floor(new Date().setFullYear(new Date().getFullYear() - 1) / 1000);

  // Helper function to format a timestamp to 'YYYY-MM'
  const getMonthKey = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  // Filter deposits and borrows from the past year if they exist
  const depositsLastYear = data.account.deposits
    ? data.account.deposits.filter((deposit: { timestamp: number }) => deposit.timestamp >= oneYearAgoTimestamp)
    : [];
  const borrowsLastYear = data.account.borrows
    ? data.account.borrows.filter((borrow: { timestamp: number }) => borrow.timestamp >= oneYearAgoTimestamp)
    : [];

  // Calculate total deposits and borrows and monthly totals
  depositsLastYear.forEach((deposit: { amountUSD: string; timestamp: number }) => {
    const monthKey = getMonthKey(deposit.timestamp);
    const amount = parseFloat(deposit.amountUSD);

    // Update total deposits
    totalDeposits += amount;

    // Update monthly deposits
    if (monthlyDeposits[monthKey]) {
      monthlyDeposits[monthKey] += amount;
    } else {
      monthlyDeposits[monthKey] = amount;
    }
  });

  borrowsLastYear.forEach((borrow: { amountUSD: string; timestamp: number }) => {
    const monthKey = getMonthKey(borrow.timestamp);
    const amount = parseFloat(borrow.amountUSD);

    // Update total borrows
    totalBorrows += amount;

    // Update monthly borrows
    if (monthlyBorrows[monthKey]) {
      monthlyBorrows[monthKey] += amount;
    } else {
      monthlyBorrows[monthKey] = amount;
    }
  });

  // Helper function to convert Unix timestamp to UTC+8
  const convertToUTC8 = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    // Format the date as day/month/year hours:minutes:seconds in UTC+8
    const formattedDate = date.toLocaleString("en-GB", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    });
    return formattedDate;
  };

  return (
    <div className='text-white'>
      <h3>Account Data:</h3>
      <>
        <p><strong>Total Deposits (USD):</strong> {totalDeposits.toFixed(2)}</p>
        <p><strong>Total Borrows (USD):</strong> {totalBorrows.toFixed(2)}</p>

        <h4>Monthly Deposits (Last Year):</h4>
        {Object.keys(monthlyDeposits).length > 0 ? (
          <ul>
            {Object.entries(monthlyDeposits).map(([month, amount]) => (
              <li key={month}>
                <strong>{month}:</strong> {amount.toFixed(2)} USD
              </li>
            ))}
          </ul>
        ) : (
          <p>No deposits found for the last year.</p>
        )}

        <h4>Monthly Borrows (Last Year):</h4>
        {Object.keys(monthlyBorrows).length > 0 ? (
          <ul>
            {Object.entries(monthlyBorrows).map(([month, amount]) => (
              <li key={month}>
                <strong>{month}:</strong> {amount.toFixed(2)} USD
              </li>
            ))}
          </ul>
        ) : (
          <p>No borrows found for the last year.</p>
        )}

        <h4>Deposits:</h4>
        {data.account.deposits && data.account.deposits.length > 0 ? (
          data.account.deposits.map((deposit: any, index: number) => (
            <div key={index}>
              <p>Asset: {deposit.asset.symbol}</p>
              <p>Amount (USD): {parseFloat(deposit.amountUSD).toFixed(2)}</p>
              <p>Timestamp: {convertToUTC8(deposit.timestamp)}</p>
            </div>
          ))
        ) : (
          <p>No deposits found.</p>
        )}

        <h4>Borrows:</h4>
        {data.account.borrows && data.account.borrows.length > 0 ? (
          data.account.borrows.map((borrow: any, index: number) => (
            <div key={index}>
              <p>Asset: {borrow.asset.symbol}</p>
              <p>Amount (USD): {parseFloat(borrow.amountUSD).toFixed(2)}</p>
              <p>Timestamp: {convertToUTC8(borrow.timestamp)}</p>
            </div>
          ))
        ) : (
          <p>No borrows found.</p>
        )}
      </>
    </div>
  );
};

// The wrapped component with the URQL provider
const WrappedExampleComponent: React.FC<{ address: string }> = ({ address }) => (
  <Provider value={client}>
    <ExampleComponent address={address} />
  </Provider>
);

export default WrappedExampleComponent;
