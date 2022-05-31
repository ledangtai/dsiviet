import react, { useEffect, useState } from 'react'
import  logo from '../img/logodsi.png'
import '../css/adminheader.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link } from 'react-router-dom';
function AdminHeader(){
  const [sl,setsl] = useState ([]);
  useEffect(() =>{
      axios.get(process.env.REACT_APP_API_KEY + 'Listtinnhan')
      .then (response => {setsl(response.data.length)})
  },[])
    return(
            <div className='header-admin d-flex justify-content-between align-items-center shadow-lg bg-white rounded '>   

                <div className="dsi-logo" >
                 <img src={logo}/>
                 </div>
                 <div className="input-group search-admin">
        <div className="form-outline">
          <input id="search-focus" type="search" className="form-control" />
        </div>
        <button type="button" className="btn btn-primary btn-admin">
          <i className="fa fa-search" />
        </button>
      </div>
                <div className ="d-flex justify-content-between align-items-center admin">
                <div className ="icon d-flex justify-content-between ">
                <i className="fa fa-facebook-f"></i>
                <i className="fa fa-bell"></i>
                <Link to = "/admin/tinnhan" style ={{color:'#007bb4', marginTop:'-5%'}}> <i className="fa fa-comments"><span>{sl}</span></i></Link>
                </div>
                <h4 className="employee-name" >ADMIN</h4>
                </div>
            </div>
    )
}
export default AdminHeader;