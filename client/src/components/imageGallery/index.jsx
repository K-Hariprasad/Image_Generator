import React from "react";
import './style.scss'
function ImageGallery({ imgData }) {
  return (
    <section className="image-gallery">
      {imgData?.length > 0 &&
        imgData.map((item, i) => <img key={i} src={item.url} />)}
    </section>
  );
}

export default ImageGallery;
