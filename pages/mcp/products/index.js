// import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Editor } from 'primereact/editor';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import XLSX from "xlsx";
// import * as XLSX from "xlsx";
import {
  deleteProduct,
  deleteProductImagee,
  EditeDescription,
  GetALLProducts,
  getClientss,
  getProductSpecs,
  GtALlCats,
  SaveProducts,
  saveProductSpecs,
  updateProduct,
  GetFilteredProducts,
} from "store/ControlPanal";
import Image from "next/image";
import { Image as ImagePrime } from "primereact/image";

import { Col, Container, Row } from "react-bootstrap";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import { TiDelete } from "react-icons/ti";
const AllProducts = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dt = useRef(null);
  // const [type , setType] = useState("");
  // const [color , setColor] = useState("");
  // const [type , setType] = useState("");
  // const [type , setType] = useState("");
  const dispatch = useDispatch();
  const {
    ALLProducts,
    AllCatsArr,
    ProvClientssArr,
    // ProductSpecsArr,
  } = useSelector((state) => state.ControlPanal);
  const { Url } = useSelector((state) => state.HomeSlice);
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
  // const [customers2, setCustomers2] = useState(null);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");

  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!ALLProducts) {
        dispatch(GetALLProducts());
      }
      if (!AllCatsArr) {
        dispatch(GtALlCats());
      }
      if (!ProvClientssArr) {
        dispatch(getClientss());
      }
    }
  }, [router, dispatch, AllCatsArr, ProvClientssArr, ALLProducts]);

  const onGlobalFilterChange2 = (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
  const renderHeader2 = () => {
    return (
      <div className="flex justify-content-end">
        <Button
          type="button"
          icon="pi pi-file-excel"
          // onClick={exportExcel}
          onClick={() => exportCSV(true)}
          // onClick={() => downloadExcel(ExportProduct)}
          className="p-button-success mr-2"
          data-pr-tooltip="XLS"
        />
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

  const exportCSV = (selectionOnly) => {
    // ExportProduct.exportCSV();
    dt.current.exportCSV();
    // ExportProduct
  };
  const header2 = renderHeader2();
  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.name}`}>
        {rowData.catName}
      </span>
    );
  };
  // const statuses =
  //   ALLProducts && Array.from(new Set(ALLProducts.map((a) => a.catName)));
  const statuses =
    AllCatsArr && Array.from(new Set(AllCatsArr?.map((a) => a.name)));
  console.log(statuses, AllCatsArr);
  const CatNameToIdMap = new Map();
  AllCatsArr?.forEach((cat) => CatNameToIdMap.set(cat.name, cat.id))
  // console.log(statuses)
  const statusRowFilterTemplate = (options) => {
    // console.log(options)
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => { options.filterApplyCallback(e.value); }}
        itemTemplate={statusItemTemplate}
        placeholder="اختار التصنيف"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const CompBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.company}`}>
        {rowData.company}
      </span>
    );
  };

  // CodeBody
  const CodeBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        {rowData.code}
      </span>
    );
  };
  // imagesBody
  const imagesBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        {rowData.imgs.imgs.map((ele, idx) => {
          return (
            <div className={styles.imageCOntainer} key={idx}>
              {/* <Image
                src={`${Url}/imgs?id=${ele}`}
                width={30}
                height={30}
                alt={idx}
              /> */}
              <ImagePrime
                src={`${Url}/imgs?id=${ele.small}`}
                alt={`${Url} ${ele.small}`}
                preview
                // onShow={`${Url}/imgs?id=${ele + 30}`}
                zoomSrc={`${Url}/imgs?id=${ele.large}`}
                width={30}
                height={30}
              />
            </div>
          );
        })}
      </span>
    );
  };

  const SpacificimagesBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        <div className={styles.imageCOntainer}>
          <Image
            src={`${Url}/imgs?id=${rowData.images[0]}`}
            width={100}
            height={100}
            alt={rowData.images[0]}
          />
        </div>
      </span>
    );
  };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    code: { value: null, matchMode: FilterMatchMode.CONTAINS },
    catName: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  // Selection TAbel
  const [selectedProduct1, setSelectedProduct1] = useState(null);

  // Dialog
  const [AddProduct, setAddProduct] = useState(false);
  const [UpdateDialog, SetUpdateDialog] = useState(false);
  const [DescriptionDialog, setDescriptionDialog] = useState(false);
  // DescriptionDialog

  const dialogFuncMap = {
    AddProduct: setAddProduct,
    UpdateDialog: SetUpdateDialog,
    DescriptionDialog: setDescriptionDialog,
  };
  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const renderFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            setCompanyID("");
            setCatID("");
            setName("");
            setCode("");
            setDescription("");
            setChecked(false);
            setActive(false);
            setImages([]);
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          // icon="pi pi-check"
          onClick={() => {
            onHide(name);
            SendData();
          }}
          autoFocus
        />
      </div>
    );
  };
  // Add New Product Form
  const [companyID, setCompanyID] = useState("");
  const [catID, setCatID] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState(``);
  const [images, setImages] = useState([]);

  const UploadImge = (file) => {
    // console.log(file[0]);
    const test = [...file];
    // console.log(test);
    test.map((ele) => {
      const reader = new FileReader();
      reader.readAsDataURL(ele);
      return (reader.onload = () => {
        // Make a fileInfo Object
        const baseURL = reader.result;
        const position = baseURL.search("base64,");
        const res = baseURL.slice(position + 7);
        setImages((current) => [...current, res]);
      });
    });
  };
  const DeletImage = (e) => {
    const result = images.filter((ele) => ele !== e);
    setImages(result);
  };
  const ProductsImage = images.length > 0 && images.map((ele, idx) => {
    const handleRadioChange = (event) => {
      console.log(`Selected image ID: ${ele.id}`);
      selectedImageId = ele.id;
    };
  
    return (
      <div className={styles.ImageDelete} key={idx}>
        <Image
          src={`data:image/jpeg;base64,${ele}`}
          width={50}
          height={50}
          alt={ele}
        />
        <input
          type="radio"
          id={`image-radio-${idx}`}
          name="image-radio"
          value={ele.id}
          onChange={handleRadioChange}
        />
        <TiDelete onClick={() => DeletImage(ele)} />
      </div>
    );
  });
  
  // const [CompanyID , setCompanyID] = useState("");
  const ParentCats =
    AllCatsArr && Array.from(new Set(AllCatsArr.map((a) => a)));
  const AllCompanies = ProvClientssArr && ProvClientssArr.map((a) => a);

  const [selectedCats, setSelectedCats] = useState(null);
  const [selectedComp, setSelectedComp] = useState(null);
  const selectedCatsTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };
  const onDropCatsChange = (e) => {
    // console.log(e.value)
    setSelectedCats(e.value);
    setCatID(e.value.id);
    // console.log(selectedCats)
  };
  const selectedCompTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const companyOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };
  // onDropCompChange
  const onDropCompChange = (e) => {
    setSelectedComp(e.value);
    setCompanyID(e.value.code);
    // console.log(e.value)
  };

  const onSelectedComTest = (e) => {
    const seletedTest = AllCompanies.filter(
      (ele) => ele.code === parseFloat(e.companyId)
    );
    const selectedCatTest =
      ParentCats && ParentCats.filter((ele) => ele.id === e.catId);

    // setSelectedComp(null);
    console.log(selectedCatTest[0])
    if (selectedCatTest[0] === null) {
      setSelectedCats(null);
    } else {
      setSelectedCats(selectedCatTest[0]);
    }

    if (seletedTest[0] === null) {
      setSelectedComp(null);
    } else {
      setSelectedComp(seletedTest[0]);
    }
  };
  // console.log(seletedTest)
  // console.log(seletedTest)
  let selectedImageId = null; // Define a variable to store the selected image's ID

  const SendData = () => {
    const data = {
      companyId: companyID ? parseInt(companyID) : null,
      catId: parseInt(catID),
      name,
      code,
      description,
      images,
      mainImage: selectedImageId, // Add the selected image's ID to the data
    };
  
    dispatch(SaveProducts(data))
      .unwrap()
      .then(() => {
        ShowSuccess("تمت الاضافة بنجاح");
        dispatch(GetALLProducts());
      });
  };
  console.log( "SaveProducts(data)" , SaveProducts(data))

  // UPDATE Dialog
  const renderUpdateFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            onHide(name);
            // setNameUpdate(selectedProduct1.name);
            // setOrderUpdate(selectedProduct1.ord);
            // setparentIDUpdate(selectedProduct1.parentId);
            // setID(selectedProduct1.id);
            // setUpdateImage1(selectedProduct1.activeIcon);
            // setUpdateImage2(selectedProduct1.disabledIcon);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          // icon="pi pi-check"
          onClick={() => {
            onHide(name);
            // UpdateData();
            SendUpdateData();
          }}
          autoFocus
        />
      </div>
    );
  };

  const [ProductID, setProductId] = useState("");
  const [updataName, setUpdateName] = useState("");
  const [updataCode, setUpdateCode] = useState("");
  const [updataDescription, setUpdateDescription] = useState("");
  const [updataImages, setUpdateImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);
  const UploadUpdateImges = (file) => {
    // console.log(file[0]);
    const test = [...file];
    // console.log(test);
    test.map((ele) => {
      const reader = new FileReader();
      reader.readAsDataURL(ele);
      return (reader.onload = () => {
        // Make a fileInfo Object
        const baseURL = reader.result;
        const position = baseURL.search("base64,");
        const res = baseURL.slice(position + 7);
        setUpdateImages((current) => [...current, res]);
      });
    });
  };

  const SendUpdateData = () => {
    const data = {
      companyId: companyID ? parseInt(companyID) : null,
      catId: parseInt(catID),
      id: ProductID,
      name: updataName,
      code: updataCode,
      active: +active,
      available: +checked,
      description: updataDescription,
      images: updataImages,
    };
    // console.log(data)
    dispatch(updateProduct(data))
      .unwrap()
      .then(() => {
        dispatch(GetALLProducts()).unwrap().then((res) => {
          // console.log(res)
          ShowSuccess("تم التعديل بنجاح");
        })
      });
  };

  const DeleteHandeller = () => {
    if (ProductID.toString().length > 0) {
      dispatch(deleteProduct(ProductID))
        .unwrap()
        .then(() => {
          setSelectedProduct1(null);
          ShowSuccess(" تم الحذف بنجاح");
        });
    }
  };

  const handlePageChange = async (event) => {
    const { filters, page } = event; 
    const formattedPage = page + 1;
    console.log("catid", CatNameToIdMap);
    const formatedFilters = {
      name: filters.name.value,
      catId: CatNameToIdMap.get(filters.catName.value),
      code: filters.code.value,
      page: formattedPage, 
    }
    dispatch(GetFilteredProducts(formatedFilters));
  }
  

  

  var handleFilterChange = (event) => {
    const { filters } = event;
    console.log("catid", CatNameToIdMap);
    const formatedFilters = {
      name: filters.name.value,
      catId: CatNameToIdMap.get(filters.catName.value),
      code: filters.code.value,
    }
    // console.log("filter", formatedFilters)
    dispatch(GetFilteredProducts({ ...formatedFilters, page: 0 }))
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  handleFilterChange = useCallback(debounce(handleFilterChange, 500), []);

  // setDescriptionDialog
  const renderDescriptionFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            onHide(name);
            // setNameUpdate(selectedProduct1.name);
            // setOrderUpdate(selectedProduct1.ord);
            // setparentIDUpdate(selectedProduct1.parentId);
            // setID(selectedProduct1.id);
            // setUpdateImage1(selectedProduct1.activeIcon);
            // setUpdateImage2(selectedProduct1.disabledIcon);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          // icon="pi pi-check"
          onClick={() => {
            onHide(name);
            // UpdateData();
            HandelSubmit();
          }}
          autoFocus
        />
      </div>
    );
  };
  // dispatch(getProductSpecs(e.value.id));
  // const [Desdata, setDesData] = useState([]);
  const [SpaceArr, setrSapceArr] = useState([]);

  const changeSpace = (data) => {
    const item =
      SpaceArr.length > 0 &&
      SpaceArr.filter((ele) => ele.specId !== data.specId);
    // console.log(item);
    setrSapceArr([...item, data]);
    // console.log(SpaceArr);
  };
  const productDescrip =
    SpaceArr.length > 0 &&
    [...SpaceArr]
      .sort((a, b) => b.specId - a.specId)
      .map((ele, idx) => {
        const val = SpaceArr.find((e) => e.specId === ele.specId);
        return (
          <div className={styles.input_Section} key={idx}>
            <label htmlFor={ele.specName}>{ele.specName}</label>
            <input
              type={"text"}
              id={ele.specName}
              value={val.value}
              onChange={(e) => {
                const data = {
                  productId: ele.productId,
                  specId: ele.specId,
                  ProductName: ele.ProductName,
                  specName: ele.specName,
                  value: e.target.value,
                };
                changeSpace(data);
                // console.log(data)
                dispatch(EditeDescription(data));
              }}
            />
          </div>
        );
      });
  const HandelSubmit = () => {
    dispatch(saveProductSpecs());
  };

  // const GetSearch = (e) => {
  //   console.log(e)
  // }
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
                  // onFilter={(e) => GetSearch(e)}
                  ref={dt}
                  scrollable
                  scrollHeight="60vh"
                  selectionMode="single"
                  selection={selectedProduct1}
                  value={ALLProducts}
                  onSelectionChange={(e) => {
                    setSelectedProduct1(e.value);
                    setCompanyID(e.value.companyId);
                    onSelectedComTest(e.value);
                    setCatID(e.value.catId);
                    setProductId(e.value.id);
                    setUpdateName(e.value.name);
                    setUpdateCode(e.value.code);
                    setUpdateDescription(e.value.description);
                    setOldImages(e.value.images);
                    setChecked(e.value.available);
                    setActive(e.value.active);
                  }}
                  paginator
                  onPage={handlePageChange}
                    // paginatorTemplate="CustomPagination"
                  onFilter={handleFilterChange}
                  className="p-datatable-customers"
                  rows={50}
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
                    exportable={false}
                    field="company"
                    header="الشركة"
                    filterField="company"
                    body={CompBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل اسم الشركة"
                  />
                  <Column
                    field="code"
                    header="الكود"
                    filterField="code"
                    body={CodeBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل كود المنتج"
                  />
                  <Column
                    exportable={false}
                    field="catName"
                    header="التصنيف"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                  />
                  <Column
                    exportable={false}
                    field="images"
                    header="الصور"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={imagesBody}
                  />
                  <Column
                    exportable={false}
                    field="images"
                    header="الصورة المختارة"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={SpacificimagesBody}
                  />
                  
                </DataTable>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={styles.ButnsSection}>
        <Button
          label="مواصفات المنتج"
          // icon="pi pi-external-link"
          onClick={() => {
            if (selectedProduct1) {
              dispatch(getProductSpecs(ProductID))
                .unwrap()
                .then((data) => {
                  setrSapceArr(data);
                  onClick("DescriptionDialog");
                });
            }
          }}
        />
        <Button
          label="اضافة "
          // icon="pi pi-external-link"
          onClick={() => {
            onClick("AddProduct");
            setSelectedComp(null);
            setSelectedCats(null);
          }}
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
          onClick={() => selectedProduct1 && handleShow()}
        />
      </div>
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
            <Dropdown
              value={selectedComp}
              options={AllCompanies}
              onChange={onDropCompChange}
              optionLabel="parentName"
              filter
              filterBy="parentName"
              placeholder="اختار الشركة"
              valueTemplate={selectedCompTemplate}
              itemTemplate={companyOptionTemplate}
              className={styles.DialogDrop}
            />
            <Dropdown
              value={selectedCats}
              options={ParentCats}
              onChange={onDropCatsChange}
              optionLabel="name"
              filter
              filterBy="name"
              placeholder="اختار المجموعة"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />
            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.input_Section}>
              <label htmlFor="code"> الكود</label>
              <input
                type={"number"}
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className={styles.input_Section}>
              <label htmlFor="description"> الوصف</label>
              {/* <textarea
                id="description"
                rows="5"
                cols="50"
                width={100}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              /> */}
              <Editor value={description}
                onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
            </div>

            <div className={styles.select_div}>
              <label htmlFor="img" className={styles.imageLabel}>
                اضف الصور{" "}
              </label>
              <input
                type="file"
                id="img"
                name="img"
                style={{ visibility: "hidden" }}
                multiple={true}
                accept="image/*"
                onChange={(e) => {
                  UploadImge(e.target.files);
                }}
              />
              <div className={styles.image_container}>{ProductsImage}</div>
            </div>
          </div>
        </Dialog>
        {/* Update Dialog */}
        <Dialog
          header="تعديل المجموعة"
          visible={UpdateDialog}
          onHide={() => onHide("UpdateDialog")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderUpdateFooter("UpdateDialog")}
        >
          <div className={styles.Dialog_Content}>
            <Dropdown
              value={selectedComp}
              options={AllCompanies}
              onChange={onDropCompChange}
              optionLabel="parentName"
              filter
              filterBy="name"
              placeholder="اختار الشركة"
              valueTemplate={selectedCompTemplate}
              itemTemplate={companyOptionTemplate}
              className={styles.DialogDrop}
            />
            <Dropdown
              value={selectedCats}
              options={ParentCats}
              onChange={onDropCatsChange}
              optionLabel="name"
              filter
              filterBy="name"
              placeholder="اختار المجموعة"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />

            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={updataName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>
            <div className={styles.input_Section}>
              <label htmlFor="code"> الكود</label>
              <input
                type={"number"}
                id="code"
                value={updataCode}
                onChange={(e) => setUpdateCode(e.target.value)}
              />
            </div>
            <div className={styles.input_Section}>
              <Checkbox
                inputId="binary"
                checked={checked}
                onChange={(e) => {
                  setChecked(e.checked);
                }}
              />
              <label htmlFor="binary" className={styles.labelcheck}>
                متاح
              </label>
            </div>
            <div className={styles.input_Section}>
              <label htmlFor="description"> الوصف</label>

              <Editor value={updataDescription}


                onTextChange={(e) => setUpdateDescription(e.htmlValue)} style={{ height: '320px' }} />


              {/* <textarea
                id="description"
                rows="5"
                cols="50"
                width={100}
                value={updataDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              /> */}
            </div>

            <div className={styles.select_div}>
              <label htmlFor="img">اضف الصور </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                multiple={true}
                accept="image/*"
                onChange={(e) => {
                  UploadUpdateImges(e.target.files);
                }}
              />
              <div className={styles.image_container}>
                {updataImages.length > 0 ? (
                  <div className={styles.imageCOntainer}>
                    {updataImages.map((ele, idx) => {
                      return (
                        <Image
                          key={idx}
                          src={`data:image/jpeg;base64,${ele}`}
                          width={50}
                          height={50}
                          alt={"update"}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className={styles.imageCOntainer}>
                    {oldImages.map((ele, idx) => {
                      return (
                        <div className={styles.ImageDelete} key={idx}>
                          <Image
                            src={`${Url}/imgs?id=${ele}`}
                            width={50}
                            height={50}
                            alt={"update"}
                          />
                          <TiDelete
                            onClick={() => {
                              dispatch(deleteProductImagee(ele));
                              const imageID = oldImages.filter(
                                (e) => e !== ele
                              );
                              setOldImages(imageID);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog>
        {/* Update Dialog */}
        <Dialog
          header="مواصفات المنتج"
          visible={DescriptionDialog}
          onHide={() => onHide("DescriptionDialog")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderDescriptionFooter("DescriptionDialog")}
        >
          <div className={styles.Dialog_Content}>
            {/* <form onSubmit={HandelSubmit}>
            
            <input type={"submit"} value={"حفظ"} />
            </form> */}
            {productDescrip}
          </div>
        </Dialog>
        <div className='modal-popup'>

        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title> هل تريد الحذف</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className={styles.DeletDIalog}>
              <Button variant="secondary" onClick={handleClose}>
                لا
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  DeleteHandeller();
                  handleClose();
                }}
              >
                نعم
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        </div>

      </>
    </div>
  );
};

export default AllProducts;
