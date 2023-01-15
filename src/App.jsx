import React from 'react';
import './app.css'
import { Container, TextField, Button, Box, Typography, Checkbox } from '@mui/material';
import { useState } from 'react';

import {TbEdit} from 'react-icons/tb';



function App() {
  const [items, setItems] = useState([])
   const [isupdate,setIsupdate]=useState(false)
   const [isId,setIsId]=useState(null)
  const [value, setValue] = useState('')

  const Oncheked = (id) => {
    setItems(
      items => items.map((i => {
        if (id == i.id) {
          return { id: i.id, text: i.text, st: !i.st }
        }
        return i
      }))
    )
  }

  const addIems = (e) => {
    e.preventDefault()
    if (value.length == 0) return
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([...items, { id: id, text: value, st: false }])

    setValue('')
  }



  const deletI=()=>{
    const all =items.filter(i=>i.st==false)
    setItems(all)
  }

  const selectAll=()=>{
    setItems(items =>items.map((i)=>{
      if (i){
        return {id:i.id,text:i.text,st:true}
      }
    }))
    
  }

  const updateValue=(id)=>{
    const item=items.filter((i)=>i.id==id)

     setValue(item.map(i=>i.text).toString());
     setIsupdate(true)
     setIsId(id)
  }


  const updateI=()=>{
 
   
   if (value.length ==0) return
     setItems(
      items.map(i=>{
        if (i.id==isId) {
            return {id:i.id,text:value,st:false}
        }
        return i
      })
     )

    setIsupdate(false)
    setValue('')
  }


  return (
    <>
      <Container className='conatiner' maxWidth="sm" sx={styleContainer}>

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <TextField placeholder='type a text' variant="filled"
            sx={styleInput}
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <>
          {
            isupdate ? 
            
            (<Button onClick={e => updateI(e)} type='submit' color='success' variant='contained'>update</Button>)
            
    
            : ( <Button onClick={e => addIems(e)} type='submit' variant='contained'>Add</Button>)
          }
          </>
         
        </Box>
        <Box className='items'>
          {items.map((item) => {

            return <Box key={item.id}   className={item.st?'item active': 'item'}>


              <Checkbox onClick={() => Oncheked(item.id)} checked={item.st} />
              <Typography color='white'>{item.text}</Typography>
              <Button color='success' variant='text' onClick={()=>updateValue(item.id)}><TbEdit/></Button>

              
            </Box>




          })}
        </Box>

        <Box className='groupe-btn' sx={{ marginTop: '20px' }}>
         
          <Button 
               variant='contained' color='error' 
                onClick={()=>deletI()}
                >delete</Button>
                <Button onClick={selectAll}>select all</Button>
        </Box>
      </Container>

    </>
  )
}

export default App



const styleInput = { width: '100%', backgroundColor: '#f9f9f9' }
const styleContainer = {
  width: 500,
  height: '100vh'

}