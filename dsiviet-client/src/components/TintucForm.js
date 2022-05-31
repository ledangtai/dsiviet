import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
function TintucForm(){
    const[tintuc,settintuc] = useState([]);
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "Listtintucsukien")
          .then(response => settintuc(response.data))
          .catch(console.error())
         
    },[])
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
            <button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã TTSK</th>
              
                    <th scope="col">Tiêu Đề</th>
                    <th scope="col">Nội Dung</th>
                    <th scope="col">Hình Ảnh</th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {tintuc.map(cn =>{
                    return(
                    <tr key = {cn.mattsk}>
                        <th scope="row">{cn.mattsk}</th>
                  
                        <td style={{width:'200px'}}>{cn.tieude}</td>
                        <td>{cn.noidung}</td>
                        <td><img style={{width:'100px'}} src={cn.hinhanh} /></td>
                        <td style={{textAlign:'center'}}><span><i className="fa fa-trash" style={{marginRight:'10%'}}></i></span><span><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
    )
}
export default TintucForm;