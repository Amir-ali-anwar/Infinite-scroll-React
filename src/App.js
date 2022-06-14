
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
function App() {
  const [loading, SetLoading] = useState(false);
  const [photos, SetPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query,Setquery]=useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const fetchImages = async () => {
    let url;
    let perpage = `&page=${page}`;
    let urlQuery=`&query=${query}`
    if(query){
      url = `${searchUrl}${clientID}${perpage}${urlQuery}`;
      
    }else{
      
      url = `${mainUrl}${clientID}${perpage}`;
    }
    try {
      SetLoading(true);
      const respose = await fetch(url);
      const data = await respose.json();
      SetPhotos((oldPhotos)=>{
        if(query){
          return [...oldPhotos,...data.results]

        }else{

          return [...oldPhotos,...data]
        }
      })
      SetLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page,query]);
  useEffect(() => {
    const event =window.addEventListener('scroll',()=>{
      let innerheight=window.innerHeight+window.scrollY
      let scrollHeight=document.body.scrollHeight
      if(!loading && innerheight>=scrollHeight-40){
        setPage((prevstate) => {
          return prevstate + 1;
        });
      }
    })
    return () => {
      window.removeEventListener('scroll',event)
    };
  }, []);
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" value={query} onChange={(e)=>Setquery(e.target.value)} />
          <button className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos?.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading ...</h2>}
      </section>
    </main>
  );
}

export default App;
