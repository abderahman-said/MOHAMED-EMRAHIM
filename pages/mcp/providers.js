// import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  addClient,
  deleteClient,
  getClientss,
  updateClientss,
} from "store/ControlPanal";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

// import { useDispatch, useSelector } from "react-redux";
// import { GtALlCats } from "store/ControlPanal";

// import { CustomerService } from '../service/CustomerService';
const ProvidersCli = () => {
  const dispatch = useDispatch();
  const { ProvClientssArr } = useSelector((state) => state.ControlPanal);
  const { Url } = useSelector((state) => state.HomeSlice);
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

  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!ProvClientssArr) {
        dispatch(getClientss());
      }
    }
  }, [router, dispatch, ProvClientssArr]);

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

  // CodeBody
  const CodeBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        {rowData.code}
      </span>
    );
  };

  const SpacificimagesBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        <div className={styles.imageCOntainer}>
          <Image
            src={`${Url}/imgs?id=${rowData.image}`}
            width={100}
            height={100}
            alt={rowData.image}
            // placeholder="blur"
            // blurDataURL="blur"
          />
        </div>
      </span>
    );
  };
  //   const statuses = [
  //     'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
  // ];

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    catName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // 'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const [AddProduct, setAddProduct] = useState(false);
  const [UpdateDialog, SetUpdateDialog] = useState(false);
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const dialogFuncMap = {
    AddProduct: setAddProduct,
    UpdateDialog: SetUpdateDialog,
  };
  const renderFooter = (name) => {
    return (
      <div lassName={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            setName("");

            setImage("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            SendData();
          }}
          autoFocus
        />
      </div>
    );
  };
  // renderUpdateFooter
  const renderUpdateFooter = (name) => {
    return (
      <div lassName={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            setName("");

            setImage("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            SendUpdateData();
          }}
          autoFocus
        />
      </div>
    );
  };
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState(null);
  const [image, setImage] = useState(null);
  const UploadImge = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setImage(res);
    };
  };

  const SendData = () => {
    const data = {
      name,
      imageString: image,
    };

    // console.log(data);
    dispatch(addClient(data))
      .unwrap()
      .then(() => {
        dispatch(getClientss());
        setName("");
        setImage("");
      });
  };
  const SendUpdateData = () => {
    const data = {
      id: code,
      name,
      imageString: image,
    };

    dispatch(updateClientss(data))
      .unwrap()
      .then(() => {
        dispatch(getClientss());
        setName("");
        setImage("");
      });
  };
  const DeleteHandeller = () => {
    dispatch(deleteClient(code))
      .unwrap()
      .then(() => {
        ShowSuccess();
        // dispatch(getClientss());
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
                  selection={selectedProduct1}
                  onSelectionChange={(e) => {
                    setSelectedProduct1(e.value);
                    // console.log(e.value);
                    setCode(e.value.code);
                    setName(e.value.name);
                    setImage(e.value.image);
                  }}
                  value={ProvClientssArr}
                  paginator
                  className="p-datatable-customers"
                  rows={20}
                  dataKey="code"
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
                    header="الكود"
                    filterField="code"
                    body={CodeBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل كود المنتج"
                  />
                  <Column
                    field="images"
                    header="الصورة"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={SpacificimagesBody}
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="أضافة  "
                // icon="pi pi-external-link"
                onClick={() => onClick("AddProduct")}
              />
              <Button
                label="تعديل "
                // icon="pi pi-external-link"
                onClick={() => {
                  selectedProduct1 && onClick("UpdateDialog");
                }}
              />
              <Button
                label="حذف "
                // icon="pi pi-external-link"
                onClick={() => {
                  if (code) {
                    DeleteHandeller();
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <>
        <Dialog
          header="اضافة منتج جديد"
          visible={AddProduct}
          onHide={() => onHide("AddProduct")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("AddProduct")}
        >
          <div className={styles.Dialog_Content}>
            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.select_div}>
              <label htmlFor="img">اضف صورة </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadImge(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </Dialog>
        {/* Update */}
        <Dialog
          header="اضافة منتج جديد"
          visible={UpdateDialog}
          onHide={() => onHide("UpdateDialog")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderUpdateFooter("UpdateDialog")}
        >
          <div className={styles.Dialog_Content}>
            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.select_div}>
              <label htmlFor="img">اضف صورة </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadImge(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </Dialog>
      </>
    </div>
  );
};

export default ProvidersCli;
