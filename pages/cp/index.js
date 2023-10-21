// import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import ProfilePic from "components/Profile/ProfilePic";
import dynamic from "next/dynamic";
const ProfilePic = dynamic(() => import("components/Profile/ProfilePic"), {
  loading: () => <p>Loading ...</p>,
});
import styles from "styles/CP.module.css";
// import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, saveUserInfo } from "store/AuthSlice";
const ControlPanal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { userInfo } = useSelector((state) => state.AuthSlice);

  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "false" || !ISAdmin) {
      router.push("/");
    } else {
      const UID = window.localStorage.getItem("ib_ID");
      if (!userInfo) {
        dispatch(getUserInfo(UID))
          .unwrap()
          .then((data) => {
            setEmail(data.email);
            setName(data.name);
            setPhone(parseInt(data.phone));
            const PasswordUs = window.localStorage.getItem("ib_pass");
            setPassword(PasswordUs);
          });
      } else {
        setEmail(userInfo.mail);
        setName(userInfo.UserName);
        const PasswordUs = window.localStorage.getItem("ib_pass");
        setPassword(PasswordUs);
      }
    }
  }, [router, dispatch, userInfo]);

  const SendData = (e) => {
    e.preventDefault();
    const UID = parseFloat(window.localStorage.getItem("ib_ID"));
    const data = {
      name,
      email,
      phone,
      password: window.localStorage.getItem("ib_pass"),
      id: UID,
    };
    dispatch(saveUserInfo(data));
  };

  return (
    <div className={styles.CP_container}>
      <Container>
        <Row className={styles.center}>
          <Col md={5}>
            <ProfilePic name={name} />
            <form>
              <div className={styles.inputDiv}>
                <label htmlFor="name">اسم المستخدم</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="اسم المستخدم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="phone">رقم التليفون</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="رقم التليفون"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="email">البريد الالكتروني</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="البريد الالكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="password">كلمة السر</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="كلمة السر"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                name="login"
                type="submit"
                className={styles.submit_button}
                onClick={(e) => {
                  SendData(e);
                }}
              >
                حفظ
              </button>
              <button
                className={styles.go_to_regPage_button}
                name="go_to_regPage_button"
                type="button"
                onClick={() => {
                  router.push(`/cp/products`);
                }}
              >
                منتجات تم شرائها
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ControlPanal;
