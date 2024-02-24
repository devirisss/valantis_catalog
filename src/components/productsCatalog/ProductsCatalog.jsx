import './productsCatalog.css';
import ProductsItem from "./ProductsItem";

const ProductsCatalog = ({ data }) => {

    return (
        <div className='catalog'>
            {data ?
                data().map(item => <ProductsItem product={item} key={item.id} />)
                :
                null
            }
        </div>
    )
}

export default ProductsCatalog;