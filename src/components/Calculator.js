import React, { useState } from "react";
import "./Calculator.css";
import axios from "axios";
const Calculator = (props) => {
  const [data, setData] = useState("");
  const [percentile, setPercentile] = useState(0);
  const [output, setOutput] = useState("");
  const [checked,setChecked] = useState(false);
  const [step_value,setStepValue] = useState([]);
  const list=[];
   for (const [i, val] of step_value.entries()) {
     list.push(<tr key={i}>
       <td>{i*5}th percentile: </td>
       <td>{val}</td>
     </tr>);
   }
  async function calculatePercentile(event) {
    try {
       event.preventDefault();
      const res=await axios.post("http://localhost:8000/",{
        data,percentile,checked
      });
       if(res.data.input)
       setData(res.data.input.toString());
       setOutput(res.data.ans);
       if(res.data.step_value)
       setStepValue(res.data.step_value);
    } catch (err) {
      console.log(err);
      setOutput("some error occured");
    }
  }
  return (
    <div className='container'>
      <h1>Percentile Calculator</h1>
      <form onSubmit={calculatePercentile}>
        <div>
          <h2>Enter Data set:</h2>
          <p>Input Format: column (newline), comma separated, spaces</p>
          <textarea
            rows='8'
            cols='40'
            required
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
          <h2>Percentile: Range(0-100)</h2>
          <input
            type='number'
            value={percentile}
            required
            min={0}
            max={100}
            step="0.01"
            onChange={(e) => {
              setPercentile(e.target.value);
            }}
          />
          <label className='checkbox'>
            <input
              type='checkbox'
              defaultChecked={checked}
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            create a table of percentiles every 5%
          </label>
        </div>
        <div className='div__btn'>
          <button
            className='btn__clear btn'
            onClick={(e) => {
              e.preventDefault();
              setPercentile(0);
              setData("");
              setOutput("");
              setStepValue([]);
            }}
          >
            Clear
          </button>
          <input className='btn' type='submit' value='Calculate' />
        </div>
      </form>
      <div className='output'>
        <h3>Output Screen</h3>
        <h3 className='output__screen'>Answer: {output}</h3>
      </div>
      {step_value.length > 0 && (
        <div className='step__percentile'>
          <h2>Percentiles:</h2>
          <table className='step__table'>
            <thead>
              <tr>
                <th>Percentile</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Calculator;
