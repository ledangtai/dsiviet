import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
import {store} from '../firebase'
import { useForm } from "react-hook-form";
function KhachhangForm(){
    const[khachhang,setkhachhang] = useState([]);
    const [on,setOn] = useState(false)
    const [onUpdate,setOnUpdate] = useState(false)
    const [fileUrl,setFileUrl] = useState('');
    const { register, handleSubmit, setValue } = useForm();
    const [check,setcheck] = useState(false)
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "Listkhachhang")
          .then(response => setkhachhang(response.data))
          .catch(console.error())
         
    },[check])
    const checkKhachhang = (makh)=>{
        for(let i=0;i<khachhang.length;i++){
            if(khachhang[i].makh === makh)
            return true;
        }
        return false;
    }
 
    const onSubmit = async data => {
        const myData = {
            ...data,
            hinhanh:fileUrl
        }
        const myAlterData = {
            makh:myData.makh,
            tenkh:myData.tenkh,
            linkweb:myData.linkweb,
            hinhanh:myData.hinhanh
        }
        if(onUpdate){

            console.log("update")
            console.log(fileUrl)
             axios.put(process.env.REACT_APP_API_KEY +'updateKhachhang',myAlterData)
            .then(response =>{
                console.log(myData.tieude)
                setOn(!on)
                setOnUpdate(!onUpdate)
                setcheck(true)
                axios.get(process.env.REACT_APP_API_KEY+'ListKhachhang')
                .then(response => setkhachhang(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            
            if(checkKhachhang(myData.makh)===true){
                alert('Trùng mã khách hàng !!!')
                console.log('abc')
                return;
            }
            else{
            axios.post(process.env.REACT_APP_API_KEY +'insertKhachhang',myAlterData)
            .then(response =>{
                console.log(response)
                console.log(myData.hinhanh)
                setOn(!on)
                setcheck(true)
                // axios.get(process.env.REACT_APP_API_KEY+'Listkhachhang')
                // .then(response => setkhachhang(response.data) )
                // .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
    }
    }
    const handleImage = async (e)=>{
  
        // code here
        var file = e.target.files[0];
       // console.log('dsds')
        const fileNameFirst = file?.name;
        const fileNameFinal = fileNameFirst?.replace(/ /g,'')
        var storageRef =  store.ref().child("tai/"+fileNameFinal)       
        await storageRef.put(file);
        store.ref().child('tai').child(fileNameFinal).getDownloadURL().then(url=> setFileUrl(url));
}
    const getInsertKH = ()=>{
        setOn(true); 
        setValue("makh",'')
        setValue("tenkh",'')
        setValue("linkweb",'')
        setFileUrl('')
        setValue("hinhanh",null)
    }
    const getUpdateKh = (kh)=>{
        setOn(true); 
        setOnUpdate(true)
        setValue("makh",kh.makh)
        setValue("tenkh",kh.tenkh)
        setValue("linkweb",kh.linkweb)
        setFileUrl('')
        setValue("hinhanh",kh.hinhanh)
    }
    const getDeleteKH = (makh)=>{
        let agree = window.confirm(`Bạn có muốn xóa makh = ${makh}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API_KEY+'deleteKhachhang?makh='+  makh)
        .then(response => {

            alert('Xóa Thành Công !!!')
            axios.get(process.env.REACT_APP_API_KEY+'ListKhachhang')
            .then(response => setkhachhang(response.data) )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại'))
    }
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
             <p className={!on?"workplace_display":"d-none"} onClick={()=>getInsertKH()}><button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button></p>
             <div className={!on?"workplace_display":"d-none"}>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã Khách Hàng</th>
                    <th scope="col">Tên Khách Hàng</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">WebSite </th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {khachhang.map(kh =>{
                    return(
                    <tr key = {kh.makh}>
                        <th scope="row">{kh.makh}</th>
                        <td>{kh.tenkh}</td>
                        <td><img style={{width:'100px'}} src = {kh.hinhanh} /></td>
                        <td>{kh.linkweb}</td>
                        <td style={{textAlign:'center'}}><span onClick={()=>getDeleteKH(kh.makh)}><i className="fa fa-trash" style={{marginRight:'10%'}}></i></span><span onClick={()=>getUpdateKh(kh)}><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
        <div className={on?"workplace_input":"d-none"}>
                <div className="card">
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <label>Mã Khách Hàng</label>
                                    <input className="form-control" placeholder="Nhập Mã Khách Hàng" {...register('makh',{ required: true})} name='makh' type="number" readOnly={onUpdate?true:false}  />
                                    <label>Tên Khách Hàng</label>
                                    <input className="form-control" placeholder="Nhập Tên Khách Hàng" {...register('tenkh',{ required: true})}   name='tenkh' />
                                    <label>Đường Link Website</label>
                                    <input className="form-control" placeholder="Nhập Link Website" {...register('linkweb',{ required: true})}  name='linkweb' />
                                   
                                    <label>Hình ảnh</label>
                                    <div className="form-group">
                                          <input className="form-control-file border" placeholder=""  name='hinhanh' type="file" onChange={handleImage}/>
                                    </div>
           
                                    <button className="btn btn-warning mt-4 mr-4 btn-input"   type="submit" >Cập Nhật</button>
                        
                                    <button className="btn btn-info mt-4 btn-input"  onClick={()=>setOn(!on)} type="button">Thoát</button>
                                  
                                </div>
                                <div className="col-6">
                                    
                                </div>
                            </div>
                            
                            {/* <CKEditor 
                                ref={register} name='motachitiet'
                            /> */}
                            
                            
                        </div>
                    </form>

                </div>
                </div>
                </div>
        </div>
    )
}
export default KhachhangForm;