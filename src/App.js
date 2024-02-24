import './App.css';
import axios from "axios";
import axiosRetry from 'axios-retry';
import md5 from "md5";
import { useEffect, useState } from "react";
import ProductsHeader from "./components/productsHeader/ProductsHeader";
import ProductsFilters from "./components/productsFilters/ProductsFilters";
import Pagination from "./components/productsCatalog/Pagination";
import Loader from "./components/loader/Loader";


axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => {
    console.log(error.response);
    const requestBody = JSON.parse(error.config.data);
    console.error(`Method ${requestBody.action}, error identifier is ${error.response.data}`);
    return true;
  }
  });

function App() {

  const [filteredItems, setFilteredItems] = useState(null);
  const [request, setRequest] = useState(null);
  const [filter, setFilter] = useState('price');
  const [loading, setLoading] = useState(true);


  function getCurrentDate () {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0].replaceAll('-', '');
    return formattedDate;
  }

  const requestUrl = 'http://api.valantis.store:40000/';

  const requestHeaders = {
    headers: {
      'X-Auth': md5(`Valantis_${getCurrentDate()}`),
    }
  }

  useEffect(() => {
    axios.post(requestUrl,
      {
        "action": "get_ids",
        "params": {
          "offset": 0,
          "limit": 1000
        }
      },
      requestHeaders
    )
      .then((response) => getItems(response))
  }, []
  )

  async function getData() {
    await axios.post(requestUrl,
      {
        "action": "filter",
        "params": {
          [filter]: filter == 'price' ? +request : request
        }
      },
      requestHeaders
    )
      .then((response) => getItems(response))
  }

  async function getItems(response) {
    axios.post(requestUrl,
      {
        "action": "get_items",
        "params": {
          "ids": response.data.result
        }
      },
      requestHeaders
    )
      .then((info) => {
        let uniqueItems = [];
        info.data.result.filter(function (item) {
          let i = uniqueItems.findIndex(x => (x.price == item.price && x.brand == item.brand && x.product == item.product));
          if (i <= -1) {
            uniqueItems.push(item);
          }
          return null;
        });
        setFilteredItems(uniqueItems);
        setLoading(false);
      })
  }

  const refreshData = () => {
    setFilteredItems(null);
    setLoading(true);
    getData();
  }

  return (
    <div className='App'>
      <ProductsHeader />
      <div className='line'></div>
      <ProductsFilters setFilter={setFilter} setRequest={setRequest} post={refreshData} />
      <div className='line'></div>
      {loading ?
        <Loader />
        :
        filteredItems ?
          <Pagination data={filteredItems} dataLimit={50} />
          :
          null
      }
    </div>
  );
}

export default App;
