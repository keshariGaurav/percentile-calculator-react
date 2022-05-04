import React, { useState } from "react";
import "./Calculator.css";
import axios from "axios";
const Calculator = (props) => {
  const [data, setData] = useState("");
  const [percentile, setPercentile] = useState(0);
  const [output, setOutput] = useState("");
  
  async function calculatePercentile(event) {
    try {
       event.preventDefault();
      const res=await axios.post("http://localhost:8000/",{
        data,percentile
      });
       setData(res.data.input);
       setOutput(res.data.ans);
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
            onChange={(e) => {
              setPercentile(e.target.value);
            }}
          />
        </div>
        <div className='div__btn'>
          <button
            className='btn__clear btn'
            onClick={(e) => {
              e.preventDefault();
              setPercentile(0);
              setData("");
            }}
          >
            Clear
          </button>
          <input 
            className='btn'
            type="submit"
            value="Calculate"
          />
        </div>
      </form>
      <div className='output'>
        <h3>Output Screen</h3>
        <h3 className='output__screen'>Answer: {output}</h3>
      </div>
    </div>
  );
};
export default Calculator;
