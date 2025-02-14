import React from "react";


import { useEffect } from "react";
import { useState } from "react";
import "./loader.css";
import { useNavigate } from "react-router-dom";


function Sale_residential_plots_filter(){
    let [load,set_load] = useState(1);
    let [initial,set_initial] = useState([]);

    let n = useNavigate();

    let [state,set_state] = useState("");
    let [city,set_city] = useState("");

    let [pincode,set_pincode] = useState("");

    let [min,set_min] = useState("");

    let [max,set_max] = useState("");

    let [filtered_data,set_filtered_data] = useState([]);



    

    useEffect(()=>{

        async function t(){

            let op = await fetch('http://localhost:8000/all_residential_sale_properties',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                }
            );

            let ans = await op.json();

            console.log(ans);

            set_initial(ans.properties);
            set_load(0);



        }
        t();
        
    },[]);

    

    let move_to_maps = (e)=>{

        let rty = e.target.accessKey;

        let opl = parseInt(rty,10);

        let iipl = initial[opl];

        const googleMapsUrl = `https://www.google.com/maps?q=${iipl.lat},${iipl.long}`;
        window.open(googleMapsUrl, "_blank");

    }

    let move_to_maps_p = (e)=>{

        let rty = e.target.accessKey;

        let opl = parseInt(rty,10);

        let iipl = filtered_data[opl];

        const googleMapsUrl = `https://www.google.com/maps?q=${iipl.lat},${iipl.long}`;
        window.open(googleMapsUrl, "_blank");

    }

    let filter = async() =>{

        set_load(1);

        let op = await fetch('http://localhost:8000/filter_residential_sale_properties',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({state:state,city:city,pincode:pincode,min:min,max:max}),
                
            }
        );

        let ans = await op.json();
        console.log(ans.prop);
        set_filtered_data([...ans.prop]);
        set_load(2);

        

    }

    let filter_map = ()=>{
        n("/map_sale_residential_plots");
    }

    if(load == 1){
        return (
            <div>
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }


    if(load == 2){
        return(
            <div>

<button onClick={()=>{
                n('/rpf');
            }}>rent properties</button>
            <button onClick={()=>{
                n('/spf');
            }}>buy properties</button>
            <button onClick={()=>{
                n('/sell_commercial_plots_filter');
            }}>buy commercial plots</button>
            
            
            <button onClick={()=>{
                n('/rent_commercial_plots_filter');
            }}>rent commercial plots</button>
            <button onClick={()=>{
                n('/rent_residential_plots_filter');
            }}>rent residential plots</button>
            <button  onClick={()=>{
                n('/sell_residential_plots_filter');
            }}>buy residential plots</button>
            <button onClick={()=>{
                n('/sell_commercial_workspace_filter');
            }}>buy commercial workspace</button>
            <button onClick={()=>{
                n('/rent_commercial_workspace_filter');
            }}>rent commercial workspace</button>
            
            <button>residential projects</button>

                <input type="text" value={state} onChange={(e)=>{
                    set_state(e.target.value);
                }} placeholder="state" />

                <input type="text" value={city} onChange={(e)=>{
                    set_city(e.target.value);
                }} placeholder="city" />

                 <input type="text" value={pincode} onChange={(e)=>{
                    set_pincode(e.target.value);
                }} placeholder="pincode" />

                    <input type="text" value={min} onChange={(e)=>{
                        set_min(e.target.value);
                    }} placeholder="min price" />

                    <input type="text" value={max} onChange={(e)=>{
                        set_max(e.target.value);
                    }} placeholder="max price" />

                <button onClick={filter}>filter</button>
                {
                        filtered_data.length === 0 ? (
                            <p>No data available</p>
                        ) :(filtered_data.map((key,index)=>{
                        return (
                            <div key={index}>
    
                                <p>address is</p>
                                <p>{key.addresstrivia}</p>
                                <p>area size</p>
                                <p>{key.areaSize}</p>
    
                                <p>total amount</p>
                                <p>{key.totalAmount}</p>
    
                                <button accessKey={index} onClick={move_to_maps_p}>go to location</button>
    
                                
    
                            </div>
                            
                        );
                    })
    
                )}

            </div>
        );
    }


    return (
        <div>
            <button onClick={()=>{
                n('/rpf');
            }}>rent properties</button>
            <button onClick={()=>{
                n('/spf');
            }}>buy properties</button>
            <button onClick={()=>{
                n('/sell_commercial_plots_filter');
            }}>buy commercial plots</button>
            
            
            <button onClick={()=>{
                n('/rent_commercial_plots_filter');
            }}>rent commercial plots</button>
            <button onClick={()=>{
                n('/rent_residential_plots_filter');
            }}>rent residential plots</button>
            <button  onClick={()=>{
                n('/sell_residential_plots_filter');
            }}>buy residential plots</button>
            <button onClick={()=>{
                n('/sell_commercial_workspace_filter');
            }}>buy commercial workspace</button>
            <button onClick={()=>{
                n('/rent_commercial_workspace_filter');
            }}>rent commercial workspace</button>
            
            <button>residential projects</button>

            <input type="text" value={state} onChange={(e)=>{
                set_state(e.target.value);
            }} placeholder="state" />

            <input type="text" value={city} onChange={(e)=>{
                set_city(e.target.value);
            }} placeholder="city" />

            <input type="text" value={pincode} onChange={(e)=>{
                set_pincode(e.target.value);
            }} placeholder="pincode" />

            <input type="text" value={min} onChange={(e)=>{
                set_min(e.target.value);
            }} placeholder="min price" />

            <input type="text" value={max} onChange={(e)=>{
                set_max(e.target.value);
            }} placeholder="max price" />

            <button onClick={filter}>filter</button>





            {
                initial.map((key,index)=>{
                    return (
                        <div key={index}>

                            <p>address is</p>
                            <p>{key.addresstrivia}</p>
                            <p>area size</p>
                            <p>{key.areaSize}</p>

                            <p>total amount</p>
                            <p>{key.totalAmount}</p>

                            <button accessKey={index} onClick={move_to_maps}>go to location</button>

                            

                        </div>
                        
                    );
                })

            }


        <button onClick={filter_map}>CLICK</button>

        </div>
    );
}

export default Sale_residential_plots_filter;