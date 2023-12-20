import path from "path";
import fs from "fs/promises";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}> {product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

//This getStaticProps will first executed in build time during pre-rendering
// fetching data on client is not happening in client is happening on server
// getStaticProps function does not show in the sources page in the console because it's render into  the server

export async function getStaticProps(context) {
  console.log("Re-Generating....");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); //cwd is current working directory
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data.products.length === 0) {
    return {
      notFound: true,
    };
  }
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  return {
    props: {
      products: data.products,
    },
    //During in Development This page regenerate in every request. But in Production revalidation number matters.
    revalidate: 120,
  };
}

export default HomePage;
