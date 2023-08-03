import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewref, db } from './firebase/firebase';
import { addDoc, doc, updateDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert'
import { appstate } from '../App';
import { useNavigate } from 'react-router-dom';


const Review = ({ id }) => {
    const Navigate = useNavigate()
    const useAppstate = useContext(appstate)
    const [rating, Setrating] = useState(0);
    const [loading, setLoading] = useState(false)
    const [thoughts, SetThoughts] = useState("")
    const [loader, setloader] = useState(false)
    const [dep, setdep] = useState(false)
    const [data, setData] = useState([])
    const sendreview = async () => {
        if (useAppstate.login) {
            if (rating != 0) {
                setLoading(true)
                try {
                    await addDoc(reviewref, {
                        animeid: id,
                        name: useAppstate.userName,
                        rating: rating,
                        thoughts: thoughts,
                        timestamp: new Date().getTime()

                    })
                    const ref = doc(db, "anime", id);
                    const _c = await getDoc(doc(db, "anime", id))
                    const _D = _c.data()
                    let userRated = _D.rated
                    let prevRating = _D.rating
                    await updateDoc(ref, {
                        rating: prevRating + rating,
                        rated: userRated + 1
                    })
                    Setrating(0);
                    SetThoughts("");
                    Swal({
                        title: "review sent",
                        buttons: false,
                        icon: "success",
                        timer: 3000
                    })


                } catch (error) {
                    Swal({
                        title: error.message,
                        buttons: false,
                        icon: "error",
                        timer: 7000
                    })
                }
                setLoading(false)
                setdep((p) => !p)
            } else {
                Swal({
                    title: "Rating required",
                    buttons: false,
                    icon: "info",
                    timer: 2000
                })
            }
        }
        else {
            Swal({
                title: "You Are Not Logged in",
                buttons: false,
                icon: "info",
                timer: 3000
            })
            Navigate("/login")
        }
    }
    useEffect(() => {
        async function getData() {
            setData([])
            setloader(true)
            let q = query(reviewref, where('animeid', '==', id))
            const querySnapShot = await getDocs(q)

            querySnapShot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setloader(false)
        } getData()
    }, [dep])


    return (
        <div className='mt-6 w-full'>
            <p className='w-full flex flex-row items-center text-xl mb-3'>Your Rating :
                <span className='ml-2'>
                    <ReactStars
                        size={35}
                        half={true}
                        value={rating}
                        onChange={(rate) => Setrating(rate)}
                    />
                </span>
            </p>

            <input
                value={thoughts}
                onChange={(e) => SetThoughts(e.target.value)}
                placeholder='Share Your Thoughts About Anime...'
                className='w-full p-2 outline-none header' />

            <button onClick={sendreview} className='w-full bg-green-500 p-2 flex justify-center'>
                {loading ? <TailSpin height={25} color="white" /> : 'Share'}
            </button>
            {loader ? <div className='mt-6 flex justify-center'><ThreeDots color='white' height={10} /></div> :
                <div className='mt-4 border-t'>
                    {data.map((e, i) => {
                        return (
                            <div className='p-2 w-full border-b md:border-none  border-grey-500 header mt-2'>
                                <div className='flex items-center'>
                                    <p className='text-blue-500'>{e.name}</p>
                                    <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                                </div>
                                <ReactStars
                                    size={15}
                                    half={true}
                                    value={e.rating}
                                    edit={false}
                                />
                                <p>{e.thoughts}</p>
                            </div>
                        )
                    })}
                </div>}

        </div>
    )
}

export default Review
