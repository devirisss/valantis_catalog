import './loader.css';
import LoaderImg from'../../images/loader.png';

const Loader = () => {

    return(
        <div className='loader'>
            <p>Загружаем...</p>
            <img src={LoaderImg}></img>
        </div>
    )
}

export default Loader;