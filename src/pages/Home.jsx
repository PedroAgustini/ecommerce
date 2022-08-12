import React, { useEffect, useState } from 'react';
import { getHomeThunk, inputSearchThunk } from '../store/slices/home.slice';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux';
import { toggle } from '../store/slices/filter.slice';
import Filter from '../components/Filter';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import ErrorSearch from '../components/ErrorSearch';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [inputValue, setInputValue] = useState("")
    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const phones = useSelector((state) => state.home) 
    
    useEffect(() => {
        dispatch(setIsLoading(true));
        dispatch(getHomeThunk())
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
        .then((res) => setCategories(res.data.data.categories))
        dispatch(setIsLoading(false));
    },[])
    useEffect(() => {
        if(inputValue === "") {
            dispatch(getHomeThunk())
        }
    },[inputValue])
    const submit = (e) => {
        e.preventDefault()
        dispatch(inputSearchThunk(inputValue.replace(inputValue[0],inputValue[0].toUpperCase())))
    }
    const lastIndex = page * 9
    const firstIndex = lastIndex - 9
    const sli = phones.slice(firstIndex, lastIndex)
    const lastPage = Math.ceil(phones.length / 9);
    return (
        <div className="home-container">
            <div>
                <form action="" className="form-search" onSubmit={submit}>
                    <input type="text" placeholder="¿Qué estás buscando?" className="input-search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    <button className="btn-search color-white"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
            <div className="btn-filter">
                <p className="bold">Total de productos: <span className="color-blue">{phones.length}</span></p>
                <button className="hiddenbtn" onClick={() => dispatch(toggle())}><i className="fa-solid fa-filter icon-filter"></i>Filtros</button>
            </div>
            <Filter categories={categories}/>
            <div className="list-product">
                {
                    sli.map((phone) => (
                        <div className="card" key={phone.id} >
                            <div key={phone.id} onClick={() => navigate (`/ProductID/${phone.id}`)} className="card-img">
                                <img src={phone.productImgs[0]} alt="image-cel" className="img-one"/>
                            </div>
                            <div className="card-info mt-1rem">
                                <div  onClick={() => navigate (`/ProductID/${phone.id}`)} className="info-model mt-05rem">
                                    <p className="bold p-small color-blue">MODELO</p>
                                    <p>{phone.title}</p>
                                </div>
                                <div className="info-flex mt-1rem">
                                    <div onClick={() => navigate (`/ProductID/${phone.id}`)} className="info-price">
                                        <p className="bold p-small color-blue">PRECIO</p>
                                        <p>{phone.price}$</p>
                                    </div>
                                    <div className="info-icon-car">
                                        <button onClick={() => navigate (`/ProductID/${phone.id}`)} className="btn-addcar"><i className="color-white fa-solid fa-cart-shopping icon-width"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {phones.length === 0 && <ErrorSearch/>}
            <div className="btn-pagination mt-1rem">
                <button type="button" className="pagination" onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                <button type="button" className="pagination" onClick={() => setPage(page + 1)} disabled={page === lastPage}>Siguiente</button>
            </div>
        </div>
    );
};
export default Home;