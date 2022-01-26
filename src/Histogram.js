import React, {useEffect, useState, useRef,useMemo } from "react";
import { ResponsiveMarimekko } from '@nivo/marimekko';


const colors = ['#267726','#6BA56B']




const getBins = (histoData, chartSettings,field) => {

  if(chartSettings.empty){
    let emptyArr = []
    for (let i = 0; i<200;i++)
{emptyArr.push({binStart: i, binsize: 0, ids: [], pct: 0})}
    return emptyArr}
  let x = field

  if(field === 'nutrients'){
     x = chartSettings.x
  } 




const min = ['nrg'].includes(chartSettings.x)?Math.floor(Math.min(...histoData.map((e) => e.value))  / chartSettings.bs) * chartSettings.bs:0;
const max = Math.floor(Math.max(...histoData.map((e) =>  e.value )) / chartSettings.bs) * chartSettings.bs;


    const arr = [];
    for (let i = min; i <= max; i = i + chartSettings.bs) {
      arr.push({ binStart: i, binsize:chartSettings.bs });
    }
    arr.forEach((d) => {
          d.ids = histoData.filter(
                (e) => e.value >= d.binStart && e.value < d.binStart + chartSettings.bs
              )
    });
    arr.forEach((d) => {
              switch(chartSettings.agg)
            {  case 's':
          d.pct = d.ids.length / histoData.length
              break;
              case 'p':
                d.pct = Array.from(new Set(d.ids.map((item) => item.pid||(item.bnd+item.prd)))).length / Array.from(new Set(histoData.map((item) => item.pid||(item.bnd+item.prd)))).length
              break;
              case 'b':
                d.pct = Array.from(new Set(d.ids.map((item) => item.bid||item.bnd))).length / Array.from(new Set(histoData.map((item) => item.bid||item.bnd))).length
              }



    })
    return arr;
  };

  const getAutoBins = (histoData, chartSettings,field) => {


    let x = field
    if(field === 'nutrients'){
       x = chartSettings.x
    } 
  
  

  const maxX = Math.max(...histoData.map((e) =>  e.value ))
  const binOptions = [1,2,5,10,20,25,50,100,200,250,500,1000,2000,2500,5000,10000,20000,25000,50000,100000,200000,250000,500000,1000000,2000000,2500000]
let bs = {value:0,diff:100000000000000}

for (let i= 0;i<binOptions.length;i++)
{
  if(Math.abs(maxX/10 - binOptions[i]) < bs.diff)  
  {bs = {value:binOptions[i],diff:Math.abs(maxX/10 - binOptions[i])}}
}


  const min = Math.floor(Math.min(...histoData.map((e) => e.value))  / bs.value) * bs.value;
  const max = Math.floor(Math.max(...histoData.map((e) =>  e.value )) / bs.value) * bs.value;
  

      const arr = [];
      for (let i = min; i <= max; i = i + bs.value) {
        arr.push({ binStart: i, binsize:bs.value });
      }
      arr.forEach((d) => {
            d.ids = histoData.filter(
                  (e) => e.value >= d.binStart && e.value < d.binStart + bs.value
                ).map(({bnd,prd,id})=>({bnd,prd,id}))
      });
      arr.forEach((d) => {
                switch(chartSettings.agg)
              {  case 's':
            d.pct = d.ids.length / histoData.length
                break;
                case 'p':
                  d.pct = Array.from(new Set(d.ids.map((item) => item.prd))).length / Array.from(new Set(histoData.map((item) => item.prd))).length
                break;
                case 'b':
                  d.pct = Array.from(new Set(d.ids.map((item) => item.bnd))).length / Array.from(new Set(histoData.map((item) => item.bnd))).length
                }
  
  
  
      })
  
      return arr;
    };

const Histogram = props => {


const [highlightIndex,setHighlightIndex] = useState()

useEffect(() => {
  //remove highlight when chart settings change
  clickFunc()
}, [props.chartSettings.x,props.chartSettings.bs,props.chartSettings.agg,props.field]) 


function clickFunc(bar)
{
  if(bar?.datum.index === highlightIndex){
    setHighlightIndex()
    props.leftPanelTabHandler('chartSettings',[])
  return
  }
props.leftPanelTabHandler('data',bar?.datum?.data?.ids.map(d=>d.id),[props.chartSettings.x,bar?.datum?.data?.binStart+'-'+(bar?.datum?.data?.binStart+ +props.chartSettings.bs - 0.1)])
setHighlightIndex(bar?.datum.index)


}


function convertCurrency(value,inputCurrency,targetCurrency)
{
const rates =  [{"currency":"PLN","gbp":5.38,"usd":3.983,"eur":4.602204},{"currency":"SEK","gbp":11.6,"usd":8.588,"eur":9.923046},{"currency":"HUF","gbp":420.876,"usd":311.595,"eur":360.017732},{"currency":"DKK","gbp":8.695,"usd":6.437,"eur":7.437676},{"currency":"CZK","gbp":29.647,"usd":21.949,"eur":25.360018},{"currency":"CHF","gbp":1.233,"usd":0.913,"eur":1.054423},{"currency":"GBP","gbp":1,"usd":0.74,"eur":0.855401},{"currency":"USD","gbp":1.351,"usd":1,"eur":1.155401},{"currency":"EUR","gbp":1.169,"usd":0.866,"eur":1}]
const foundRate = rates.find(d=>d.currency === inputCurrency.toUpperCase())
let divider = 1

if(foundRate){divider = foundRate[targetCurrency]}else{return 0}
if(divider){return value/divider<150?value/divider:0}
else return Math.min(value,100)
}

let validData = []
let yLabel = aggMap[props.chartSettings.agg]
let xLabel = nutrientMap[props.chartSettings.x] + (['pro','cho','fib','sug','fat','nrg','chl','pol','thn','caf','tau','tyr'].includes(props.chartSettings.x)? ' per '+(props.chartSettings.n100?'100':'serving'):'')

if(props.field !== 'nutrients'){xLabel = nutrientMap[props.field]}

if(!Array.isArray(props.data)) {validData=[]
  yLabel = ''
  xLabel = ''
}
 else if(props.field === 'sku_per_prd' ){
    
      yLabel = 'Products'
      xLabel = 'SKUs Per Product'
      validData = props.data
    } else if(props.field  === 'prd_per_bnd'){
      yLabel = 'Brands'
      xLabel = 'Products Per Brand'
      validData = props.data
    }

else if(! props.chartSettings.bs)
{
  validData = props.data.map((e)=>({id:e.id,bid:e.bid,pid:e.pid,svs:e.svs,value:(props.chartSettings.n100 && !props.chartSettings.x.includes('svs','vol_us'))?(100*(e[props.chartSettings.x]/e.svs)):e[props.chartSettings.x] })).filter((e)=>e.value && (e.svs || ! props.chartSettings.n100 || props.chartSettings.x ==='svs') ) 
}
else if (['p1k','p2k','p5c'].includes(props.chartSettings.x))
{ validData = props.data.map((e)=>({id:e.id,bid:e.bid,pid:e.pid,value:convertCurrency(e[props.chartSettings.x],e.cur.toUpperCase(),'eur')})).filter(e=>e.value > 0 )
}
else{
  validData = props.data.map((e)=>({id:e.id,bid:e.bid,pid:e.pid,svs:e.svs,value:(props.chartSettings.n100 && !props.chartSettings.x.includes('svs','vol_us'))?(100*(e[props.chartSettings.x]/e.svs)):e[props.chartSettings.x] })).filter((e)=>e.value && (e.svs || ! props.chartSettings.n100 || props.chartSettings.x ==='svs') ) 
}

const chartData = useMemo(()=> {
  if(!Array.isArray(props.data)){return []}
else {return getBins(validData,props.chartSettings,props.field)}
},[props.chartSettings,props.data])




const SkuCount = () =>
{
const activeFilters = filtersFromUrl(window.location.pathname,true)

return <FieldMapFilteredData  dataset={'bars'}  activeFilters={activeFilters} fields ={activeFilters.map(d=>d.field)}
render={fieldMap =><text  font-size={10} font-weight={'normal'} text-anchor="start" >{toTitleCase(window.location.pathname.match(/\/analyse\/[^\/]+\/([^\/]+)/)?.[1])
} | {(Array.isArray(fieldMap)&&activeFilters.filter(d=>d.values.length>0).length>0?generateActiveFilterString(activeFilters,fieldMap,fieldNames)+' | ':'')}{new Intl.NumberFormat('en-US').format([...new Set(validData.map(d=>d.bid))].length)} Brands | {new Intl.NumberFormat('en-US').format([...new Set(validData.map(d=>d.pid))].length)} Products | {new Intl.NumberFormat('en-US').format(validData.length)} SKUs
&nbsp;  &nbsp;  &nbsp;
  © {new Date().getFullYear()} Nutrition Integrated Ltd
</text>
}
/> 
}



const BackgroundLayer = () => {
  //this is so you can click on the background to reset the highlighting and clear data 

  return <rect fill="white" onClick={()=>clickFunc()} x="-200" y="-200" height="2200" width="2200"/>;
};


const showlabels = props.chartSettings.showlabels




 //need to take into account fields used on chart here, currently showing all filtered data
 //eg. for protein histogrm count only product with protein dose


 const ValueOutside = ({ bars }) => {

  return bars.map((bar) => {
    const {
      key,
      width,
      height,
      x,
      y,
    value    } = bar;

    if(props.chartSettings.showlabels || bar.datum.index === highlightIndex)
   { return (
        <text x={x + width/2} y={y - 5}
          textAnchor="middle"
          fontSize="11px"
        >
          {pct(value,1)}
        </text>
      

    );}
    else
    {return (<text/>)}
  });
};

const ClickAbove = ({ bars }) => {
  return bars.map((bar) => {
    const {
      key,
      width,
      height,
      datum,
      x,
      y,
    value    } = bar;
    if(height > 0)
{ return (
        <rect x={x + 2} y={y - 30} height={28} width={width - 4}
        onClick={(bar)=>clickFunc({datum})}
        fill="rgba(205,250,250,0)"
        />

      

    );}
  });
};

  return ( 
  <> 
{
(!props.data || props.data.length ===0) &&   
<div className='no-data-alert'><p>No data matches the filter selection</p></div>
}
{
props.data === 'loading' && <div className="loading"> <ReactLoading type={'bars'} color="#F28808"  height={100} width={150} /></div>  
}

 <ResponsiveMarimekko 

data={chartData}
id="binStart"
value="binsize"
valueFormat=".0%"

dimensions={[

    {
        id: props.bin_start,
        value: 'pct'
    }
]}
layers={[
  BackgroundLayer,
  "grid",
"bars",
"axes",
"points",
"legends",
(props) => <ClickAbove {...props} />,
(props) => <ValueOutside {...props} />
]}
innerPadding={0}
padding={0}
axisTop={null}
tooltip={function(bar){return <span>{bar.value}</span>}}
axisRight={null}
animate={false}
enableGridY={props.chartSettings.showgrid}
axisBottom={{
    orient: 'bottom',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: ['p5c','p1k','p2k'].includes(props.chartSettings.x)?'Price per pack ('+(props.chartSettings.cur||'EUR')+')':xLabel,
    legendOffset: 36,
    legendPosition: 'middle',
    tickValues: Math.min(4,chartData.length),
    format: v => `${v+(chartData?.[0]?.binStart||0)}`,
}}
axisLeft={{
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: yLabel,
    legendOffset: -60,
    legendPosition: 'middle',
    format: v => `${Math.round(v*100,2)}%`,
}}
gridXValues = {5}
margin={{ top: 40, right: 80, bottom: 130, left: 80 }}
colors={(bar,index)=>highlightIndex == undefined || highlightIndex == bar.datum.index?colors[0]:colors[1]}
borderWidth={2}
borderColor={{ from: 'color', modifiers: [ [ 'brighter', 0.3 ] ] }}
defs={[
    {
        id: 'solid',
        type: 'solid',
        background: 'rgba(0, 0, 0, 0)',
        color: 'inherit'
    }
]}
fill={[
    {
        match: {
            id: 'pct'
        },
        id: 'solid'
    }
]}
label={d => `test`}
onClick={(bar) => 
  clickFunc(bar)
}
legendLabel={d => 'test'}
legends={[
  {
      anchor: 'bottom-left',
      direction: 'column',
      justify: false,
      translateX: 0,
      translateY: 80,
      itemsSpacing: 0,
      itemWidth: 140,
      itemHeight: 10,
      itemTextColor: 'orange',
      itemDirection: 'right-to-left',
      itemOpacity: 1,
      symbolSize: 18,
      symbolShape: (props) => <SkuCount  {...props}/> ,
      
  }
]}
/>
</>
  )
};



export default Histogram
