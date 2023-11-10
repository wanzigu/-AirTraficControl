import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const flightNo = useRef();
  const flightType = useRef();
  const flightStatus = useRef();

  const [landings, setLandings] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [airborneFlights, setAirborneFlights] = useState([]);
  const [standbyFlights, setStandbyFlights] = useState([]);
  const [currentInstruction, setCurrentInstruction] = useState([]);
  const [historicalInstructions, setHistoricalInstructions] = useState([]);

  var instruction = "Please standby and wait for instruction from ATCO";

  var landingUrl = "https://localhost:7103/Landings";
  var departureUrl = "https://localhost:7103/Departures";
  var airborneFlightsUrl = "https://localhost:7103/AirborneFlights";
  var standbyFlightsUrl = "https://localhost:7103/StandbyFlights";
  var newLandingUrl = "https://localhost:7103/NewLanding";
  var newDepartureUrl = "https://localhost:7103/NewDeparture";
  var historicalInstructionUrl = "https://localhost:7103/HistoricalControllerInstructions";
  var currentInstructionUrl = "https://localhost:7103/CurrentControllerInstruction";

  const fetchLandings = async () => {  
    const landingsResp = await fetch(landingUrl, { method: 'GET', mode: 'cors', headers: {
      'Content-Type': 'application/json'}
    });
    
    if(landingsResp.status === 200){
      const data = await landingsResp.json();
      console.log(data);
      setLandings(data);
    } else {
      console.log(landingsResp.status);
      console.log(landingsResp.error);
    }
  }

  const fetchDepartures = async () => {  
    const departuresResp = await fetch(departureUrl, { method: 'GET', mode: 'cors', headers: {
      'Content-Type': 'application/json'}
    });
    
    if(departuresResp.status === 200){
      const data = await departuresResp.json();
      console.log(data);
      setDepartures(data);
    } else {
      console.log(departuresResp.status);
      console.log(departuresResp.error);
    }
  }

  const fetchAirborneFlights = async () => {  
    const airborneFlightsResp = await fetch(airborneFlightsUrl, { method: 'GET', mode: 'cors', headers: {
      'Content-Type': 'application/json'}
    });
    
    if(airborneFlightsResp.status === 200){
      const data = await airborneFlightsResp.json();
      console.log(data);
      setAirborneFlights(data);
    } else {
      console.log(airborneFlightsResp.status);
      console.log(airborneFlightsResp.error);
    }
  }

  const fetchStandbyFlights = async () => {  
    const standbyFlightsResp = await fetch(standbyFlightsUrl, { method: 'GET', mode: 'cors', headers: {
      'Content-Type': 'application/json'}
    });
    
    if(standbyFlightsResp.status === 200){
      const data = await standbyFlightsResp.json();
      console.log(data);
      setStandbyFlights(data);
    } else {
      console.log(standbyFlightsResp.status);
      console.log(standbyFlightsResp.error);
    }
  }

  const fetchCurrentInstruction = async () => {  
    const currentInstructionResp = await fetch(currentInstructionUrl, { method: 'GET', mode: 'cors', headers: {
      'Content-Type': 'application/json'}
    });
    
    console.log("fetched current instruction");
    if(currentInstructionResp.status === 200){
      const data = await currentInstructionResp.json();
      console.log(data);
      setCurrentInstruction(data);
      setAirborneFlights(data.airborneFlights);
      setStandbyFlights(data.setStandbyFlights);
    } else {
      console.log(currentInstructionResp.status);
      console.log(currentInstructionResp.error);
    }
    //window.location.reload();
  }

  const fetchHistoricalInstructions = async () => {  
    const instructionsResp = await fetch(historicalInstructionUrl, { method: 'GET', mode: 'cors', headers: {
      'Content-Type': 'application/json'}
    });
    
    if(instructionsResp.status === 200){
      const data = await instructionsResp.json();
      console.log(data);
      setHistoricalInstructions(data);
    } else {
      console.log(instructionsResp.status);
      console.log(instructionsResp.error);
    }
  }

  const fetchAll = async () =>{
    fetchLandings();
    fetchDepartures();
    fetchAirborneFlights();
    fetchStandbyFlights();
    fetchHistoricalInstructions();
  }

  const newInstruction = async () => {
    fetchCurrentInstruction();
  }

  const newFlight = async () =>{
    console.log(flightNo.current.value);
    console.log(flightType.current.value);
    console.log(flightStatus.current.value);
    if(flightStatus.current.value === "1"){
      const newLandingResp = await fetch(newLandingUrl, 
        { method: 'POST', mode: 'cors', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({FlightNo: flightNo.current.value, 
            flightType: flightType.current.value,
            flightStatus: 'landing'
          })
        });

      if(newLandingResp.status === 200){
        const data = await newLandingResp.json();
        window.location.reload();
        //currentFlight = data;
        console.log(data);
      } else {
        console.log(newLandingResp.status);
        console.log(newLandingResp.error);
      }
    } else {
      const newDepartureResp = await fetch(newDepartureUrl, 
        { method: 'POST', mode: 'cors', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({FlightNo: flightNo.current.value, 
            flightType: flightType.current.value,
            flightStatus: 'departure'
          })
      });

      if(newDepartureResp.status === 200){
        const data = await newDepartureResp.json();
        window.location.reload();
        //currentFlight = data;
        console.log(data);
      } else {
        console.log(newDepartureResp.status);
        console.log(newDepartureResp.error);
      }
    }   
  }

  useEffect(() => {
    fetchAll();
  },[])

  return (
    <div className="App">
      <h2>Flight Trafic Dashboard</h2>
      <div>
        <p>Please provide your flight detail and your request</p>
        <div className='InputFields'>
          <label htmlFor="flightNo">Flight number: </label>
          <input className="m-2 block px-2" 
                type="text" name = "flightNo" ref={flightNo}/>
          <label htmlFor="flightType">Flight type: </label>
          <input className="m-2 px-2" 
                type="text" name = "flightType" ref={flightType}/>
          <label htmlFor="flightStatus">Flight status: </label>
          <select className="m-2 px-2" 
                name = "flightStatus" ref={flightStatus}>   
            <option value = "1">landing</option> 
            <option value = "2">departures</option>    
          </select>
          <button onClick={newFlight}>Save</button>  
        </div>
        <p>ATCO's response to pilot: {instruction}</p>
      </div>
      
      <div className="Dashboard">
        <div className="Landings"> 
          <h4 className="Title">Flights requested for landing</h4>
          <ul>
            {landings.map(l => <li className="UnorderedList">{l.flightNo + ", " + l.flightType}</li>)}
          </ul>
        </div>
        <div className="Departures"> 
          <h4>Flights requested for departure</h4>
          <ul>
            {departures.map(d => <li>{d.flightNo + ", " + d.flightType}</li>)}
          </ul>
        </div>
      </div>   
      <div>
        <h3>On the runway</h3>
        {currentInstruction.length !== 0 &&
          <p>{currentInstruction.flightNo} : {currentInstruction.flightType} ready for {currentInstruction.instruction}</p>
        }     
        <button onClick={newInstruction}>New Instruction</button>
      </div>
      <div className="Dashboard">
        <div className="Landings"> 
          <h4 className="Title">Flights currently airborne</h4>
          { airborneFlights !== undefined &&
            <ul>
            {airborneFlights.map(a => <li className="UnorderedList">{a.flightNo + ", " + a.flightType}</li>)}
          </ul>         
          }
        </div>
        <div className="Departures"> 
          <h4>Flights currently in standby</h4>
          { standbyFlights !== undefined &&
            <ul>
            {standbyFlights.map(s => <li>{s.flightNo + ", " + s.flightType}</li>)}
          </ul>
          }       
        </div>
      </div>   
      <div className="Dashboard">
        <div className="HistoricalMessage"> 
          <h4>Historical Instructions</h4>
          <ul>
            {historicalInstructions.map(h => <li className="UnorderedList">{h.flightNo + " " + h.flightType + " " + h.instruction}</li>)}
          </ul>
        </div>
      </div>    
    </div>
  );
}

export default App;
