import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase/firebase'
import { useParams } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'
import Review from './Review'



const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    img: "",
    description: "",
    rating: 0,
    rated: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _doc = doc(db, "anime", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false)
    } getData();
  }, [])

  return (
    <div className=' flex flex-col md:flex-row justify-center md:items-start items-center w-full p-4 mt-4 '>
      {loading ? <div className='h-96 flex justify-center items-center w-full'><ThreeCircles height={40} color='white' /></div> :
        <>
          <img className='h-96 block md:sticky top-24' src={data.img_link} />
          <div className='md:ml-4 ml-0 w-full md:w-1/2'>
            <h1 className='text-3xl font-bold text-white '>({data.title})<span className='text-xl'>{data.year}</span></h1>
            <h1 className='text-l mt-3 text-white'>IMDB rating:({data.IMDB_rating})</h1>
            <h1 className='flex items-center mt-3'><span className='text-white mr-2'>User Rating :</span>
              <ReactStars
                size={25}
                half={true}
                value={data.rating / data.rated}
                edit={false} /></h1>
            <p className='mt-3'>{data.about}</p>
            <hr className='mt-5'></hr>

            <Review id={id}/>
          </div>

        </>}
    </div >
  )
}

export default Detail
