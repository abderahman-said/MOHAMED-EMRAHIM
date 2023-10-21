import React from 'react';
import { Image } from "primereact/image";

const ImageDialog = ({img,altImg ,largIma}) => {
//   const { Url } = useSelector((state) => state.HomeSlice);
// 
    return (
        <Image
              src={img}
              alt={altImg}
              zoomSrc={largIma}
              // width="250"
              width={200}
              height={200}
              // layout="fill"
              preview
            />
    )
}
export default ImageDialog;