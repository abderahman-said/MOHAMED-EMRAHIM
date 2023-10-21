import React, { useState } from "react";
import styles from "styles/Login.module.css";
import { GoToForger, GoToRegister, Userlogin } from "store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { getCarts } from "store/ShopSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const ShowSuccess = () =>
  //   toast.success("تم تسجيل الدخول بنجاح", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });

  const ShowError = (e) => {
    if (!e) {
      toast.error("برجاء ادخال جميع البيانات", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const SendDate = (e) => {
    e.preventDefault();
    if (name.length === 0 || password.length === 0) {
      ShowError();
    } else {
      const data = {
        name,
        password,
      };
      dispatch(Userlogin(data))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.Result === false) {
            ShowError(originalPromiseResult.Errors[0].errorMSG);
          } else {
            dispatch(getCarts(originalPromiseResult.id));
            if (originalPromiseResult.isAdmin === false) {
              router.push("/cp");
            } else {
              router.push("/mcp/products");
            }
            // ShowSuccess();
          }
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    }
  };
  return (
    <form>
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
      <h1 className={styles.mainHeading}>تسجيل الدخول </h1>
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
        <label htmlFor="password"> كلمة السر</label>
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
          SendDate(e);
        }}
      >
        تسجيل الدخول
      </button>
      <button
        className={styles.forget_Pass}
        name="forgetPass"
        type="button"
        onClick={() => dispatch(GoToForger())}
      >
        هل نسيت كلمة السر ؟
      </button>
      <div className={styles.go_to_Register_Div}>
        <span>ليس لديك حساب ؟</span>
        <button
          className={styles.go_to_regPage_button}
          name="go_to_regPage_button"
          type="button"
          onClick={() => {
            dispatch(GoToRegister());
          }}
        >
          انشاء حساب
        </button>
      </div>
    </form>
  );
};

export default Login;
