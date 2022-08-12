import React, { useEffect, useState } from 'react';
import { InputGroup, Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux/';
import { useParams } from 'react-router-dom';
import { getHomeThunk } from '../store/slices/home.slice';
import { addProductsThunk } from '../store/slices/purchase.slice';


const ProductID = () => {
    const allProduct = useSelector(state => state.home)
    const [newProduct, setNewProduct] =useState({})
    const [quantity, setQuantity] = useState(1)


    const { id } = useParams();
    const dispatch = useDispatch();
    const [slider, setSlider] =useState(0);
    const similarProducts = useSelector(state => state.home);
    const [indexOne, setIndexOne] =useState(0);
    const [indexTwo, setIndexTwo] =useState(2);

    
    const [productSuggestd, setProductSuggestd] = useState([]);

    useEffect(() => {
        const prod = allProduct?.find(productItem => productItem.id === Number(id))
        setNewProduct(prod)

        const filterProducts = similarProducts?.filter(home => home.category.id === prod?.category?.id);
        setProductSuggestd(filterProducts);
        window.scrollTo(0, 0)
        },[allProduct]);


    useEffect(() => {
        dispatch(getHomeThunk())
        },[]);

    const lastProduct = productSuggestd.length;

    const prev = () => {
        setIndexOne(indexOne - 1);
        setIndexTwo(indexTwo - 1);
    }

    const next = () => {
        setIndexOne(indexOne + 1);
        setIndexTwo(indexTwo + 1);
    }

    const arr = productSuggestd.slice(indexOne, indexTwo);

    const rigth = () => {
        if (slider === 0) {
            setSlider(1);
        } else if (slider === 1) {
            setSlider(2);
        } else if (slider === 2) {
            setSlider(0);
        }
    }

    const left = () => {
        if (slider === 0) {
            setSlider(1);
        } else if (slider === 1) {
            setSlider(2);
        } else if (slider === 2) {
            setSlider(0);
        }
    }

    const product = (id) => {
        const prod = similarProducts?.find(productItem  => productItem.id === Number(id));
        setNewProduct(prod)
        setIndexOne(0)
        setIndexTwo(2)
        setSlider(0)
        window.scrollTo(0, 0)
    }

    const addCar = () => {
        const car = {
            id: newProduct.id,
            quantity: quantity,
        }
        dispatch(addProductsThunk(car))
    }

    return (
        <section>
            <div className='data-container'>
                <div className='data-title'>
                    <h1>{newProduct?.title}</h1>
                </div>
                <div className='category-container'>
                    <p> Category: {newProduct?.category?.name}</p>
                </div>
                <div>
                    <div className='data-container-img'>
                        <div className='data-img'>
                            <img className='img' src={newProduct?.productImgs?.[`${slider}`]} alt="" />
                        </div>
                        <div className='left-arrow' onClick={left}>
                            <i className='fa-solid fa-circle-chevron-left'></i>
                        </div>
                        <div className='rigth-arrow' onClick={rigth}>
                            <i className='fa-solid fa-circle-chevron-rigth'></i>
                        </div>
                    </div>
                </div>
                <div className='price-container'>
                    <p>${newProduct?.price} usd</p>
                </div>

                <>
                    <InputGroup className="mb-1 place">
                        <Form.Control
                            className='place-Holder'
                            placeholder="cantidad"
                            aria-label="cantidad"
                            aria-describedby="basic-addon2"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                        <Button onClick={addCar} className="add-Car" variant="outline-secondary" id="button-addon2">
                            Agregar a la compra
                        </Button>
                    </InputGroup>
                </>

                <div className='description-container'>
                    <p> {newProduct?.description} </p>
                </div>
                <div className='section-2'>
                    <p>Productos similares:</p>
                </div>
                    <div className='similar-products'>
                        <button className='left-arrow-mini' onClick={prev} disabled={indexOne === 0}>
                            <i className="fa-solid fa-circle-chevron-left"></i>
                        </button>
                        <button className='rigth-arrow-mini' onClick={next} disabled={indexTwo >= lastProduct}>
                            <i className="fa-solid fa-circle-chevron-right"></i>
                        </button>
                        {arr.map(similar => (
                            <div className='mini-card' key={similar.id} onClick={()=> product(similar.id)}>
                                <div className='img-mini-card'>
                                    <img src={similar.productImgs[0]} alt="" />
                                </div>
                                <div className='info-minicard'>
                                    <p>{similar.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
            
            </div>
        </section>
    );
};

export default ProductID;