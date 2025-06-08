import { useRef, useEffect, useState } from 'react';
import { InfoDetail } from '../components/InfoDetail';
import { PhotoSlider } from '../components/PhotoSlider';
import { ShareOptions } from '../components/ShareOptions';
import { mockProduct } from '../data/mockProduct';
import { RelatedProducts } from '../components/RelatedProducts';

const { imagenes: images, videos } = mockProduct;

export default function DetailPage() {
return (
<div className="mx-auto py-6 px-15 w-full h-auto mt-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
    {/* Photo Slider */}
    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1">
      <div className="overflow-hidden h-auto">
    <PhotoSlider images={images} videos={videos} />
    </div>
    </div>
    
    {/* Product Info */}
    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1">
      <div className="overflow-hidden">
        <InfoDetail/>
        <ShareOptions />
      </div>
     
    </div>

    {/* Related Products */}
    <div className="lg:col-span-1 xl:col-span-2 2xl:col-span-2 ">
    <div className="overflow-hidden">
    <RelatedProducts />
    </div>
    </div>
  </div>
 
</div>
  );
}
