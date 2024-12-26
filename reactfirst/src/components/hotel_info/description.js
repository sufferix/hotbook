import React from "react"; 
 
function DescriptionSection({ text }) { 
  return ( 
    <div className="description-section"> 
      <h3 className="section-title">Описание</h3> 
      <p className="description-text"> 
        {text || "Описание отсутствует."} 
      </p> 
    </div> 
  ); 
} 
 
export default DescriptionSection;
