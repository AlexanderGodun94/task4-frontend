import React from 'react';
import logo from 'assets/img/logo.png';

interface PropTypes {
  width?: string,
  height?: string,
  blocked?: boolean
}

export const Logo = ({ width = '286px', height = '66px', blocked = false }: PropTypes) => {


  return (
    <img
      src={logo}
      width={width}
      height={height}
      style={blocked ? { display: 'block' } : {}}
      alt={''}
    />
  );
};
