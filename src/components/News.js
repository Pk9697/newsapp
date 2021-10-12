import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { articles } from '../sampleOutput'
export class News extends Component {
    data=articles;
    constructor(){
        super();
        this.state={
            article:this.data,
            loading:false
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2>Top Headlines</h2>
                <div className="row">
                    {this.state.article.map((element,index)=>{
                        // console.log(element);
                        return <div className="col-md-4" key={`news-${index}`}>
                                    <NewsItem title={element.title?element.title.slice(0,45):element.title} description={element.description?element.description.slice(0,88):element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                </div>
                    })}
                </div>
                
            </div>
        )
    }
}

export default News
