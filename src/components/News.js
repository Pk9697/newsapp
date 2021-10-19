import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { articlesData } from '../sampleOutput'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    data=articlesData;
    static defaultProps={
        country:'in',
        pageSize:6,
        category:'general'
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
        }
    }
    async updateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }
    async componentDidMount(){//will run after render method
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles:parsedData.articles,
        //     totalResults:parsedData.totalResults,
        //     loading:false
        // })
        this.updateNews();

    }

    handlePrevClick=async ()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles:parsedData.articles,
        //     page:this.state.page-=1,
        //     loading:false
        // })
        this.setState({page:this.state.page-1})
        this.updateNews();

    }
    handleNextClick=()=>{
       
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles:parsedData.articles,
        //     page:this.state.page+=1,
        //     loading:false
        // })
        this.setState({page:this.state.page+1})
        this.updateNews();

    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.map((element,index)=>{
                        // console.log(element);
                        return <div className="col-md-4" key={`news-${index}`}>
                                    <NewsItem source={element.source.name} author={element.author?element.author:"Unknown"} date={element.publishedAt} title={element.title?element.title.slice(0,45):element.title} description={element.description?element.description.slice(0,88):element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                
            </div>
        )
    }
}

export default News
