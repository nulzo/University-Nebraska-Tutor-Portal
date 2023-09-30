import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputForm from './components/views/Login.tsx';
import Dashboard from './components/views/Dashboard.tsx';
import { Button } from './components/ui/button.tsx';
import Tutors from './components/views/Tutors.tsx';
import Zoom from './components/views/Zoom.tsx';
import CreateTicket from './components/views/CreateTicket.tsx';
import Hours from './components/views/Hours.tsx';
import ViewTickets from './components/views/ViewTickets.tsx';
import Home from './components/views/Home.tsx';
import Search from './components/views/Search.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App children={<Home/>} />} />
        <Route path="search/" element={<App children={<Search/>} />} />
        <Route path="dashboard/" element={<App children={<Dashboard/>} />} />
        <Route path="tutors/" element={<App children={<Tutors/>} />} />
        <Route path="about/" element={<App children={<InputForm/>} />} />
        <Route path="zoom/" element={<App children={<Zoom/>} />} />
        <Route path="hours/" element={<App children={<Hours/>} />} />
        <Route path="tickets/create/" element={<App children={<CreateTicket/>} />} />
        <Route path="tickets/view/" element={<App children={<ViewTickets/>} />} />
        <Route path="tickets/edit/" element={<App children={<InputForm/>} />} />
        <Route path="user/profile/" element={<App children={<InputForm/>} />} />
        <Route path="user/messages/" element={<App children={<InputForm/>} />} />
        <Route path="user/settings/" element={<App children={<InputForm/>} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
