import React, { useState } from "react";
import styles from "styles/Login.module.css";
import { GoToRegister, GoToSendCode } from "store/AuthSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Forget = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const ShowSuccess = () =>
    toast.success("تم تسجيل الدخول بنجاح", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
  const SendData = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      ShowError();
    } else {
      dispatch(GoToSendCode());
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
      <h1 className={styles.mainHeading}>إعادة ارسال كلمة السر</h1>
      <p className={styles.par}>
        يرجى ادخال بريدك الالكترونى لتلقى رابط لانشاء كلمة مرور جديدة عبر بريدك
        الالكترونى
      </p>
      <div className={styles.inputDiv}>
        <label htmlFor="email">البريد الاكتروني</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="البريد الالكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        name="Forget"
        type="submit"
        className={styles.submit_button}
        onClick={(e) => {
          SendData(e);
        }}
      >
        ارسال
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

export default Forget;
