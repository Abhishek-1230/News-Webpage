import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Home from './Home'

export default class App extends Component {
  constructor(){
    super()
    this.state={
      language:"hi",
      search:""
    }
  }
  changelanguage = (data)=>{
    this.setState({language:data})
  }
  changesearch = (data)=>{
    this.setState({search:data})
  }
  render() {
    return (
      <BrowserRouter>

      <Navbar changelanguage={this.changelanguage} changesearch={this.changesearch}/>
        <Routes>
            <Route path="/" element={<Home search={this.state.search} language={this.state.language} q="All"/>}/>
            <Route path="All" element={<Home search={this.state.search} language={this.state.language} q="All" />}/>
            <Route path="Politics" element={<Home search={this.state.search} language={this.state.language} q="Politics" />}/>
            <Route path="Science" element={<Home search={this.state.search}  language={this.state.language} q="Science" />}/>
            <Route path="Technology" element={<Home search={this.state.search} language={this.state.language} q="Technology" />}/>
            <Route path="Education" element={<Home search={this.state.search} language={this.state.language} q="Education" />}/>
            <Route path="Sports" element={<Home search={this.state.search} language={this.state.language} q="Sports" />}/>
            <Route path="Entertainment" element={<Home search={this.state.search} language={this.state.language} q="Entertainment" />}/>
            <Route path="Crime" element={<Home search={this.state.search} language={this.state.language} q="Crime" />}/>
            <Route path="Jokes" element={<Home search={this.state.search} language={this.state.language} q="Jokes" />}/>
        </Routes>
        <Footer/>  
      </BrowserRouter>
    )
  }
}
