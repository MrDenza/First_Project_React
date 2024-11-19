import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const PageStart = () => {
          
    let [filmName,setFilmName]=useState("");

    let navigate = useNavigate();

    function goToFilmDetails() {
      const uri="/details/"+filmName;
      //const uri="/details/"+encodeURIComponent(filmName);
      console.log(uri);
      navigate(uri);
    }

    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        {/* <input type="text" value={filmName} onChange={ eo => setFilmName(eo.target.value) } /><br/>
        <input type="button" value="Search" onClick={goToFilmDetails} /> */}
      </div>
    );
    
};
