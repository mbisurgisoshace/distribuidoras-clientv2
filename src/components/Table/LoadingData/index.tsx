import React from 'react';
import Lottie from 'react-lottie';

import * as loadingAnimation from './table-loading.json';

export default function LoadingData() {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
      }}
      style={{
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      }}
      width={75}
      height={75}
    />
  );
}
