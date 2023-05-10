import React from 'react'
import Header from '../utilComponents/Header'
import Sidebar from '../utilComponents/Sidebar'
import MusicList from './MusicList'

const Home = () => {
  return (
    <>
    <Header/>
    <Sidebar>
        <MusicList/>
    </Sidebar>
    </>
  )
}

export default Home