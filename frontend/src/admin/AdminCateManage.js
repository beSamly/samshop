import AdminRouteLayout from "./AdminRouteLayout";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { getCategories, updateCategory, deleteCategory } from "./apiAdmin";
import Loader from "../core/Loader";

const AdminCateManage = () => {
    const { user, token } = isAuthenticated();
    const userId = user._id

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading]=useState(true)
    const [dummy, setDummy]=useState(0)

    useEffect(() => {
        
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
                setLoading(false)
            }
        });
    }, [dummy])

    const handleSubmit = (index) => (e) => {
        e.preventDefault()
        var productID = categories[index]._id
        var newName = categories[index].name
        e.target.parentNode.parentNode.querySelector('.input').setAttribute("disabled","disabled") 

        updateCategory(token, productID, userId, { name: newName }).then(res => {
            if (res.error) {
            } else {
                setDummy(dummy+1)
                // window.location.reload()
            }
        })

    }

    const handleChange = (index) => (e) => {
        console.log("handelcagne")
        var value = e.target.value
        var newArr = [...categories]
        newArr[index].name = value
        setCategories(newArr)
    }


    const editClick = (e) => {
        e.preventDefault()
        e.target.parentNode.parentNode.querySelector('.input').removeAttribute("disabled")
    }

    const handleDelete=(categoryId)=>(e)=>{
        deleteCategory( categoryId,userId , token).then(res=>{
            if(res.error){
                console.log("error in deleteCategory : ", res.error)
            } else{
                setDummy(dummy+1)
            }
        })
    }

    const showCategories = () => {
        return categories.map((c, index) => {
            return (
                <div className="col-3 px-2 my-2 row justify-content-center align-items-center">
                    <div className="form-control" >
                        <div>
                            <input className="form-control input" value={c.name} onChange={handleChange(index)} disabled="disabled" />
                            <div>
                                <button className="btn btn-primary px-2 py-1 mx-1" onClick={editClick}>Edit</button>
                                <button className="btn btn-warning px-2 py-1" onClick={handleSubmit(index)}>Submit</button>
                                <button className="btn btn-danger px-1 py-1" onClick={handleDelete(c._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <AdminRouteLayout>
            <Loader loading={loading}/>
            <div className="row admin-category-manage">
                {showCategories()}
            </div>
        </AdminRouteLayout>
    )
}

export default AdminCateManage