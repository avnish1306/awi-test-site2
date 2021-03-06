//create a new components to produce html
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';

import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import SearchBar from './components/search_bar';
const API_KEY='AIzaSyBCc9uJEC0UGyLjvGKRnMLh8NvPBzpcW6U';



class App extends Component{
	constructor(props){
		super(props);

		this.state = { videos: [],selectedVideo: null,searchTerm:'urvashi' };
		this.videoSearch('surfboard');

	}
	videoSearch(term){
		YTSearch({key:API_KEY,term:term},(videos) => {
		this.setState({ videos: videos, selectedVideo: videos[0] }); //this.setState({ videos: videos});
		});
	}
	render(){
		const videoSearch= _.debounce((term) => {this.videoSearch(term)},500);
		return (
		<div>
		<SearchBar onSearchTermChange={videoSearch}/>
		<VideoDetail video={this.state.selectedVideo}/>
		<VideoList 
		onVideoSelect={selectedVideo => this.setState({selectedVideo})}
		videos={this.state.videos} />
		</div>
		);
	}
} 

ReactDOM.render(<App />,  document.querySelector('.container') );
 