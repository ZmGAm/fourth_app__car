"use Client"
import React from 'react';
import { useState ,useEffect } from 'react';

import Axios  from 'axios';
import { imageDb } from './config';
const MyCustomForm = () => {

  const preset_key="cars-pics";
  const [error,setError]=useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState();
  const [filen, setFilen] = useState();
    const [userRegistration,setUserRegistration]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
     
    });
    // const posts_data="https://65db334b3ea883a152914d9b.mockapi.io/create-pools";
    const posts_data="https://car-pooling-761a7-default-rtdb.firebaseio.com/car-poolingfrom.json";
    const posts_pic="https://api.cloudinary.com/v1_1//dogabixdo/image/upload";
    
    // const [records,setRecords] =useState ([]); 
    const inputvalid= (e)=>{
        const name=e.target.name;
        const value=e.target.value;
        const file=e.target.files[0];
        console.log(name,value);

        setUserRegistration({...userRegistration,[name]:value});
        // setImage({...image,[name]:value});
         setFilen(file);
    }
    const submmit =(e)=>{
        e.preventDefault();
        const newRecord={...userRegistration,id: new Date().getTime().toString()};
        // const picture={...image,id: new Date().getTime().toString()};
       
        // console.log(records);
        // setRecords({...records,newRecord});
        setError(validate(userRegistration))
        
        setIsSubmit(true);
        // console.log(records);
        
        // console.log(picture);
        
        
        setUserRegistration({username:"",email:"",phone:"",password:""});
        // const dataArray = records.data || [];
        const formData =new FormData();
        formData.append('file',filen);
        formData.append('upload_preset',preset_key);
        Axios.post("https://api.cloudinary.com/v1_1//dogabixdo/image/upload",formData)
        .then(res=>setImage(res.data.secure_url))
        .catch(err=>console.log(err))
        try {
          // Make an API request to post form data
          const response =  Axios.post(posts_data,  newRecord);
          
          if (response.status === 201) {
            console.log('Data submitted successfully:', response.data);
            // Handle success (e.g., show a success message)
          } else {
            console.error('API request failed:', response.status);
            // Handle error (e.g., show an error message)
          }
        } catch (error) {
          console.error('Error during API request:', error);
          // Handle error (e.g., show an error message)
        }
      };
      
      // const postimage=async(picture)=>{
      //     const tasveer =new FormData();
      //     tasveer.append("file",image);
      //     tasveer.append("upload_preset","cars-pics");
      //     // tasveer.append("cloud_name","dogabixdo");
      //     const result =await Axios.post("https://api.cloudinary.com/v1_1//dogabixdo/image/upload",tasveer)
      //     .then(res=>console.log(res))
      //     .catch(err=>console.log(err));
      //     // console.log("use tasveer" ,result.tasveer);
      //     // console.log("use tasveer" ,result.tasveer);
        
      //     // setData(result.ima);


      //   }
      //   useEffect(()=>{
        
      //     postimage();

      //   },[]);
        const validate = (values) => {
          const errors = {};
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          if (!values.username) {
            errors.username = "Username is required!";
          }
          if (!values.email) {
            errors.email = "Email is required!";
          } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
          }
          if (!values.phone) {
            errors.phone = "Phone is required!";
          } else if (!regex.test(values.phone)) {
            errors.phone = "This is not a valid email format!";
          }
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
          } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
          }
          return errors;
        };

    
    return <> 
            <form action="" onSubmit={submmit} > 
                <div>
                        <label htmlFor="username">Fullname</label>
                        <input type="username" value={userRegistration.username}
                        onChange={inputvalid}
                        autoComplete='off' name="username" id="username" />
                        <p1 className="formerrors">{error.username}</p1>
                </div>
                <div>
                        <label htmlFor="email">email</label>
                        <input type="email"  value={userRegistration.email}
                        onChange={inputvalid}
                        autoComplete='off'name="email" id="email" />
                        <p1 className="formerrors">{error.email}</p1>
                </div>
                <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="phone"  value={userRegistration.phone}
                        onChange={inputvalid}
                        autoComplete='off'name="phone" id="phone" />
                        <p1 className="formerrors">{error.phone}</p1>
                </div>
                <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={userRegistration.password}
                        onChange={inputvalid}
                         autoComplete='off'name="password" id="password" />
                        <p1 className="formerrors">{error.password}</p1>
                </div>
                <div>
                        <label htmlFor="file">image</label>
                        <input type="file" value={userRegistration.Image}
                        onChange={inputvalid}
                         autoComplete='off'name="image" id="image" />
                        <p1 className="formerrors">{error.Image}</p1>
                </div>
                <button>submmit</button>
            </form>
            <div>
                {
                    
                    // data.map((curElem)=>{
                    //     const {id,username,email,phone,password}=curElem;
                    //     return( 
                            
                    //         <div>
                    //             <p>{username}</p>
                    //             <p>{email}</p>
                    //             <p>{phone}</p>
                    //             <p>{password}</p>
                    //         </div>
                    //     )
                    // })
                }
            </div>

</>
      
};
  
export default MyCustomForm;