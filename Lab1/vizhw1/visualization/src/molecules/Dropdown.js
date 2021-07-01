import '../css/Dropdown.css';
import React,{useState} from 'react';

const Dropdown=(props)=>{
    
    const [state,setState] = useState('');
    let axisType;
    return(
             <div>
                { (props.chartNumber===3) ?   <div className="radioSelection"><b>Select Axis: 
                        <input type="radio" id="axis" name="axis" value="x Axis" onChange={()=>setState("x")}></input>
                        <label htmlFor="axis">X Axis</label>
                        <input type="radio" id="axis" name="axis" value="y Axis" onChange={()=>setState("y")}></input>
                        <label htmlFor="axis">Y Axis</label>
                        </b>
                  </div>
                  :<div/>
                }
                {
                    props.variableNames.map(function(name, i){ 
                    return <div className="option" key={ i } onClick={()=>props.changeVariable(props.chartNumber,name,state)}><b>{name}</b></div> 
                    })
                }
            </div>
    );
};

export default Dropdown;