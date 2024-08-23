'use client'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, how can I help you today?'
    },
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessage('')
    setMessages((messages) => [
      ...messages,
      {role: 'user', content: message },
      {role: 'assistant', content: ''},
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, {role: 'user', content: message}]),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const {done, value} = await reader.read()
        if(done) break
        const text = decoder.decode(value, {stream: true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length -1]
          let otherMessages = messages.slice(0, messages.length -1)
          return [
            ...otherMessages,
            {...lastMessage, content: lastMessage.content + text},
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        {role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later."},
      ])
    }
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: '#141414',
      }}
    >
      <Stack 
        direction={'column'}
        width={isMobile ? "95%" : "600px"}
        height={isMobile ? "95%" : "700px"}
        borderRadius={4} 
        sx={{
          backgroundColor: '#2c2c2c',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
        }} 
        p={isMobile ? 1 : 2}
        spacing={2}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} color={'white'} textAlign={'center'} fontWeight={'bold'}>
          MovieBot
        </Typography>
        <Stack 
          direction={'column'} 
          spacing={2} 
          flexGrow={1} 
          overflow="auto" 
          maxHeight="100%"
          sx={{
            padding: '10px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 #2c2c2c',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '8px',
            },
          }}
        >
          {
            messages.map((message, index)=> (
              <Box 
                key={index} 
                display="flex" 
                justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              >
                <Box
                  sx={{
                    bgcolor: message.role === 'assistant' ? '#e50914' : '#333333',
                    color: 'white',
                    borderRadius: '20px',
                    p: 2,
                    maxWidth: '75%',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: 1.5,
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <TextField
            label='Type a message...'
            variant='outlined'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: '#333333',
                color: 'white',
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555555',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#888888',
                },
                '& .MuiInputLabel-root': {
                  color: '#aaaaaa',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#e50914',
                },
                '& .MuiInputBase-root': {
                  fontSize: isMobile ? '0.9rem' : '1rem',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#aaaaaa',
              },
            }}
          />
          <Button 
            variant='contained' 
            onClick={sendMessage}
            sx={{
              backgroundColor: '#e50914',
              borderRadius: '20px',
              padding: isMobile ? '6px 12px' : '6px 16px',
              minWidth: isMobile ? '60px' : '64px',
              '&:hover': {
                backgroundColor: '#b0070e',
              },
            }}
          >
            {isMobile ? 'Send' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
