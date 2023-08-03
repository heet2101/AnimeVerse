import { addDoc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Watch, ThreeDots } from 'react-loader-spinner'
import { animeref } from './firebase/firebase'
import Swal from 'sweetalert'
import { appstate } from '../App';
import { useNavigate } from 'react-router-dom'

const Addmovie = () => {
    const Navigate=useNavigate();
    const useAppstate = useContext(appstate)
    const [Form, SetForm] = useState({
        title: "",
        year: "",
        img_link: "",
        about: "",
        rating: 0,
        rated: 0
    })
    const [Loading, SetLoading] = useState(false)
    const addmovie = async () => {
        if (useAppstate.login) {
            SetLoading(true);
            try {
                await addDoc(animeref, Form)
                Swal({
                    title: "new anime added successfully",
                    buttons: false,
                    icon: "success",
                    timer: 3000
                })
                SetForm({
                    title: "",
                    year: "",
                    img_link: "",
                    about: "",
                    rating: 0,
                    rated: 0,
                    IMDB_rating: 0
                })
            }

            catch (e) {
                Swal({
                    title: e,
                    buttons: false,
                    icon: "error",
                    timer: 3000
                })
            }
            SetLoading(false)
        }
        else{
            Swal({
                title: "You Are Not Logged in",
                buttons: false,
                icon: "info",
                timer: 3000
            })
            Navigate("/login")
        }
    }
    return (
        <div>
            <section class="text-gray-600 body-font relative ">
                <div class="container px-5 py-8 mx-auto">
                    <div class="flex flex-col text-center w-full">
                        <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white border-b-3 border-gray-300 ">Add Anime</h1>

                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-300">Title</label>
                                    <textarea id="message" name="message" value={Form.title} onChange={(e) => SetForm({ ...Form, title: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-300">IMDB rating</label>
                                    <input type="text" id="name" name="name" value={Form.IMDB_rating} onChange={(e) => SetForm({ ...Form, IMDB_rating: e.target.value })} class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-gray-300">Year</label>
                                    <input type="email" id="email" name="email" value={Form.year} onChange={(e) => SetForm({ ...Form, year: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-300">Img link</label>
                                    <textarea id="message" name="message" value={Form.img_link} onChange={(e) => SetForm({ ...Form, img_link: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>

                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-300">About Anime</label>
                                    <textarea id="message" name="message" value={Form.about} onChange={(e) => SetForm({ ...Form, about: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addmovie} class="flex mx-auto text-white bg-slate-600 border-0 py-2 px-8 mt-5 focus:outline-none cursor-pointer hover:bg-gray-700 transition-all duration-300 rounded text-lg">{Loading ? <ThreeDots height={30} width={30} color='white' /> : "add"}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Addmovie
