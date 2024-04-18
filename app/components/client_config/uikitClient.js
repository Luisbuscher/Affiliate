"use client"

import { useEffect } from 'react';

function UikitClient() {
  useEffect(() => {
    // Importar os estilos do UIKit
    require('uikit/dist/css/uikit.min.css');
    
    // Importar o JavaScript do UIKit
    require('uikit/dist/js/uikit.min.js');
    require('uikit/dist/js/uikit-icons.min.js');
  }, []);

  return null;
}

export default UikitClient;