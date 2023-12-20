import { useEffect, useState } from "react";

function LastSalePage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async function () {
    setIsLoading(true);
    const response = await fetch(
      "https://nextjsproject-210c6-default-rtdb.firebaseio.com/sales.json"
    );
    const data = await response.json();
    const transformedSales = [];

    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    setSales(transformedSales);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!sales) {
    return <p> No data is there</p>;
  }

  return (
    <>
      <ul>
        {sales?.map((sale) => (
          <li key={sale.id}>{sale.username}</li>
        ))}
      </ul>
    </>
  );
}

export default LastSalePage;
