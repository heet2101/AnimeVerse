import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { Watch } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { animeref } from './firebase/firebase';
import { Link } from 'react-router-dom';



const Cards = () => {
    const [Data, setData] = useState([]);
    const [loading, SetLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            SetLoading(true)
            const _data = await getDocs(animeref)
            _data.forEach((doc) => {
                setData((prev) => [...prev, { ...(doc.data()), id: doc.id }])
            })
            SetLoading(false)
        }
        getData();
    }, [])


    return (
        <div className='flex flex-wrap justify-between p-3 mt-2 '>
            {loading ? <div className='w-full flex justify-center items-center h-96'><Watch height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true} /></div> :
                Data.map((e, i) => {
                    return (
                        <Link to={`/Detail/${e.id}`}>
                            <div key={i} className='card shadow-lg p-2 hover:-translate-y-3 cursor-pointer ml-5  font-medium  mt-6 transition-all duration-500  rounded-lg'>
                                <img className='h-72 rounded-md mb-3' src={`${e.img_link}`} alt='img not found' />
                                <h1><span className='text-gray-500'>Name :</span> {e.title}</h1>
                                <h1 className='flex items-center'><span className='text-gray-500'>Rating :</span>
                                    <ReactStars
                                        size={20}
                                        half={true}
                                        value={e.rating / e.rated}
                                        edit={false} /></h1>
                                <h1><span className='text-gray-500'>IMDB Rating :</span> {e.IMDB_rating}</h1>
                                <h1><span className='text-gray-500'>Year :</span>  {e.year}</h1>
                            </div></Link>)
                })

            }</div>
    )
}

export default Cards
