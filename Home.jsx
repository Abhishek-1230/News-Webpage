import React, { Component } from 'react'
import { Await } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Newsitem from './Newsitem'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      totalResults: 0,
      articles: [],
      page: 1,
      q: ""
    }
  }
  async getAPIData(q) {
    this.setState({ page: 1, q: q })
    var response = await fetch(`https://newsapi.org/v2/everything?q=${q}&page=${this.state.page}&pagesize=12&language=${this.props.language}&sortBy=publishedAt&apiKey=4cef430039214a088a0ea60f7e65a88d`)
    response = await response.json()
    if (response.articles) {
      this.setState({
        totalResults: response.totalResults,
        articles: response.articles.filter((x) => x.title !== "[Removed]")
      })
    }
  }
  fetchData = async () => {
    this.setState({ page: this.state.page + 1 })
    var response = await fetch(`https://newsapi.org/v2/everything?q=${this.state.q}&page=${this.state.page}&pagesize=12&language=${this.props.language}&sortBy=publishedAt&apiKey=4cef430039214a088a0ea60f7e65a88d`)
    response = await response.json()
    if (response.articles) {
      this.setState({

        articles: this.state.articles.concat(response.articles.filter((x) => x.title !== "[Removed]"))
      })
    }
  }
  componentDidMount() {
    this.getAPIData(this.props.q)
  }
  componentDidUpdate(oldprops) {
    if (this.props !== oldprops) {
      if (this.props.search && this.props.search !== oldprops.search)
        this.getAPIData(this.props.search)
      else
        this.getAPIData(this.props.q)
    }
  }
  render() {
    return (
      <>
        <div className="container-fluid my-3">
          <h5 className='bg-secondary text-center text-light p-3'>{this.props.q} NewsItems</h5>
          <InfiniteScroll
            className='Infinite'
            dataLength={this.state.articles.length}
            next={this.fetchData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={
              <div className='text-center py-5'>
                <div className="spinner-grow " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>No more new Articles</b>
              </p>
            }
          >
            <div className="row">
              {
                this.state.articles.map((item, index) => {
                  return <Newsitem
                    key={index}
                    title={item.title}
                    description={item.description}
                    source={item.source.name}
                    url={item.url}
                    pic={item.urlToImage}
                    date={(new Date(item.publishedAt)).toLocaleDateString()}
                  />
                })
              }</div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}
