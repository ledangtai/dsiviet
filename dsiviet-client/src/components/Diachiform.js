import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
function DiachiForm(){
    const[diachi,setdiachi] = useState([]);
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "Listdiachi")
          .then(response => setdiachi(response.data))
          .catch(console.error())
         
    },[])
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
            <button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã Địa Chỉ</th>
                    <th scope="col">Tên Tỉnh</th>
                    <th scope="col">Địa chỉ cụ thể</th>
                    <th scope="col">Tel </th>
                    <th scope="col">Fax </th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {diachi.map(dc =>{
                    return(
                    <tr key = {dc.madc}>
                        <th scope="row">{dc.madc}</th>
                        <td>{dc.tentinh}</td>
                        <td>{dc.diachi}</td>
                        <td>{dc.tel}</td>
                        <td>{dc.fax}</td>
                        <td style={{textAlign:'center'}}><span><i className="fa fa-trash" style={{marginRight:'10%'}}></i></span><span><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
    )
}
export default DiachiForm;