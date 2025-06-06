import { useRef, useEffect, useState } from 'react';
import { InfoDetail } from '../components/InfoDetail';
import { PhotoSlider } from '../components/PhotoSlider';
import { ShareOptions } from '../components/ShareOptions';
import { mockProduct } from '../data/mockProduct';

const images = mockProduct.imagenes;

export default function DetailPage() {
return (
<div className="mx-auto py-6 px-20 w-full h-auto">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
    {/* Photo Slider */}
    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1">
      <div className="overflow-hidden h-auto">
    <PhotoSlider images={images} />
    </div>
    </div>
    
    {/* Product Info */}
    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 ">
      <div className="overflow-hidden">
      <InfoDetail/>
      </div>
      
      {/* Share Options */}
      <div className="overflow-hidden">
      <ShareOptions />
      </div>
    </div>
  </div>
 
</div>
  );
}
