// import { getServerSideSitemap } from 'next-sitemap'
// import { GetServerSideProps } from 'next'
// import axios from "axios";
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // Method to source urls from cms
//   // const urls = await fetch('https//example.com/api')
//   const result = await axios.get(`https://apps.mohamed-ibrahiem.com/rest/test.product/getAllProducts`).then((res) => res.data);
//     console.log(result)
//   const fields = result.map((item) => ({
//     loc: `http://localhost:3000/${item.id}/${item.name}`,
//     lastmod: item.updatedAt,
//     priority: 0.7,
//     changefreq: "daily",
//   }));

//   // const fields = [
//   //   {
//   //     loc: 'https://example.com', // Absolute url
//   //     lastmod: new Date().toISOString(),
//   //     // changefreq
//   //     // priority
//   //   },
//   //   {
//   //     loc: 'https://example.com/shop/[id]/[catID]', // Absolute url
//   //     lastmod: new Date().toISOString(),
//   //     // changefreq
//   //     // priority
//   //   },
//   //   {
//   //     loc: 'https://example.com/product/[id]', // Absolute url
//   //     lastmod: new Date().toISOString(),
//   //     // changefreq
//   //     // priority
//   //   },
//   // ]

//   return getServerSideSitemap(ctx, fields)
// }

// // Default export to prevent next.js errors
// export default function Sitemap() {}

import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";
export const getServerSideProps = async (ctx) => {
  const result = await axios
    .get(`https://apps.mohamed-ibrahiem.com/rest/test.product/getAllProducts`)
    .then((res) => res.data.products);
    
  // const { data } = await res.data.products;
  const fields = await result.map((ele) => ({
    loc: `https://mohamed-ibrahiem.com/product/${ele.id}/${ele.name.replace(/\s/g, "-")}`,
    lastmod: ele.udat,
    priority: 0.7,
    changefreq: "daily",
  }));

  // console.log({ fields });
  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}
