import { useRef, useEffect, useState } from 'react';
import { InfoDetail } from '../components/InfoDetail';
import { PhotoSlider } from '../components/PhotoSlider';
import { ShareOptions } from '../components/ShareOptions';
import { mockProduct } from '../data/mockProduct';

const images = mockProduct.imagenes;

export default function DetailPage() {
return (
<div className="max-w-6xl mx-auto p-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Photo Slider */}
    <PhotoSlider images={images} />
    
    {/* Product Info */}
    <div className="space-y-6">
      <InfoDetail/>
      
      {/* Share Options */}
      <ShareOptions />
    </div>
  </div>
 
</div>
  );
}
