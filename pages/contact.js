import { Col, Container, Row } from "react-bootstrap";
import { BsTelephoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import styles from "styles/Contact.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteJson } from "store/ControlPanal";
import dynamic from "next/dynamic";
import { sevaMessage } from "../store/AuthSlice";
import { ToastContainer, toast } from "react-toastify";

// import dynamic from "next/dynamic";
const MApLocation = dynamic(
  () => import("components/MapLocation/MapLocation"),
  { loading: () => <p>Loading ...</p>, ssr: false }
);
const ContactUs = () => {
  const { SiteJsonArr } = useSelector((state) => state.ControlPanal);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const ShowError = () =>
  toast.error(`برجاء ادخال جميع البيانات`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  useEffect(() => {
    if (!SiteJsonArr) {
      dispatch(getSiteJson())
        .unwrap()
        .then((data) => {
          setPhone(data.phone);
        });
    } else {
      setPhone(SiteJsonArr.phone);
    }
  }, [SiteJsonArr, dispatch]);

  const sendData = (e) => {
    if (
      message.length <= 0 ||
      name.length <= 0 ||
      email.length <= 0 ||
      address.length <= 0
    ) {
      e.preventDefault();
      ShowError();
    } else {
      const UserId = window.localStorage.getItem("ib_ID") || 0;
      const data = {
        userId: parseInt(UserId),
        address: address,
        message: message,
        email: email,
      };
      dispatch(sevaMessage(data));
    }
  };

  return (
    <div className={styles.contact}>
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
      <Container>
        <Row className={styles.center}>
          <Col md={5}>
            <div className={styles.send_Form}>
              <h2>راسلنا</h2>
              <form>
                <div className={styles.input_div}>
                  <label htmlFor="name">اسم المستخدم</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.input_div}>
                  <label htmlFor="email">البريد الالكترونى </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.input_div}>
                  <label htmlFor="address">العنوان </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.input_div}>
                  <label htmlFor="message">الرسالة</label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
                <button
                  className={styles.submitBtn}
                  onClick={(e) => sendData(e)}
                >
                  ارسال
                </button>
              </form>
            </div>
          </Col>
          <Col md={5}>
            <div className={styles.info}>
              <h1>تواصل معانا</h1>
              <p>شركه محمد ابراهيم لتجاره الادوات الكهربائيه</p>

              <div className={styles.social}>
                <GoLocation />
                المحلة الكبرى - الزهراء - خلف مجمع المحاكم
              </div>
              <div className={styles.social}>
                <BsTelephoneFill />
                {phone}
              </div>

              <div className={styles.social}>
                <AiOutlineMail />
                admin@mohamed-ibrahiem.com
              </div>
            </div>
          </Col>
        </Row>
        <Col md={12}>
          <MApLocation />
          {/* <iframe
            src="https://maps.google.com/maps?q=30.96603893014795, 31.16160786961355&z=19&output=embed"
            // width="800"
            // height="400"
            // frameBorder="0"
            className={styles.location}
            style={{ border: 0 }}
          ></iframe> */}
        </Col>

        <div className={styles.loc}>
          <p>مكان الفرع</p>
          <p>المحلة الكبرى - الزهراء - خلف مجمع المحاكم </p>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
