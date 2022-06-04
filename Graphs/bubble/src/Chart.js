import * as d3 from "d3";
import { useEffect, useState } from "react";

const Chart = () =>{
    const[chart,setChart]= useState();
    useEffect(()=>{
       const d3chart =  d3.selectAll('svg')
        .data([2,3])
            .enter()

        setChart(d3chart)
    },[])
    return <div >{chart}</div>
}

export default Chart;