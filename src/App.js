// Access key
// qi_g9Ep6XHt-2FuHXeq5NTyRsqhM1iDuqLdO2u_p0jM
// sceret key
// AtH_z3xOKNmbDXV_wCCOcnFScOMkT7wjDp6mXj31jUQ

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
function App() {
  const [loading, SetLoading] = useState(false);
  const [photos,SetPhotos]=useState([])
  const fetchImages = async () => {
    let url;
    url = `${mainUrl}?client_id=qi_g9Ep6XHt-2FuHXeq5NTyRsqhM1iDuqLdO2u_p0jM`;
    try {
      SetLoading(true)
      const respose = await fetch(url);
      const data = await respose.json();
      SetPhotos(data);
      SetLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return <h2>stock photos starter</h2>;
}

export default App;
