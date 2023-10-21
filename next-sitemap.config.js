/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mohamed-ibrahiem.com/",
  generateRobotsTxt: true,
  exclude: ["/products.index.xml" , "/categories.index.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://mohamed-ibrahiem.com/products.index.xml", // <==== Add here
      "https://mohamed-ibrahiem.com/categories.index.xml"
    ],
  },
};
