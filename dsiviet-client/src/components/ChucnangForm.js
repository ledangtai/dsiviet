import react, { useEffect, useState } from 'react'
import axios from 'axios'
import {store} from '../firebase'
import '../css/nhanvienform.css'
import { useForm } from "react-hook-form";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
function ChucnangFrom(){
    const[chucnang,setchucnang] = useState([]);
    const [on,setOn] = useState(false)
    const [fileUrl,setFileUrl] = useState('');
    const [onUpdate,setOnUpdate] = useState(false)
    const { register, handleSubmit, setValue } = useForm();
    const [danhmuc,setDanhMuc] = useState(null);
    
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "Listchucnanghoatdong")
          .then(response => {setchucnang(response.data); console.log(chucnang.length)})
          .catch(console.error())
         
    },[])
    const checkChucnang = (macnhd)=>{
        for(let i=0;i<chucnang.length;i++){
            if(chucnang[i].macnhd === macnhd)
            return true;
        }
        return false;
    }
 
    const onSubmit = async data => {
        const myData = {
            ...data,
            hinhanh:fileUrl,
            noidung:noidungeditor
        }
        const myAlterData = {
            macnhd:myData.macnhd,
            tieude:myData.tieude,
            noidung:myData.noidung,
            hinhanh:myData.hinhanh
        }
        if(onUpdate){
            console.log("update")
            console.log(fileUrl)
             axios.put(process.env.REACT_APP_API_KEY +'updateCNHD',myAlterData)
            .then(response =>{
                console.log(myData.noidung)
                setOn(!on)
                setOnUpdate(!onUpdate)
                axios.get(process.env.REACT_APP_API_KEY+'Listchucnanghoatdong')
                .then(response => setchucnang(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            if(checkChucnang(myData.macnhd)===true){
                alert('Trùng mã sản phẩm !!!')
                console.log('abc')
                return;
            }
             axios.post(process.env.REACT_APP_API_KEY +'insertCNHD',myAlterData)
            .then(response =>{
                console.log(response)
                console.log(myData.macnhd)
                setOn(!on)
                axios.get(process.env.REACT_APP_API_KEY+'Listchucnanghoatdong')
                .then(response => setchucnang(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
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
    const getInsertCNHD = ()=>{
        setOn(true); 
        setValue("macnhd",'')
        setValue("tieude",'')
        setValue("noidung",'')
        setFileUrl('')
        setValue("hinhanh",null)
    }
    const getUpdateCNHD = (sp)=>{
        setOn(true); 
        setOnUpdate(true)
        setValue("macnhd",sp.macnhd)
        setValue("tieude",sp.tieude)
        setValue("noidung",sp.noidung)
        setFileUrl('')
        setValue("hinhanh",sp.hinhanh)
    }
    const getDeleteCNHD = (macnhd)=>{
        let agree = window.confirm(`Bạn có muốn xóa macnhd = ${macnhd}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API_KEY+'deleteCNHD?macnhd='+  macnhd)
        .then(response => {
            console.log(macnhd)
            alert('Xóa Thành Công !!!')
            axios.get(process.env.REACT_APP_API_KEY+'Listchucnanghoatdong')
            .then(response => setchucnang(response.data) )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại'))
    }
    const [noidungeditor,setnoidungeditor] = useState('')
    const handleonChange = async (e,editor) =>{
         setnoidungeditor(editor.data)
    }
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">

        <p className={!on?"workplace_display":"d-none"} onClick={()=>getInsertCNHD()}><button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button></p>
        <div className={!on?"workplace_display":"d-none"}>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã Chức Năng</th>
                    <th scope="col">Tiêu Đề</th>
                    <th scope="col">Nội Dung</th>
                    <th scope ="col"> Hình Ảnh</th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {chucnang.map(sp =>{
                    return(
                    <tr key = {sp.macnhd}>
                        <th scope="row">{sp.macnhd}</th>
                        <td>{sp.tieude}</td>
                        <td style ={{width:"550px"}}>{ReactHtmlParser(sp.noidung)}</td>
                        <td><img style={{width:'100px', height:"150px"}} src = {sp.hinhanh} /></td>
                        <td style={{textAlign:'center'}}><span  onClick={()=> getDeleteCNHD(sp.macnhd)}><i className="fa fa-trash" style={{marginRight:'10%'}}></i></span><span  onClick={()=> getUpdateCNHD(sp)}><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
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
                                    <label>Mã Chức Năng</label>
                                    <input className="form-control" placeholder="Nhập Mã Chức Năng" {...register('macnhd',{ required: true})} name='macnhd' type="number" readOnly={onUpdate?true:false}  />
                                    <label>Tiêu Đề</label>
                                    <input className="form-control" placeholder="Nhập Tiêu Đề" {...register('tieude',{ required: true})}   name='tieude' />
                                    <label>Nội Dung</label><br/>
                                   
                                    <div style={{width:'100%'}}>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data="<p>Hello from CKEditor 5!</p>"
                                        onReady={ editor => {
                                            
                                            console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const datanoidung = editor.getData();
                                            setnoidungeditor(datanoidung);
                                            console.log( { event, editor, datanoidung } );
                                        } }
                                        onBlur={ ( event, editor ) => {
                                            console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ ( event, editor ) => {
                                            console.log( 'Focus.', editor );
                                        } }
                                    />
                                    </div>
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
export default ChucnangFrom