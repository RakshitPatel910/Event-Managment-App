import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import '../Admin/style.css'
import Card from './Card/Card'
import axios from "axios";




const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));



function Admin() {

    const [clicked,setClicked] = useState(false)
    
    const [organizer,setOrganizer]=useState([])

    const [custData,setCustData]= useState([])

     function toggleButton(a){
      setClicked(a)
      console.log(clicked)
     }

    async function showData(){
      const Data = await axios.post('http://localhost:3010/getAllOrganizer');
      console.log(Data);
      setOrganizer(Data.data.data)
    }

    async function customer(){
      const Data = await axios.get('http://localhost:3010/allCust');
      console.log(Data);
      setCustData(Data.data.data)
    }

    useEffect(()=>{
      if(clicked){
        showData()
      }
      else{
        customer()
      }
    }, [clicked])

    

  return (
    <>
      <div
          style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div className="container1">

            <ColorButton variant="contained" className="button" onClick={()=>{toggleButton(false)}}>Customer</ColorButton>
        
            <ColorButton variant="contained" className="button" onClick={()=>{toggleButton(true)}}>Organizer</ColorButton>  
        </div>

        <div className="info">
          {
            clicked?
            organizer.map((e)=>{
              console.log(e)
              return (
                <>
                  <Card organizerData= {e} />          
                </>
              )
            }):custData.map((e)=>{
              // console.log(e)
              return (
                <>
                  <Card organizerData= {e} />          
                </>
              )
            })
            
          }
         
        </div>
      </div>
    </>
  );
}

export default Admin;
