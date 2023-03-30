import React,{useState,useEffect} from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {

  const [pokemon,setPokemon]=useState([])//veri dizisi
  const [currentPageUrl,setCurrentPageUrl]=useState("https://pokeapi.co/api/v2/pokemon")//ana adres
  const [nextPageUrl,setNextPageUrl]=useState()//bir sonraki url
  const [prevPageUrl,setPrevPageUrl]=useState()//geri dönüş urlsi
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setLoading(true)
    let cancel
    axios.get(currentPageUrl,{
      //Cancel Token, Axios’un varsayılan kütüphanesinin içerisinde yerleşik olarak gelen ve HTTP isteklerini iptal etmemize imkân sağlayan bir özellik.
      cancelToken:new axios.CancelToken(c=>cancel=c)
    }).then(res=>{
      setLoading(false)
      // console.log(res.data)
      setNextPageUrl(res.data.next)//dizeye sonraki adresi atıyoruz
      setPrevPageUrl(res.data.previous && res.data.previous)//eğer gelen apide previos varsa  önceki adresi dizeye atıyoruz

      setPokemon(res.data.results.map(p=>p.name)) //veri çekme
    })

    return ()=>cancel()

  },[currentPageUrl])//ana url adresinde değişiklik olduğunda tetiklenecek

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)//bir sonraki adresi ana urlye değiştirme
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)//bir önceki adresi ana urlye değiştirme
  }

  if (loading) return "loading"

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage :null}
      />
    </>
  );
}

export default App;
