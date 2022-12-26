"use client";
import { useState } from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';


export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const [result, setResult] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setFinalMessage(userInput)
    setUserInput('');
  }

  return (
    <div>
      <h1>AI: {result}</h1>
      <h2>Me: {finalMessage}</h2>
      <Grid component="form" noValidate onSubmit={handleSubmit} className={styles.bottomstick} container direction="row" justifyContent="center">
        <Grid item xs={8}>
          <TextField 
              id="outlined-full-width" 
              label="Ask me anything" 
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              fullWidth/>
        </Grid>
        <Grid item xs={4}>
          <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              startIcon={<SendIcon />}
              sx={{ mt: 1, mb: 1 }}
          >Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
}
