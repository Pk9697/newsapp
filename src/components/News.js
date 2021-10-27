import React,{useEffect,useState} from 'react'

import NewsItem from './NewsItem'
// import { articlesData } from '../sampleOutput'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=> {
    // data=articlesData;
    const [articles,setArticles]= useState([])
    const [loading,setLoading]= useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    // const capitalizeFirstLetter=(string)=>{
    //     return string.charAt(0).toUpperCase()+string.slice(1);
    // }
    // constructor(props){
    //     super(props);
    //     this.state={
    //         articles:[],
    //         loading:true,
    //         page:1,
    //         totalResults:0
    //     }
    //     document.title=`${this.capitalizeFirstLetter(props.category)} - News`;
    //     console.log("constructor");
    // }
    
    const updateNews=async ()=>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({loading:true});
        setLoading(true);
        let data=await fetch(url);
        props.setProgress(30);
        let parsedData=await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        // this.setState({
        //     articles:parsedData.articles,
        //     totalResults:parsedData.totalResults,
        //     loading:false,
        // })
        props.setProgress(100);


    }

    useEffect(() => {
        updateNews();
    }, [])
    // async componentDidMount(){//will run after render method        
    //     this.updateNews();
    //     console.log("cdm");
    // }

    // const handlePrevClick=async ()=>{   
    //     // this.setState({page:this.state.page-=1})
    //     // this.updateNews();
    //     setpage(page-1);
    //     updateNews();
    // }
    // const handleNextClick=async ()=>{
    //     // this.setState({page:this.state.page+=1})
    //     // this.updateNews();
    //     setpage(page+1);
    //     updateNews();
    // }
    const fetchMoreData=async ()=>{
        // this.setState({page:this.state.page+1})
        setpage(page+1);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        setLoading(false);
        // this.setState({
        //     articles:this.state.articles.concat(parsedData.articles),
        //     totalResults:parsedData.totalResults,
        //     loading:false,

        // })
    }

    
        
        return (
            <>
                <h2 className="text-center">Top Headlines</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {articles && articles.map((element,index)=>{
                                // console.log(element);
                                return <div className="col-md-4" key={`news-${index}`}>
                                            <NewsItem source={element.source.name} author={element.author?element.author:"Unknown"} date={element.publishedAt} title={element.title?element.title.slice(0,45):element.title} description={element.description?element.description.slice(0,88):element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                        </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
                
            </>
        )
}

News.defaultProps={
    country:'in',
    pageSize:6,
    category:'general'
}

News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}

export default News
