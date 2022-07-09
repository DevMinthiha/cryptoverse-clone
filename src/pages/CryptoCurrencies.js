import React, { useEffect, useState } from 'react'
import {useGetCryptosQuery} from "../services/CryptoApi"
import CryptoCard from "../components/CryptoCard"
import Spinner from '../components/Loading/Spinner';

const CryptoCurrencies = () => {
  const {data, isFetching} = useGetCryptosQuery(100);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const filterData = data?.data?.coins?.filter( coin => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) );
    setCryptos(filterData)
  }, [data?.data?.coins, searchTerm])
  console.log(data);
  return (
    <div className='container'>
      { isFetching && <Spinner />}
      <input type="text" className='outline-none border rounded-md mt-5 mb-3 text-xs p-3' placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="flex flex-wrap gap-5 my-5 pb-20">
      { cryptos?.map( coin => <CryptoCard coin={coin} key={coin.uuid} /> ) }
      </div>
    </div>
  )
}

export default CryptoCurrencies