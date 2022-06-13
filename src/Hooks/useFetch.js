import React from 'react';


const useFetch = async(url) => {
    const [loading, SetLoading] = React.useState(false);
    const [photos, SetPhotos] = React.useState([]);
     try {
        SetLoading(true);
        const respose = await fetch(url);
        const data = await respose.json();
        SetPhotos(data);
        SetLoading(false);
    } catch (error) {
        console.log(error);
    }
    return [photos, loading];
};
export default useFetch;
