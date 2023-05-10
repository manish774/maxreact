import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Tree = () => {
    const [datas, setDatas] = useState('');


    

    useEffect(()=>{
        const data = [{name:"maish",id:1},[{name:"manish1",id:2},{name:"maish",id:3},[{name:"hello",id:4}]]];
        let html = '';
        const getTreeHtml = (arr) => {
            console.log(arr)
            arr.forEach((item,index)=>{
                if(typeof item === 'object'){
                    getTreeHtml(item)
                }else{
                    html+=<div >{item.name}</div>
                }
            })
        }
        getTreeHtml(data);
        setDatas(html)

    })
    
    
  return (
    <div>{datas}</div>
  )
}

export default Tree