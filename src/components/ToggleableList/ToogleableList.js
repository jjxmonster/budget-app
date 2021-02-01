import React, { Fragment, useState, useEffect } from 'react';

const Item = React.memo(({ item, onClickHandler, isActive }) => (
   <div>
      <item.Trigger onClick={onClickHandler} />
      {isActive && item.children}
   </div>
));

const ToogleableList = ({ items, clickRef }) => {
   const [selectedItem, setSelectedItem] = useState();

   useEffect(() => {
      clickRef.current = setSelectedItem;
   }, [clickRef, setSelectedItem]);

   return (
      <Fragment>
         {items.map(item => (
            <Item
               key={item.id}
               item={item}
               onClickHandler={setSelectedItem}
               isActive={selectedItem === item.id}
            />
         ))}
      </Fragment>
   );
};

export default React.memo(ToogleableList);
