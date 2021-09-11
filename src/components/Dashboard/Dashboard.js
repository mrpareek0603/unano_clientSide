import React,{useState,useEffect} from 'react'
import {Button,FormControl,TextField} from '@material-ui/core';
import { useHistory} from 'react-router-dom';
import axios from 'axios';
import '../Dashboard/Dashboard.css'
// import Form from 'react'

function Dashboard() {
    const history=useHistory();
    const [longurl,setLongUrl] = useState('');
    const [shorturl,setShortUrl] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('A message will be visible here');
    const [msgColor, setMsgColor] = useState('#dc3545');
    const [urlArray,setUrlArray] = useState([]);

      useEffect(() => {
         axios.get('http://localhost:5000/api/short').then(res=>{
             setUrlArray(res.data.payload);
             console.log(res)
         }).catch(err=>{
             
             setUrlArray([]);
         })
      }, [urlArray])

    const onClickHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/dashboard',{
            longurl,shorturl,password
        }).then(res=>{
            setMessage(res.data.msg);
            if(res.data.isSuccessfull)
            setMsgColor('#28a745');
            else{
                setMsgColor('#dc3545');
            }
        }).catch(err=>{console.log(err)});
    }

    const logOutHandler =()=>{
        localStorage.removeItem("id");
        
        alert('log out successful');
        history.push('/login');
    }
    return (
        <div>
            <div className="dashboard">
            <form className="form">
                <FormControl>
                <p><TextField value={longurl} onChange={e=>setLongUrl(e.target.value)}  name="url" type="url" placeholder="enter url" /></p>
                <p><TextField value={shorturl} onChange={e=>setShortUrl(e.target.value)}  name="url" type="text" placeholder="enter short url(optional)" /></p>
                {/* <p><TextField value={password} onChange={e=>setPassword(e.target.value)}  name="url" type="password" placeholder="enter password (optional)" /></p> */}

                <p><Button type="submit" onClick={onClickHandler} variant="contained"color="primary">Let's Do It</Button>
                <Button type="submit" onClick={logOutHandler} variant="contained"color="danger">Log Out</Button>
            </p>
            </FormControl>
            </form>
            </div>
            <div>
                <p className="dashboard" style={{color:msgColor}}>{message}</p>
            </div>
            {/* will show all the links */}
            <div className="table">
                <table>
                    <thead>
                        <td>Long Url</td>
                        <td>Short Url</td>
                    </thead>
                {
                    urlArray.map(url=>{
                        return(
                        <tr className="tar" >
                        <td>{url.destination}</td>
                        <td>{url.slug}</td>
                        </tr>)
                    })

                }
                </table>
            </div>
        </div>
    )
}

export default Dashboard
