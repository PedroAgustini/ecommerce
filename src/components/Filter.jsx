import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../store/slices/category.slice";
import { toggle } from "../store/slices/filter.slice";
import { filterCategory, getHomeThunk } from "../store/slices/home.slice";
import { togglePrice } from "../store/slices/searchPrice.slice";

const Filter = ({ categories }) => { 
    const dispatch = useDispatch();
    const toggleFilter = useSelector((state) => state.filter)
    const statePrice = useSelector((state) => state.togglePrice)
    const stateCategory = useSelector((state) => state.toggleCategory)
    console.log(categories)
    return (
        <div className={`filter ${toggleFilter ? "blockFilter" : "hiddenFilter"}`}>
            <div className="filter-container">
                <div className="filter-closed">
                    <button onClick={() => dispatch(toggle())} className="hiddenbtn"><i className="fa-solid fa-x"></i></button>
                </div>
                <div className="filter-title mt-1rem">
                    <h2>Filtros</h2>
                </div>
                <div className="filter-price">
                    <div className="price-title">
                        <h3>Precio</h3>
                        {statePrice ? <button><i className="fa-solid fa-angle-down" onClick={() => dispatch(togglePrice())}></i></button> : <button><i className="fa-solid fa-angle-up" onClick={() => dispatch(togglePrice())}></i></button> }
                    </div>
                    {statePrice && (
                        <div className="price-input">
                            <form action="">
                                <label htmlFor="">De:</label>
                                <input type="number" className="input-price padding-left-inputone"/>
                                <br/>
                                <label htmlFor="">Hasta:</label>
                                <input type="number" className="mt-1rem input-price padding-left-inputtwo"/>
                                <div className="btn-price">
                                    <button className="search-price color-white">Filtrar precios</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div className="filter-category">
                    <div className="category-title">
                        <h3>Categorias</h3>
                        {stateCategory ? <button><i className="fa-solid fa-angle-down" onClick={() => dispatch(toggleCategory())}></i></button> : <button><i className="fa-solid fa-angle-up" onClick={() => dispatch(toggleCategory())}></i></button> }
                    </div>
                    {stateCategory && (
                        <div className="mt-1rem">
                            <button className="category-option" onClick={() => dispatch(getHomeThunk())}>Todos</button>
                            {
                                categories.map((category) => (
                                    <button className="category-option" key={category.id} onClick={() => dispatch(filterCategory(category.id))}>{category.name}</button>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;