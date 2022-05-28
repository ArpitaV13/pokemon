import React, { useEffect } from "react";
import Card from "./Card";
import Pokemoninfo from "./Pokemoninfo";
import axios from "axios";
import {useState} from "react";

function Main(){
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setprevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();
    

        const pokeFun=async()=>{
            setLoading(true)
           
            const res=await axios.get(url)
            console.log(res);
           
            setNextUrl(res.data.next);
            setprevUrl(res.data.prev);
            getPokemon(res.data.results);
            setLoading(false);
        
        }
        const getPokemon=async(res)=>{
            res.map(async(item)=>{
                const result= await axios.get(item.url);
            
                setPokeData(state=>{
                    state=[...state,result.data]
                    state.sort((a,b)=>a.id>b.id?1:-1)
                    return state;
                })
            })
        }
        useEffect(()=>{
            pokeFun();
        },[url])
   console.log("Hiiii",pokeDex);
    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                   
                    <div className="btn-group">
                        <button>Previous</button>
                        <button>Next</button>
                    </div>
                </div>
                <div className="right-content">
                    <Pokemoninfo data={pokeDex}/>
                </div>
            </div>
        </>
    )
}

export default Main;