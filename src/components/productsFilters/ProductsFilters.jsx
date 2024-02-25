import './productsFilters.css';

const ProductsFilters = ({ post, setRequest, setFilter }) => {

  return (
    <div className='filters'>
      <h4>Фильтры</h4>
      <form onSubmit={(e) => post(e)} >
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value='price'>По цене</option>
          <option value='brand'>По бренду</option>
          <option value='product'>По наименованию</option>
        </select>
        <input required={true} onChange={(e) => setRequest(e.target.value)} placeholder='Введите запрос...'></input>
        <button className='button' type='submit'>
          Поиск
        </button>
      </form>
    </div>
  )
}

export default ProductsFilters;