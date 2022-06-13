// Access key
// qi_g9Ep6XHt-2FuHXeq5NTyRsqhM1iDuqLdO2u_p0jM
// sceret key
// AtH_z3xOKNmbDXV_wCCOcnFScOMkT7wjDp6mXj31jUQ

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
function App() {
  const [loading, SetLoading] = useState(false);
  const [photos, SetPhotos] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const fetchImages = async () => {
    let url;
    url = `${mainUrl}${clientID}`;
    try {
      SetLoading(true);
      const respose = await fetch(url);
      const data = await respose.json();
      SetPhotos(data);
      SetLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos?.map((photo) => {
            console.log(photo);
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading ...</h2>}
      </section>
    </main>
  );
}

export default App;
