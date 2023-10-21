// import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Forget from "components/Auth/Forget";
// import Login from "components/Auth/Login";
// import NewPassword from "components/Auth/NewPassword";
// import Register from "components/Auth/Register";
// import ResendCode from "components/Auth/ResendCode";
import dynamic from "next/dynamic";
const Forget = dynamic(() => import("components/Auth/Forget.js"), {
  loading: () => <p>Loading ...</p>,
});
const Login = dynamic(() => import("components/Auth/Login.js"), {
  loading: () => <p>Loading ...</p>,
});
const NewPassword = dynamic(() => import("components/Auth/NewPassword.js"), {
  loading: () => <p>Loading ...</p>,
});
const Register = dynamic(() => import("components/Auth/Register.js"), {
  loading: () => <p>Loading ...</p>,
});
const ResendCode = dynamic(() => import("components/Auth/ResendCode.js"), {
  loading: () => <p>Loading ...</p>,
});
// RiLockPasswordFill
import styles from "styles/Login.module.css";
import Head from "next/head";
const Auth = () => {
  const { loginn, register, forget, sendcode, newpass } = useSelector(
    (state) => state.AuthSlice
  );
  return (
    <>
      <Head>
        
      </Head>
    <div>
      <div className={styles.login}></div>
      <Container>
        <Row className={styles.row_center}>
          <Col md={7}>
            <Image
              src="/images/login.webp"
              alt="login"
              width={700}
              height={600}
            />
          </Col>
          <Col md={4}>
            {loginn && <Login />}
            {register && <Register />}
            {forget && <Forget />}
            {sendcode && <ResendCode />}
            {newpass && <NewPassword />}
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Auth;
