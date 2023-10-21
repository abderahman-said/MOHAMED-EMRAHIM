import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from "store/store";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import "styles/globals.css";
import Head from "next/head";
// import "styles/font.css";

const NavBar = dynamic(() => import("components/NavBar/NavBar"), {
  loading: () => <p>Loading ...</p>,
});
const Footer = dynamic(() => import("components/Footer/Footer"), {
  loading: () => <p>Loading ...</p>,
});
const LoadingScreen = dynamic(
  () => import("components/LoadingScreen/LoadingScreen"),
  { loading: () => <p>Loading ...</p>, ssr: false }
);

// import localFont from '@next/font/local'

// const roboto = localFont({
//   src: [
//     {
//       path: '../public/fonts/Cairo-Black.ttf',
//       weight: '300',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/Cairo-Medium.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/Cairo-Bold.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/Cairo-ExtraBold.ttf',
//       weight: '700',
//       style: 'normal',
//     },

//   ],
// })
function MyApp({ Component, pageProps, canonical }) {
  // console.log(canonical)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <Head>
        <title>شركة محمد ابراهيم لتجارة الادوات الكهربائية</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content=" لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <link rel="canonical" href={canonical} />

        <meta
          itemProp="name"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          itemProp="description"
          content=" لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta itemProp="image" content="/images/mlogo.webp" />
        <meta property="og:url" rel="canonical" content={canonical} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          property="og:description"
          content="mohamed ibrahiem  mohamed-ibrahiem لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta property="og:image" content="/images/mlogo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          name="twitter:description"
          content="mohamed ibrahiem  mohamed-ibrahiem لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta name="twitter:image" content="/images/mlogo.webp" />

        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          property="og:description"
          content=" لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta property="og:image" content="/images/mlogo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          name="twitter:description"
          content=" لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta name="twitter:image" content="/images/mlogo.webp" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900;1000&display=swap"
          rel=" stylesheet"
          // as="font"
          crossOrigin="anonymous"
        /> */}
        <meta
          name="google-site-verification"
          content="58hkVcd4B84I1ZIT9F3p1DSHDrqB5qpMotBXJMkJ78c"
        />
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        /> */}
        {/* <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css" /> */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        /> */}
      </Head>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Provider store={store}>
            <NavBar />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </Provider>
      )}
    </>
  );
}

MyApp.getInitialProps = ({ ctx }) => {
  // const isProd = process.env.NODE_ENV === "production";
  const base = "https://mohamed-ibrahiem.com";
  const { asPath } = ctx;
  const canonical = base + asPath;
  // console.log(canonical)
  return {
    canonical,
  };
};

export default MyApp;
