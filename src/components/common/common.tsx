import React, {CSSProperties, useState} from 'react';

interface Props {
  state:boolean;
}

export function OnlineStateDiv(props:Props){
  return(
    <div>
      {props.state?
        <div className={'available'}>空闲</div>:
        <div className={'full'}>忙碌</div>}
    </div>
  )
}

export const CenterCSS:CSSProperties = {width:'100%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}