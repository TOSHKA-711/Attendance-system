"use client"

import React from 'react';
// import DocumentUpload from './upload/page';
import dynamic from 'next/dynamic';

const DocumentUpload = dynamic(() => import('./upload/page'), {
    ssr: false,
  });

const Document = () => {
    return (
        <div>
            <DocumentUpload/>
        </div>
    );
}

export default Document;
