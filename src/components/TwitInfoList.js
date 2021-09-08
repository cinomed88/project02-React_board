import React from 'react';
import TwitInfo from './TwitInfo';

function TwitInfoList(props) {
    const list = props.data.map(
      info => (
      <TwitInfo 
        key={info.id} 
        info={info} 
        removeData={props.removeData}
        updateData={props.updateData}
      />)
    );

    return (
      <div>
        {list}    
      </div>
    );
}
export default TwitInfoList;