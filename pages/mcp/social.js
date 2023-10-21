// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getSiteJson, updateSiteJson } from "store/ControlPanal";
import styles from "styles/CP.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Social = () => {
  const [face, setFace] = useState("");
  const [whats, setWhats] = useState("");
  const [messenger, setMessanger] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter()
  const { SiteJsonArr } = useSelector((state) => state.ControlPanal);
  const dispatch = useDispatch();
  const ShowSuccess = () =>
    toast.success(`تم الحفظ بنجاح`, {
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
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!SiteJsonArr) {
        dispatch(getSiteJson())
          .unwrap()
          .then((data) => {
            setFace(data.face);
            setWhats(data.whats);
            setMessanger(data.messenger);
            setPhone(data.phone);
          });
      } else {
        setFace(SiteJsonArr.face);
        setWhats(SiteJsonArr.whats);
        setMessanger(SiteJsonArr.messenger);
        setPhone(SiteJsonArr.phone);
      }
    }
  }, [router, dispatch, SiteJsonArr]);
  // useEffect(() => {
  //   if (!SiteJsonArr) {
  //     dispatch(getSiteJson())
  //       .unwrap()
  //       .then((data) => {
  //         setFace(data.face);
  //         setWhats(data.whats);
  //         setMessanger(data.messenger);
  //         setPhone(data.phone);
  //       });
  //   } else {
  //     setFace(SiteJsonArr.face);
  //     setWhats(SiteJsonArr.whats);
  //     setMessanger(SiteJsonArr.messenger);
  //     setPhone(SiteJsonArr.phone);
  //   }
  // }, [SiteJsonArr, dispatch]);

  const SendData = () => {
    const data = {
      face,
      whats,
      messenger,
      phone,
    };
    dispatch(updateSiteJson(data))
      .unwrap()
      .then((data) => {
        ShowSuccess();
        setFace(data.face);
        setWhats(data.whats);
        setMessanger(data.messenger);
        setPhone(data.phone);
      });
  };
  return (
    <div className={styles.CP_container}>
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
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminNav />
          </Col>
          <Col md={10}>
            <div className={styles.Dialog_Content}>
              <h1>وسائل التواصل </h1>

              <div className={styles.inputDiv}>
                <label htmlFor="face">
                  {" "}
                  <FaFacebook />
                </label>
                <input
                  type={"text"}
                  id="face"
                  value={face}
                  placeholder="فيسبوك"
                  onChange={(e) => setFace(e.target.value)}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="whats">
                  {" "}
                  <AiOutlineWhatsApp />
                </label>
                <input
                  type={"text"}
                  id="whats"
                  placeholder="واتس"
                  value={whats}
                  onChange={(e) => setWhats(e.target.value)}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="messenger">
                  {" "}
                  <FaFacebookMessenger />
                </label>
                <input
                  type={"text"}
                  id="messenger"
                  placeholder="ماسنجر"
                  value={messenger}
                  onChange={(e) => setMessanger(e.target.value)}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="phone">
                  {" "}
                  <BsFillTelephoneFill />
                </label>
                <input
                  type={"text"}
                  id="phone"
                  placeholder="الرقم"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Social;
