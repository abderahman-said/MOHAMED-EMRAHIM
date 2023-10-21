import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";
export const getServerSideProps = async (ctx) => {
  const result = await axios
    .post(`https://apps.mohamed-ibrahiem.com/rest/test.categories/getAllCategories`,{
        page : 0
    })
    .then((res) => res.data.cats);
    
  // const { data } = await res.data.products;
  const fields = await result.map((ele) => ({
    loc: `https://mohamed-ibrahiem.com/shop/${ele.id}/${ele.parentId}/${ele.name.replace(/\s/g, "-")}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: "daily",
  }));

  // console.log({ fields });
  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}