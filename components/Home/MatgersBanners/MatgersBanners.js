// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getHeaderBanners } from "store/HomeSlice";
// import { Col, Row } from "react-bootstrap";
// import "aos/dist/aos.css";
// // import dynamic from "next/dynamic";
// // const MatgerCard = dynamic(() => import("../../MatgerCard/MatgerCard"), {
// //   loading: () => <p>Loading ...</p>,
// // });
// import MatgerCard from "../../MatgerCard/MatgerCard";
// import { DeferredContent } from "primereact/deferredcontent";
// const MatgersBanners = () => {
//   const { HeaderBannersArr } = useSelector((state) => state.HomeSlice);
//   const dispatch = useDispatch();
//   const onMatgerLoad = () => {
//     if (!HeaderBannersArr) {
//       dispatch(getHeaderBanners());
//     }
//   };
//   const Matgers =
//     HeaderBannersArr &&
//     HeaderBannersArr.map((ele, idx) => {
//       return (
//         <Col key={idx} md={4}>
//           <MatgerCard
//             id={ele.id}
//             link={ele.link}
//             name={ele.name}
//             img={ele.image}
//             logo={ele.image}
//             description={ele.description}
//           />
//         </Col>
//       );
//     });
//   return (
//     <DeferredContent onLoad={() => onMatgerLoad()}>
//       <Row>{Matgers}</Row>
//     </DeferredContent>
//   );
// };

// export default MatgersBanners;
