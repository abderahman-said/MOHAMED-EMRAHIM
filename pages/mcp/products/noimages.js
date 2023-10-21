import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getWithNoImagess } from "store/ControlPanal";
import { Col, Container, Row } from "react-bootstrap";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { useRouter } from "next/router";
const WIthNoImages = () => {
  const dispatch = useDispatch();
  const { ALLProducts, WithNoImagessArr } = useSelector((state) => state.ControlPanal);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!ALLProducts) {
        dispatch(getWithNoImagess());
      }
    }
  }, [router, dispatch, ALLProducts]);
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
  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.name}`}>
        {rowData.catName}
      </span>
    );
  };
  const statusRowFilterTemplate = (options) => {
    // console.log(options)
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="اختار التصنيف"
        className="p-column-filter"
        showClear
      />
    );
  };

  // const WithNoImagessArr =
  //   ALLProducts && ALLProducts.filter((ele) => ele.images.length === 0);

  const statuses = WithNoImagessArr && WithNoImagessArr.map((a) => a.catName);
  // console.log(statuses)
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

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    catName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <div className={styles.Mcp}>
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
                  value={WithNoImagessArr}
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
                    header="الشركة"
                    filterField="company"
                    body={CompBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل اسم الشركة"
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
                    field="catName"
                    header="التصنيف"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                  />
                </DataTable>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WIthNoImages;
