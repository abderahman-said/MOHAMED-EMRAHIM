import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { deleteUser, getUserss } from "store/ControlPanal";
import { Col, Container, Row } from "react-bootstrap";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { updateUserInfo, sign } from "store/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Clients = () => {
  const dispatch = useDispatch();
  const { UserssArr } = useSelector((state) => state.ControlPanal);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const ShowSuccess = () =>
    toast.success("تم الحذف بنجاح", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!UserssArr) {
        dispatch(getUserss());
      }
    }
  }, [router, dispatch, UserssArr]);

  // const TabelValue = customers2
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
  const renderHeader2 = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header2 = renderHeader2();
  const PhoneBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.phone}`}>
        {rowData.phone}
      </span>
    );
  };

  const EmaileBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.email}`}>
        {rowData.mail}
      </span>
    );
  };

  const StateBody = (rowData) => {
    return (
      <button
        className={styles.activeBtn}
        onClick={() => {
          // console.log(rowData.id)
          if (rowData.active === 1) {
            dispatch(deleteUser(parseInt(rowData.id)))
              .unwrap()
              .then(() => {
                ShowSuccess();
                dispatch(getUserss());
              });
          }
        }}
      >
        {rowData.active === 1 ? "الغاء" : "نشط"}
      </button>
    );
  };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [AddUser, setAddUser] = useState(false);
  const [UpdateDialog, SetUpdateDialog] = useState(false);
  // const [UpdateDialog, SetUpdateDialog] = useState(false);
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const dialogFuncMap = {
    AddUser: setAddUser,
    UpdateDialog: SetUpdateDialog,
    // DescriptionDialog: setDescriptionDialog,
  };
  const renderFooter = (name) => {
    return (
      <div lassName={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            // setName("");
            // setDescription("");
            // setImage("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            sendData();
          }}
          autoFocus
        />
      </div>
    );
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const sendData = () => {
    const data = {
      name,
      mail: email,
      phone,
      password,
    };
    console.log(mail, email)
    if (
      name.length === 0 ||
      phone.length === 0 ||
      password.length === 0 ||
      email.length === 0
    ) {
      console.log("error");
    } else {
      dispatch(sign(data))
        .unwrap()
        .then(() => {
          dispatch(getUserss());
        });
    }
  };
  // renderUpdateFooter
  const renderUpdateFooter = (name) => {
    return (
      <div lassName={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            // setName("");
            // setDescription("");
            // setImage("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            sendUpdate();
          }}
          autoFocus
        />
      </div>
    );
  };
  const sendUpdate = () => {
    const data = {
      id,
      name,
      mail: email,
      phone,
      password,
    };
    console.log(email, data.mail)
    dispatch(updateUserInfo(data))
      .unwrap()
      .then(() => {
        dispatch(getUserss());
      });
  };

  return (
    <div className={styles.Mcp}>
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
            <div className={styles.Tabel}>
              <div className="card">
                <DataTable
                  scrollable
                  scrollHeight="60vh"
                  selectionMode="single"
                  selection={selectedUser}
                  onSelectionChange={(e) => {
                    setSelectedUser(e.value);
                    setID(e.value.id);
                    setName(e.value.name);
                    setPhone(e.value.phone);
                    setEmail(e.value.mail);
                  }}
                  value={UserssArr}
                  paginator
                  className="p-datatable-customers"
                  rows={20}
                  dataKey="id"
                  filters={filters2}
                  filterDisplay="row"
                  responsiveLayout="scroll"
                  globalFilterFields={["name", "id", "status"]}
                  header={header2}
                  emptyMessage="برجاء الانتظار يتم جلب البيانات"
                >
                  <Column
                    field="name"
                    header="الاسم"
                    filter
                    filterPlaceholder="ادخل اسم المنتج"
                    style={{ minWidth: "12rem" }}
                  />
                  <Column
                    header="رقم التليفون"
                    filterField="phone"
                    body={PhoneBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل رقم التليفون "
                  />
                  <Column
                    header="الايميل"
                    filterField="mail"
                    body={EmaileBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل الايميل "
                  />
                  <Column
                    header="الحالة"
                    body={StateBody}
                    style={{ minWidth: "12rem" }}
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="أضافة "
                // icon="pi pi-external-link"
                onClick={() => onClick("AddUser")}
              />
              <Button
                label="تعديل "
                // icon="pi pi-external-link"
                onClick={() => {
                  selectedUser && onClick("UpdateDialog");
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <>
        <Dialog
          header="اضافة  "
          visible={AddUser}
          onHide={() => onHide("AddUser")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("AddUser")}
        >
          <div className={styles.Dialog_Content}>
            <div className={styles.input_Section}>
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
            <div className={styles.input_Section}>
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
            <div className={styles.input_Section}>
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
            <div className={styles.input_Section}>
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
          </div>
        </Dialog>
        <Dialog
          header="تعديل  "
          visible={UpdateDialog}
          onHide={() => onHide("UpdateDialog")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderUpdateFooter("UpdateDialog")}
        >
          <div className={styles.Dialog_Content}>
            <div className={styles.input_Section}>
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
            <div className={styles.input_Section}>
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
            <div className={styles.input_Section}>
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
            <div className={styles.input_Section}>
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
          </div>
        </Dialog>
      </>
    </div>
  );
};

export default Clients;
