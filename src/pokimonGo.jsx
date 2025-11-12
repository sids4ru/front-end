import { useEffect, useState } from "react";
async function promiceFetch(path){
      const response = await fetch (path);
      
    if(!response.ok) throw new Error ("NETWORK ERROR");
    const data = await response.json();
    console.log(data.sprites.front_default)
    return data.sprites.front_default;
}
const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";
export default function PokimonGo(){
  const [pokimons, setPokimons] = useState([]);
  const [images, setImages] = useState([]);
  const [error,setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    async function load(){
      try{
        setLoading(true);
        const response = await fetch(URL);
        if(!response.ok) throw new Error("NETWORK ERROR");
        const data = await response.json();
        // console.log(data);
        setPokimons(data.results);
      }
      catch(e){
        setError(true);
        console.log(e);
      }
      finally{
        setLoading(false);
      }
    }
    load();
  },[])
  useEffect(()=>{
    async function loadPokimon(){
      try{
        setLoading(true);
        let promises = [];

        for(let i=0; i<pokimons.length; i++){
          const p = promiceFetch(pokimons[i].url)
            promises.push(p);
          // const response = await fetch (pokimons[i].url);

          // if(!response.ok) throw new Error ("NETWORK ERROR");
          // const data = await response.json();
          // setImages((prev)=>([...prev,data.sprites.front_default]));
          // console.log(data.sprites.front_default);
        }
        const results = await Promise.all(promises);
        setImages(results);
        //console.log(results);
      }
      catch(e){
        setError(true);
        console.log(e);
      }
      finally{
        setLoading(false);
      }
    }
    loadPokimon();
  },[pokimons])
  return(<>
  <div style={styles.container}>
  {pokimons.map((pk,index)=>(
    <div key={pk.name} >
    <div>{pk.name}</div>
    <img src = {images[index]}/> 
    </div>
  ))}
  {loading && <div>LOADING ... </div>}
  {error && <div>ERROR IN LOADING Image</div>}
  </div>
  </>)
}
const styles = {
  container: {display:"flex", flexDirection:"column", width:"80vw", margin:"0 auto"}
}