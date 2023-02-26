import React, { useState, useEffect } from "react";
import { Alert, Box, TextField, Button, Snackbar } from "@mui/material";
import axios from "axios";

export default function AddMeasurement() {

const [ batch, setBatch ] = useState();
const [ sampleSize, setsampleSize ] = useState();
const [ cycleTime, setcycleTime ] = useState();
const [ comment, setcomment ] = useState();
const [ alertStatus, setAlertStatus ] = useState(false);
const [ orderCodes, setOrderCodes] = useState();
    useEffect( () => {
        axios({
            method: 'post',
            // url: "https://avs.teltonika.lt/ProjectsCatalog/ProjectsData/",
            url: "http://factory.teltonika.lt/gorapi/v1/session/id002223"
            // headers: {
            //     cookie: "ai_user=zmDZ8ByvlNGHF/zVONNqDe|2023-01-20T18:48:55.882Z; .AspNetCore.Cookies.22222=CfDJ8NowDLoSX6pLizM5YPiLtgSe2CijTmT_dPvwOqks50KnTAFY0-aenLhkIYhONzk4_4t8s9LEHaHc9I-lCScc9KnrAQ1JpX60JrM9aQM9YnAEyMb6jnQaY2s3GO8WKi38Ae92f97Dp2zbW1oV5LxGLKRcnLkYXveL9o3eHMlRql4ypkiKlzYwYGthz06_bljXCa7BjKV09lLMkKil4IQ9h_q0DScobjv1KOKhCip4j7fBOUtnpld67DhLL-KjgPmmIRRcawZm8b9FNbwNmX9uU6wTw8h4z-vMeW80Dy82Ok8uHBiRR16uXpvwzaK1RDCUNyT5Lm5uyVC6gfaO7JvPzqUZBkRVbe5eh767mtZK49dhK0IMYVPYDUaj6CIPZF1TrqfickMwmAshYaLgHyj4-h7eRvYJhSEFpwlQAJ2avOMleySAC1Sy3TsK0bDuXP5cg8FxzqrDy4IEzM2_vqKs35OLU5iFtBFkYA_NvIzS_53Va7p-h7ShvE-996pXRGQJew; ai_session=ObQ0yeDCvrRRUAISweJMwY|1674718931658|1674722126193"
            // },
            // data: {
            //     "pageIndex": 0,
            //     "pageSize": 10,
            //     "filterColumns": [],
            //     "orderColumns": []
            // }
        })
        .then( response => {
            setOrderCodes(response.data)
        })
        console.log(orderCodes)
    }, [])

    async function handleSubmit(e){
        e.preventDefault()

        await axios({
            method: 'post',
            url: 'measurements',
            data: {
                batchId: parseInt(batch),
                operationId: 20,
                workforceId: 10,
                sampleSize: parseInt(sampleSize),
                cycleTime: parseFloat(cycleTime),
                userId: 1,
            }
            })
            .then( response => {
                console.log(response.data);
                console.log("batch pries setTimeout", batch);

                setAlertStatus(true)
                setTimeout( () => {
                    setAlertStatus(false)
                    setBatch(null)
                    setsampleSize(null)
                    setcycleTime(null)
                }, 4000)
                console.log("batch po setTimeout", batch);
        })
    }

  return (
    <Box sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
    }}>
        <h2>Naujas matavimas</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
        }}
        >
        <TextField label="Partija" id='batch' margin="normal" onBlur={ (e) => setBatch(e.target.value)}/>
        <TextField label="Matavimo imtis" id="sampleSize" margin="normal" onBlur={ (e) => setsampleSize(e.target.value)}/>
        <TextField label="Ciklas" id='cycle' margin="normal" onBlur={ (e) => setcycleTime(e.target.value)}/>
        <TextField label="Komentaras" id='comment' margin="normal" onBlur={ (e) => setcomment(e.target.value)}/>
        <Button type="submit" variant="contained" sx={{marginTop: '20px'}}> Pridėti</Button>
      </Box>
      {alertStatus &&
            <Alert anchor severity="success">Opa įkrito</Alert>
        } 
    </Box>
  );
}
