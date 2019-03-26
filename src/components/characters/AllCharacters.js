import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const API_URL = "https://rickandmortyapi.com/api/character/"

class AllCharacters extends Component {
    constructor(props){
        super(props)
        this.state = {
            characters: [],
            height: window.innerHeight,
            page: 2
        }
    }
    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.getCharacters()
        }
    }
    getCharacters = () => {
        const { page, characters } = this.state
        axios.get(API_URL+`?page=${page}`)
            .then(res => {
                const r = res.data.results;
                const newCharacters = characters.concat(r)
                this.setState({
                    characters: newCharacters,
                    page: page+1
                });
            })
    }
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        axios.get(API_URL)
            .then(res => {
                const characters = res.data.results;
                this.setState({ characters });
            })
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        const { characters } = this.state
        return (
            <>
                <header>
                    <h1>The Rick and Morty</h1>
                </header>
                <div className="character-wrapper">
                    {
                        characters &&
                        <div className="character-list">
                            {Object.keys(characters).map((character, i) => (
                                <figure className="character-figure" key={i}>
                                    <img src={characters[character]['image']} />
                                    <div className="tag">
                                        <span className="name">Rick</span>
                                        <span>and</span>
                                        <span className="name">Morty</span></div>
                                    <figcaption>
                                        <h3>{characters[character]['name']}</h3>
                                    </figcaption>
                                    <div className="hover"><i className="ion-android-open"></i></div>
                                    <Link to={{
                                        pathname: `/${characters[character]['id']}`,
                                        state: {
                                            character: characters[character]
                                        }}}
                                    />
                                </figure>
                            ))}
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default AllCharacters;
