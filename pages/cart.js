import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteLine, finishCart, getCarts, updateCart } from "store/ShopSlice";
import styles from "styles/Cart.module.css";
// AiOutlineShoppingCart TiDelete
import { FaOpencart } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
// import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const { Url } = useSelector((state) => state.HomeSlice);

  const dispatch = useDispatch();
  const { CartsArr } = useSelector((state) => state.ShopSlice);
  useEffect(() => {
    const UserId = typeof window !== 'undefined' && window.localStorage.getItem("ib_ID") || 0;
    if (!CartsArr) {
      // dispatch(getCarts(25));
      dispatch(getCarts(UserId));
    }
  }, [dispatch, CartsArr]);

  const HandelerDelete = (e) => {
    const Data = {
      userId: typeof window !== 'undefined'&& window.localStorage.getItem("ib_ID"),
      productId: e,
    };
    dispatch(deleteLine(Data));
  };
  const ShowSuccess = () =>
    toast.success("تم عمل الطلب بنجاح", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const FinishCart = () => {
    const id = typeof window !== 'undefined' && window.localStorage.getItem("ib_ID");
  
    dispatch(finishCart(CartsArr.id))
      .unwrap()
      .then(() => {
        dispatch(getCarts(id));
        ShowSuccess();
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const IncressHandeller = (e) => {
    const UserId = typeof window !== 'undefined'&&  window.localStorage.getItem("ib_ID");
    const data = {
      UserId,
      productId: e,
      count: 1,
    };
    dispatch(updateCart(data))
      .unwrap()
      .then(() => {
        dispatch(getCarts(UserId));
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  const DecressHandeller = (e) => {
    const UserId = typeof window !== 'undefined'&&  window.localStorage.getItem("ib_ID");
    const data = {
      UserId,
      productId: e,
      count: -1,
    };
    dispatch(updateCart(data))
      .unwrap()
      .then(() => {
        dispatch(getCarts(UserId));
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const Data =
    CartsArr &&
    CartsArr.lines.map((ele, idx) => {
      return (
        <div key={idx} className={styles.item_product}>
          <div className={styles.item_info_container}>
            <div className={styles.Card_image}>
              <Image
                src={`${Url}/imgs?id=${ele.image}`}
                alt={ele.productName}
                width={150}
                height={150}
              />
            </div>
            <div className={styles.item_info}>
              <p>{ele.name}</p>
              {/* <p>{ele.total} ج</p> */}
              <div className={styles.Product_Count}>
                <button onClick={() => IncressHandeller(ele.productId)}>
                  +
                </button>
                <span>{ele.count}</span>
                <button onClick={() => DecressHandeller(ele.productId)}>
                  -
                </button>
              </div>
            </div>
          </div>
          <div
            className={styles.delete_product}
            onClick={() => HandelerDelete(ele.productId)}
          >
            <TiDelete className={styles.icon_delete} />
          </div>
        </div>
      );
    });
  const delivaryPrice = 15.0;
  // const Total = CartsArr && parseFloat(GetFromCartAarr.total) + 15;
  const TotalPrice = CartsArr && (
    <div className={styles.TotlaPrice}>
      <h3>الملخص</h3>
      <div>
        <p>السعر ( {CartsArr.length} عناصر )</p>
        <p>0 ج</p>
      </div>
      <div>
        <p>الشحن</p>
        <p>{delivaryPrice} ج</p>
      </div>
      <div>
        <p>السعر الكلي</p>
        <p>0</p>
      </div>
    </div>
  );
  return (
    <div className={styles.cart}>
      {/* <Head>
        <title>شركة محمد ابراهيم لتجارة الادوات الكهربائية</title>
        <meta
          name="description"
          content=" لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <link rel="canonical" href="https://mohamed-ibrahiem.com/" />

        <meta
          itemProp="name"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          itemProp="description"
          content=" لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta
          itemProp="image"
          content="https://apps.mohamed-ibrahiem.com/javax.faces.resource/logo.png.html?ln=imgs"
        />
        <meta
          property="og:url"
          rel="canonical"
          content="https://mohamed-ibrahiem.com/"
        />
        <meta property="og:url" content="https://mohamed-ibrahiem.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          property="og:description"
          content="mohamed ibrahiem  mohamed-ibrahiem لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta
          property="og:image"
          content="https://apps.mohamed-ibrahiem.com/javax.faces.resource/logo.png.html?ln=imgs"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="شركة محمد ابراهيم لتجارة الادوات الكهربائية"
        />
        <meta
          name="twitter:description"
          content="mohamed ibrahiem  mohamed-ibrahiem لمبه عاديه ليد 12 وات ابيض قلاووظ ضمان سنه اباليك مستورده اسبوت غاطس ثابت سى او بى وورم 5 وات فريم استرث دلايات مستورده كابلات كهربائيه اشكال واستخدامات مختلفه مسامير "
        />
        <meta
          name="twitter:image"
          content="https://apps.mohamed-ibrahiem.com/javax.faces.resource/logo.png.html?ln=imgs"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head> */}
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
      <div className={styles.main_Heading}>
        <h1>سلة المشتريات</h1>
        <span>
          <FaOpencart />
        </span>
      </div>
      <Container>
        {CartsArr && CartsArr.lines.length > 0 ? (
          <Row className={styles.center}>
            <Col md={7}>
              <div className={styles.Items_Container}>{Data}</div>
            </Col>
            <Col md={4}>
              {TotalPrice}
              <button
                className={styles.contaniue_to_Shop}
                onClick={() => FinishCart()}
              >
                حفظ
              </button>
            </Col>
          </Row>
        ) : (
          <Row className={styles.emptycenter}>
            <Col md={3}>
              <Image
                src="/images/empty.svg"
                alt="login"
                width={700}
                height={600}
              />
              <h2>لا يوجد منتجات في السلة</h2>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
