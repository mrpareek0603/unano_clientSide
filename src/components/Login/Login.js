import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link,useHistory} from 'react-router-dom';
import {Button, FormControl,TextField} from '@material-ui/core';
import '../Signup/SignUp.css'
// import SignUp from '../Signup/SignUp';

function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('#dc3545');



    const onClickHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/user/login',{
            email,password
        }).then(res=>{
            localStorage.setItem('id',res.data.id);
            setMessage(res.data.msg);
                if(res.data.id!=null){
                    setMsgColor('#28a745');
                    history.push('/dashboard');
                }
                else{
                    setMsgColor('#dc3545');
                }
        }).catch(err=>console.log(err));
    }



    
    return (
        <div>
            <div className="signUp">
                {/* <h3>I am the Login Component</h3> */}
                    <p style={{color:msgColor}}>{message}</p>
                    <form>
                    <FormControl>
                        
                        <TextField id="standard-basic" onChange={e=>setEmail(e.target.value)} value={email} name="email" type="email" placeholder="email" label="Email" />
                        
                        <TextField id="standard-basic" onChange={e=>setPassword(e.target.value)} value={password} name="password" type="password" placeholder="password" label="password" />
                        
                        <Button type="submit" onClick={onClickHandler} variant="contained"color="primary">Login</Button>
                        <p>Don't have any account?</p>

                        <Link to="/signup">
                             <Button style={{alignSelf:"center"}}variant="contained"color="primary">Register</Button> 
                            
                        </Link>

                    </FormControl>
                </form>
            </div>
        </div>
    )
}

export default Login
