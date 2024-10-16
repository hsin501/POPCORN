import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={['非常難看', '不好看', '還行', '好看', '非常好看']}
    />
    <StarRating size={24} color='red' className='test' defaultRating={3} />
  </React.StrictMode>
);
