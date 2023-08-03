import { query, doc, getDocs, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Await, Link, useNavigate } from 'react-router-dom'
import { usersref } from './firebase/firebase'
import swal from 'sweetalert'
import { appstate } from '../App'


const Login = () => {
  let _data;
  const Navigate = useNavigate()
  const useappstate = useContext(appstate);
  const [Form, SetForm] = useState({
    mobile: "",
    password: ""
  })
  const [Loading, SetLoading] = useState(false)

  const hello = async () => {
    SetLoading(true)
    try {
      const quer = query(usersref, where('mobile', '==', Form.mobile));
      const querySnapshot = await getDocs(quer);
      // console.log(QuerySnapshot,"");
      querySnapshot.forEach((doc) => {
        _data = doc.data();
        console.log(_data.password, "llllllllllllllll");
      })
      if (_data.password == Form.password) {
        useappstate.setlogin(true)
        useappstate.setUserName(_data.Name)
        swal({
          text: "logged in",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        Navigate('/')

      }
      else {
        swal({
          text: "wrong password",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }


    } catch (error) {
      console.log(error)
      swal({
        text: "user not found",
        icon: "info",
        buttons: false,
        timer: 3000,
      });
    }
    SetLoading(false)

  }

  return (
    <div className='flex flex-col items-center mt-10 w-full'>
      <div className='text-2xl font-bold '> Login</div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">Mobile No.</label>
          <input type="number" id="message" name="message" value={Form.mobile} onChange={(e) => SetForm({ ...Form, mobile: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">Password</label>
          <input type='password' id="message" name="message" onKeyUp={(e) => {
            if (e.key == "Enter") {
              hello()
            }
          }} value={Form.password} onChange={(e) => SetForm({ ...Form, password: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
        </div>
      </div>
      <div class="p-2 w-full">
        <button onClick={hello} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 mt-5 focus:outline-none cursor-pointer hover:bg-green-700 transition-all duration-300 rounded text-lg">{Loading ? <ThreeDots height={30} width={30} color='white' /> : "Login"}</button>
      </div>
      <div className='mt-4'>
        <p>don't have account? <Link to={'/Signup'}><span className='text-blue-500'>Sign-up</span></Link></p>
      </div>
    </div>
  )
}

export default Login
