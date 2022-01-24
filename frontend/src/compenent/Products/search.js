import React, {Fragment, useState} from 'react'
import "./search.css"
import { useNavigate  } from 'react-router-dom'

const Search = () => {
    const [state, setstate] = useState("")
    const navigate = useNavigate ()
    const searchHandler = (e)=>{
        e.preventDefault();
        if (state.trim()) {
            navigate(`/products/${state}`)
        } else {
            navigate('/products')
        }
    }
    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchHandler}>
                <input type="text" 
                placeholder='Search a product....' 
                onChange={(e)=>setstate(e.target.value)}/>
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search
