const ProductsItem = ({ product }) => {

    return (
        <div className='item'>
            <p className='id'>{product.id}</p>
            <p className='brand'>{product.brand === null ? 'Неизвестный бренд' : product.brand}</p>
            <p className='product'>{product.product}</p>
            <p className='price'>{product.price}</p>
        </div>
    )
}

export default ProductsItem;