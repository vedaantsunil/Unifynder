import React, {useContext} from 'react';
import {Stack, Container, Typography, Button, IconButton, List , ListItem, Table, TableCell, TableRow, TableBody, TableHead } from '@mui/material';
import FeatherIcon from 'feather-icons-react'
import { useParams } from 'react-router-dom'

import Loader from "../components/Loader"
import Layout from '../layout/Layout'
import axios from '../services/axios';
import { UserContext } from '../services/UserContext'

export default function University() {
  const [uniData, setUniData] = React.useState({});
  const [courses, setCourses] = React.useState(null);
  const [inWatchlist, setInWatchlist] = React.useState(false);
  const {user, setUser } = useContext(UserContext);
  const container = window.document.body;
  let { id } = useParams();

  React.useEffect(()=>{
    axios()
    .post('/university/getOneUni',{
      id: id
    })
    .then(res => setUniData(res.data))

  }, [])

  React.useEffect(()=>{
    if(uniData.Courses){
      setCourses(uniData.Courses[0].split(','))
    }
  }, [uniData])

  React.useEffect(()=>{
    axios()
    .get('/user/inWatchlist',{params: {
      college: id,
      user: user
    }})
    .then(res => setInWatchlist(res.data))
  }, [])

  const addWatchlist = () =>{
    if(inWatchlist){
      axios()
      .post('/user/removeWatchlist',{
        user: user,
        collegename: uniData.College_Name
      })
      .then(res => setInWatchlist(res.data))
    }else{
      axios()
      .post('/user/addToWatchlist',{
        user: user,
        collegename: uniData.College_Name
      })
      .then(res => setInWatchlist(res.data))
    }
  }

  return (
    <Layout>
      <Container maxWidth='lg'>
        {!courses ? <Loader/> :
        <Stack direction='column' justifyContent='center' gap={2} my={3}>
          <Stack direction='row' alignItems='center' gap={4}>
            <img style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 4}} src={uniData.Images} alt={uniData.College_Name} />
            <Stack sx={{flexGrow: 2}} justifyContent='space-between' direction='row' alignItems='center'>
              <Stack gap={1}>
                <Typography gutterBottom variant="h6">{uniData.College_Name}</Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                    <FeatherIcon size={18} icon='map-pin' />
                    <Typography variant="subtitle2" color="text.secondary">{uniData.City + ', ' + uniData.State}</Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                    <FeatherIcon size={18} icon='clipboard' />
                    <Typography variant="subtitle2" color="text.secondary">{uniData.University}</Typography>
                </Stack>
              </Stack>
              <IconButton onClick={addWatchlist} variant={inWatchlist ? 'off' : 'none'}><FeatherIcon icon='bookmark' /></IconButton>
            </Stack>
          </Stack>
          <Typography variant="h5">Overview</Typography>
          <Stack direction='column' gap={2}>
            <Stack direction='row' alignItems='center'  gap={2}>
              <Stack direction='row' gap={2}>
                <FeatherIcon size={18} icon='users' />
                <Typography variant="subtitle2" color="text.secondary">{uniData.Total_Students} Seats</Typography>
              </Stack>
              <Stack direction='row' gap={2}>
                <FeatherIcon size={18} icon='briefcase' />
                <Typography variant="subtitle2" color="text.secondary">{uniData.Total_Faculty} Faculty Members</Typography>
              </Stack>
              <Stack direction='row' gap={2}>
                <FeatherIcon size={18} icon='calendar' />
                <Typography variant="subtitle2" color="text.secondary">Established in {uniData.Established_Year}</Typography>
              </Stack>
            </Stack>
            <Stack>
              <Stack direction='row' alignItems='center' gap={1}>
                  <FeatherIcon size={18} icon='layers' />
                  <Typography variant="subtitle2" color="text.secondary">₹{Math.floor(uniData.Average_Fees).toLocaleString('en-IN')}</Typography>
                </Stack>
              </Stack>
          </Stack>
          <Typography variant="h5">Courses</Typography>
          <Stack direction='row' alignItems='center' gap={2} mx={2}>
            <List sx={{ listStyleType: 'disc' }}>
              {courses.map((value)=>{
                return(<ListItem sx={{ display: 'list-item' }}>{value}</ListItem>)
              })}
            </List>
          </Stack>
          <Typography variant="h5">Cut Off</Typography>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell>Cap Round</TableCell>
                <TableCell>Cutoff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cap Round 1
                </TableCell>
                <TableCell>{uniData.Cutoff_Round_One}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cap Round 2
                </TableCell>
                <TableCell>{uniData.Cutoff_Round_Two}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
        }
      </Container>
    </Layout>
  );
}

