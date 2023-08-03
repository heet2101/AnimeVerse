import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import app, { usersref } from './firebase/firebase';
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs'
import { upload } from '@testing-library/user-event/dist/upload';
import { Icon } from '@mui/material';



const Signup = () => {
  const Navigate = useNavigate()
  const [Form, SetForm] = useState({
    Name: "",
    mobile: "",
    password: ""
  })
  const auth = getAuth(app)
  const [Loading, SetLoading] = useState(false)
  const [otpsent, setotpsent] = useState(false)
  const [OTP, setOTP] = useState("")

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => { },
    });
  };

  const requestOtp = () => {
    SetLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    signInWithPhoneNumber(auth, `+91${Form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setotpsent(true);
        SetLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function hello() {

    try {
      SetLoading(true);
      window.confirmationResult
        .confirm(OTP)
        .then(async (result) => {
         
          await addDoc(usersref,Form);
          swal({
            text: "thank you",
            icon: "success",
            buttons: false,
            timer: 3000

          })
          Navigate("/")
        })
        .catch((error) => {
          console.log(error);
          SetLoading(false);
        });
    } catch (error) {
      console.log(error);
      swal({
        text: error.message,
        icon: "error",
        timer: 3000
      })
      SetLoading(false);
    }
  }

  // const uploaddata = async()=>{
  //   const salt = bcrypt.genSalt(10);
  //   const hash = bcrypt.hashSync(Form.password, salt);
  //   await addDoc (usersref,{
  //     Name: Form.Name,
  //     password: hash,
  //     mobile: Form.mobile
  //   });
  // }



  return (
    <div className='flex flex-col items-center mt-10 w-full'>
      <div className='text-2xl font-bold  '> Sign-up</div>
      {otpsent ?
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">OTP</label>
              <input type="number" id="message" name="message" value={OTP} onChange={(e) => setOTP(e.target.value)} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
              <div class="p-2 w-full">
                <button onClick={hello} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 mt-5 focus:outline-none cursor-pointer hover:bg-green-700 transition-all duration-300 rounded text-lg">{Loading ? <ThreeDots height={30} width={30} color='white' /> : "confirm"}</button>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">Name</label>
              <textarea id="message" name="message" value={Form.Name} onChange={(e) => SetForm({ ...Form, Name: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">Mobile No.</label>
              <input type="number" id="message" name="message" value={Form.mobile} onChange={(e) => SetForm({ ...Form, mobile: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
            </div>
          </div>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">Password</label>
              <textarea id="message" name="message" value={Form.password} onChange={(e) => SetForm({ ...Form, password: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-11 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div class="p-2 w-full">
            <button onClick={requestOtp} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 mt-5 focus:outline-none cursor-pointer hover:bg-green-700 transition-all duration-300 rounded text-lg">{Loading ? <ThreeDots height={30} width={30} color='white' /> : "Get OTP"}</button>
          </div>
        </>
      }
      <div className='mt-4'>
        <p>Already have an account? <Link to={'/Login'}><span className='text-blue-500'>Login</span></Link></p>
      </div>
      <div id='sign-in-button'>

      </div>
    </div>
  )
}

export default Signup
