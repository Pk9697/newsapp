import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { articlesData } from '../sampleOutput'
export class News extends Component {
    data=articlesData;
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
        }
    }

    async componentDidMount(){//will run after render method
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&pageSize=20";

        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(data);
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults
        })

    }

    handlePrevClick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&page=${this.state.page-1}&pageSize=20`;
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(data);
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            page:this.state.page-=1
        })
    }
    handleNextClick=async ()=>{
        if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

        }else{
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=22fb6b4d23264c6db14b5f7bf2cd3985&page=${this.state.page+1}&pageSize=20`;
            let data=await fetch(url);
            let parsedData=await data.json();
            console.log(data);
            console.log(parsedData);
            this.setState({
                articles:parsedData.articles,
                page:this.state.page+=1
            })
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2>Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element,index)=>{
                        // console.log(element);
                        return <div className="col-md-4" key={`news-${index}`}>
                                    <NewsItem title={element.title?element.title.slice(0,45):element.title} description={element.description?element.description.slice(0,88):element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                
            </div>
        )
    }
}

export default News
