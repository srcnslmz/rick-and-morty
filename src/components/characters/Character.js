import React from 'react'

class Character extends React.Component {
    getEpisodes = () => {
        const { episode } = this.props.location.state.character
        var i=0;
        if(episode.length < 5){
            return this.splitEpisodes(episode, i)
        }
        else if(episode.length >=5){
            i = episode.length - 5
            return this.splitEpisodes(episode, i)
        }
    }
    splitEpisodes = (episode, i) => {
        var episodes = []
        for(i; i<episode.length; i++){
            var newEpisode = episode[i].split("/episode/")
            if(i === episode.length-1){
                episodes.push(newEpisode[1])
            }else{
                episodes.push(newEpisode[1]+', ')
            }
        }
        return episodes
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        const { character } = this.props.location.state
        return(
            <div class="c-wrapper">
                <div class="product-img">
                    <img src={character['image']} height="420" width="327" />
                </div>
                <div class="product-info">
                    <div class="product-text">
                        <h1>{character['name']}</h1>
                        <h2>{character['origin']['name']}</h2>
                        <p>Last Episodes: {this.getEpisodes()}</p>
                    </div>
                </div>
                <div class="backBtn" onClick={this.goBack}>
                    <span class="line tLine"></span>
                    <span class="line mLine"></span>
                    <span class="label">Go Back</span>
                    <span class="line bLine"></span>
                </div>
            </div>
        )
    }
}

export default Character