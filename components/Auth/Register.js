import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "styles/Login.module.css";
import { GotoLogin, sign } from "store/AuthSlice";
import { getCarts } from "store/ShopSlice";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
    if (
      name.length === 0 ||
      phone.length === 0 ||
      password.length === 0 ||
      email.length === 0
    ) {
      ShowError();
    } else {
      const data = {
        name,
        mail: email,
        phone,
        password,
      };
      dispatch(sign(data))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.Result === false) {
            ShowError(originalPromiseResult.Errors[0].errorMSG);
          } else {
            dispatch(getCarts(originalPromiseResult.UserID));
            if(originalPromiseResult.ISAdmin === false) {
              router.push("/cp");
            }else {
              router.push("/");
            }

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
      <h1 className={styles.mainHeading}>انشاء حساب </h1>
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
          SendDate(e);
        }}
      >
        تسجيل الدخول
      </button>
      <div className={styles.go_to_Register_Div}>
        <span> لديك حساب ؟</span>
        <button
          className={styles.go_to_regPage_button}
          name="go_to_regPage_button"
          type="button"
          onClick={() => {
            dispatch(GotoLogin());
          }}
        >
          تسجيل الدخول
        </button>
      </div>
    </form>
  );
};

export default Register;
