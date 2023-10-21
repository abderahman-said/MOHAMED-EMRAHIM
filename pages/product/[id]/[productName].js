import axios from "axios";
import Slider from "react-slick";
import { SiMessenger } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import "primeicons/primeicons.css";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, getCarts } from "/store/ShopSlice";
// import LastProducts from "/components/Home/LastProducts/LastProducts";
// SimillerProducts
import { Image as ImagePrime } from "primereact/image";
import Head from "next/head";
import styles from "/styles/ProductDetails.module.css";
import { useRouter } from "next/router";
// import SimillerProducts from "components/SimillerProducts/SimillerProducts";
import dynamic from "next/dynamic";
const SimillerProducts = dynamic(
  () => import("components/SimillerProducts/SimillerProducts"),
  {
    loading: () => <p>Loading ...</p>,
  }
);
import { ToastContainer, toast } from "react-toastify";
import { DeferredContent } from "primereact/deferredcontent";
import Link from "next/link";
// import ShareIcon from "components/Home/ShareICons/ShareICons";
const ShareIcon = dynamic(
  () => import("components/Home/ShareICons/ShareICons"),
  {
    loading: () => <p>Loading ...</p>,
  }
);
const Product = ({ product }) => {
  // console.log(product)
  const dispatch = useDispatch();
  const { Url } = useSelector((state) => state.HomeSlice);
  const [count, setCount] = useState(1);
  const router = useRouter();
  const mapimages = product && product.images;
  // const PathName = product.name.replace(/\s/g, "-");
  // const canonical = `https://mohamed-ibrahiem.com` + router.pathname;
  // console.log(router);
  // console.log(canonical);
  const settings = {
    customPaging: function (i) {
      return (
        <div className={styles.slickTrans}>
          <Image
            src={`${Url}/imgs?id=${mapimages[i + 0]}`}
            alt={`${product.name} ${i}`}
            width={50}
            height={50}
          // layout="fill"
          />
        </div>
      );
    },
    dots: true,
    // speed: 1000,
    autoplay: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // fade: true,
  };

  const ImageSlider =
    product &&
    product.imgs.imgs.map((ele, idx) => {
      return (
        <div key={idx}>
          <div className={styles.image_box_container}>
            <ImagePrime
              src={`${Url}/imgs?id=${ele.small}`}
              alt={`${product.name} ${ele.small}`}
              preview
              // onShow={`${Url}/imgs?id=${ele+30}`}
              zoomSrc={`${Url}/imgs?id=${ele.large}`}
              width={500}
              height={500}
            />
          </div>
        </div>
      );
    });
  const ShowSuccess = () =>
    toast.success("تم اضافة المنتج الي السلة ", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const Details =
    product &&
    product.specs.map((ele, idx) => {
      return (
        <tr key={idx}>
          <td>{ele.name}</td>
          <td>{ele.val}</td>
        </tr>
      );
    });
  const PathName = product.catName.replace(/\s/g, "-");
  const description = product.description;
  const ProductInformation = product && (
    <div className={styles.content} aria-hidden="true">
      <h1 className={styles.ProName}> {product.name}</h1>
      <div className={styles.price}>
        <p>تواصل معنا لمعرفة السعر</p>
        {/* {product.priceBefore > 0 && <del> {product.priceBefore}</del>} */}
      </div>
      <div className={styles.seller_info}>
        {/* <p
        // onClick={() => {
        //   const PathName =
        //     product && product.matgar.replace(/\s/g, "-");
        //   navigate(`/matgar/${product.matgarId}/${PathName}`);
        // }}
        >
          <span>البائع :</span>
          {product.matgar}
        </p> */}
        {/* matgarLogo */}

        <div className={styles.Social_icons}>
          <span aria-hidden="true">
            <a
              href={product.site.messenger}
              // href={`${ALLClientDetails.face}`}
              target="_blank"
              rel="noopener noreferrer"
              name="messanger"
              aria-label="messenger"
            >
              <SiMessenger />
            </a>
          </span>
          <span aria-hidden="true">
            <a
              href={product.site.face}
              target="_blank"
              rel="noopener noreferrer"
              name="facebook"
              aria-label="facebook"

            >
              <FaFacebookF />
            </a>
          </span>
          <span aria-hidden="true">
            <a
              href={`tel:${product.site.phone}`}
              // href={`${ALLClientDetails.face}`}
              target="_blank"
              rel="noopener noreferrer"
              name="phone"
              aria-label="phone"

            >
              <BsTelephoneFill />
            </a>
          </span>
          <span aria-hidden="true">
            <a
              href={`http://api.whatsapp.com/send?phone=${product.site.whats}`}
              // href={`${ALLClientDetails.face}`}
              target="_blank"
              rel="noopener noreferrer"
              name="whats"
              aria-label="whats"

            >
              <IoLogoWhatsapp />
            </a>
          </span>
        </div>
      </div>
      <p
        className={
          product.description.length > 0
            ? styles.description
            : styles.NonDescription
        }
      >
        {product.description.length > 0
          ? product.description
          : "اكتشف افضل المنتجات الحصرية "}
      </p>
      <p
        className={styles.cat_name}
        // onClick={() => {
        //   const PathName = product.catName.replace(/\s/g, "-");
        //   router.replace(
        //     `/shop/${product.catId}/${product.parentCatId}/${PathName}`
        //   );
        // }}
        aria-hidden="true"
      >
        <span>التصنيف :</span> <Link href={`/shop/${product.catId}/${product.parentCatId}/${PathName}`}>{product.catName}</Link>
      </p>

      <div className={styles.Product_add_to_cart}>
        <p className={styles.amount}>الكمية :</p>
        <div className={styles.Counter_section}>
          <div className={styles.Product_Count} aria-hidden="true">
            <button onClick={IncressHandeller}>+</button>
            <span>{count}</span>
            <button onClick={DecressHandeller} aria-hidden="true">-</button>
          </div>
          <div>
            <button
              aria-hidden="true"
              className={styles.add_to_cart_button}
              onClick={AddToCartHandeler}
            >
              اضف الى السلة
            </button>
          </div>
          {/* <button className={styles.add_to_favourite_button}>
            {" "}
            <BsHeart />
          </button> */}
        </div>
      </div>
      <ShareIcon />
    </div>
  );
  function IncressHandeller() {
    setCount((state) => state + 1);
  }

  // const IncressHandeller = () => {
  //   setCount((state) => state + 1);
  // }; AddToCart

  function AddToCartHandeler() {
    if (
      !window.localStorage.getItem("ib_ID") ||
      window.localStorage.getItem("ib_ID") === "0"
    ) {
      router.push("/auth");
    } else {
      const data = {
        UserId: window.localStorage.getItem("ib_ID"),
        productId: product.id,
        count,
      };
      dispatch(AddToCart(data)).then(() => {
        getCart();
        ShowSuccess();
      });
    }
  }

  const getCart = () => {
    const ID = window.localStorage.getItem("ib_ID");
    dispatch(getCarts(ID));
  };

  function DecressHandeller() {
    if (count === 1) {
      setCount(1);
    } else {
      setCount((state) => state - 1);
    }
  }

  // const getMatched = () => {
  //     console.log("success")
  // }
  return (
    <div className={styles.ProductDetails}>
      <Head>
        <title>{product.name}</title>
        <meta itemProp="name" content={`${product.name}`} />
        <meta
          name="description"
          content={`${product.description
            ? product.description.slice(0, 170)
            : product.name
            }`}
        />
        <meta
          itemProp="description"
          content={`${product.description
            ? product.description.slice(0, 170)
            : product.name
            }`}
        />
        {/* <link
          rel="canonical"
          content={canonical}

          // href={`https://mohamed-ibrahiem.com/shop/${product.id}/${PathName}`}
        /> */}
        <meta
          itemProp="image"
          content={`https://apps.mohamed-ibrahiem.com/imgs?id=${product.images[0]}`}
        />
        {/* <meta
          property="og:url"
          rel="canonical"
          content={canonical}
          // content={`https://mohamed-ibrahiem.com/shop/${product.id}/${PathName}`}
        /> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`https://apps.mohamed-ibrahiem.com/imgs?id=${product.images[0]}`}
        />
        <meta
          property="og:description"
          content={`${product.description
            ? product.description.slice(0, 170)
            : product.name
            }`}
        />
        <meta
          property="og:image"
          content={`https://apps.mohamed-ibrahiem.com/imgs?id=${product.images[0]}`}
        />

        <meta name="twitter:title" content={`${product.name}`} />
        <meta
          name="twitter:description"
          content={`${product.description
            ? product.description.slice(0, 170)
            : product.name
            }`}
        />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container >
        <Row className={styles.RowCenter}>

          <Col sm={12} md={5}>
            <Slider {...settings}>{ImageSlider}</Slider>
          </Col>


          <Col md={product.specs.length > 0 ? 4 : 6}>
            {ProductInformation}
          </Col>


          {product.specs.length > 0 && (
            <Col md={3}>
              <p className={styles.DetailsHeading}>مواصفات المنتج</p>
              <table className={styles.tabel_content}>
                <tbody>{Details}</tbody>
              </table>
            </Col>
          )}

        </Row>

        <Row>
          <section style={{ display: "flex", flexDirection: "column", boxShadow: 'rgba(0, 0, 0, 0.09) 0px 3px 12px', gap: "2rem", padding: "20px", borderRadius: "1pc" }}>
            <div style={{ color: '#9A5E9A', padding: "10px 30px", borderRadius: "1pc", border: "solid 1px ", boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.05)" }}>
              <h5>مواصفات المنتج</h5>
            </div>
            <div>

              {product.description ? product.description : product.name}

            </div>

          </section>
        </Row>
        <DeferredContent   >
          <h2 className={styles.MatchProductHeading}>منتجات مشابهه</h2>
          {/* <LastProducts list={product.matched} col={12} type={"pro"} /> */}
          <SimillerProducts
            list={product.matched}
            col={12}
            type={"pro"}
            item={5}
          />
        </DeferredContent>
      </Container>
    </div>
  );
};

export default Product;

export async function getServerSideProps({ params, res }) {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  // const Url = "http://192.168.0.201:8080/mohamedibrahim";
  const Url = "https://apps.mohamed-ibrahiem.com";
  // const {asPath } = ctx;
  // const {asPath} = {context};
  // console.log(asPath);
  const response = await axios
    .post(`${Url}/rest/test.product/getProductDetails/`, {
      id: params.id,
    })
    .then((res) => res.data);
  return {
    props: {
      product: response,
    },
  };
}
