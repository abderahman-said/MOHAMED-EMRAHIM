import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, getMessages } from "store/ControlPanal";
import { Col, Container, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Messages = () => {
  const dispatch = useDispatch();
  const { MessagesArr } = useSelector((state) => state.ControlPanal);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!MessagesArr) {
        dispatch(getMessages());
      }
    }
  }, [router, dispatch, MessagesArr]);

  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
  const ShowSuccess = (e) =>
    toast.success(`${e}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const renderHeader2 = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="البحث في اي مكان"
          />
        </span>
      </div>
    );
  };
  const header2 = renderHeader2();

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.mail}`}>
        {rowData.mail}
      </span>
    );
  };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    mail: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const renderFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="ok"
          onClick={() => {
            onHide(name);
          }}
          className="p-button-text"
        />
      </div>
    );
  };

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [iD, setID] = useState("");

  const DeleteHAndeller = () => {
    if (iD.toString().length > 0) {
      dispatch(deleteMessage(iD))
        .unwrap()
        .then(() => ShowSuccess("تم الحذف بنجاح "));
    }
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
      {/* Page Content */}
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminNav />
          </Col>
          <Col md={10}>
            <div className={styles.Tabel}>
              <div className="card">
                <DataTable
                  // head
                  // header={header}
                  scrollable
                  scrollHeight="60vh"
                  selectionMode="single"
                  selection={selectedProduct1}
                  onSelectionChange={(e) => {
                    setSelectedProduct1(e.value);
                    setName(e.value.name);
                    setMessage(e.value.message);
                    setID(e.value.id);
                    // const [updateImage2, setUpdateImage2] = useState("");
                  }}
                  value={MessagesArr}
                  paginator
                  className="p-datatable-customers"
                  rows={20}
                  dataKey="id"
                  filters={filters2}
                  filterDisplay="row"
                  responsiveLayout="scroll"
                  globalFilterFields={["name", "ord", "status"]}
                  header={header2}
                  emptyMessage="No customers found."
                >
                  <Column
                    field="name"
                    header=" الاسم"
                    filter
                    filterPlaceholder="ادخل الاسم "
                    style={{ minWidth: "12rem" }}
                  />
                  <Column
                    field="mail"
                    header=" الايميل"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={statusBodyTemplate}
                    filter
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="عرض  "
                onClick={() =>
                  message.length > 0 && onClick("displayResponsive")
                }
              />
              <Button label="حذف " onClick={() => DeleteHAndeller()} />
            </div>
          </Col>
        </Row>
      </Container>

      <>
        <Dialog
          header="عرض الرسالة"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("displayResponsive")}
        >
          <h2>{name}</h2>
          <p>{message}</p>
        </Dialog>
      </>
    </div>
  );
};

export default Messages;
