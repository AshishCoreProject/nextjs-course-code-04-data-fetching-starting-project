import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalePage() {
  const [sales, setSales] = useState();

  const { data, error } = useSWR(
    "https://nextjsproject-210c6-default-rtdb.firebaseio.com/sales.json"
  );
  console.log(data);

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to Load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>{sale.username}</li>
        ))}
      </ul>
    </>
  );
}

export default LastSalePage;
