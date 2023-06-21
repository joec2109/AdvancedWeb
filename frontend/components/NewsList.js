import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsList = () => {

    // Create setters & getters for the user's team and articles collected
    const [team, setUsersTeam] = useState('');
    const [articles, setArticles] = useState([]);

    axios.defaults.withCredentials = true;

    React.useEffect(() => {
        // Ensure the user is logged in first
        axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true && response.data.user[0].team != '') {
            // Grab the team that the user has selected from the db
            setUsersTeam(response.data.user[0].team);
            console.log(response);
            console.log(response.data.user[0].team);

            const getArticles = async () => {
                if (team) {
                    // Make use of cors-anywhere proxy server to access the NewsAPI to grab the latest news
                    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${team.toString()}&pageSize=10&apiKey=071d95717d1649bbbdc0acab4e8c4075`, {
                        headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                        },
                        withCredentials: false // set withCredentials to false
                    });
                    setArticles(response.data.articles);
                    console.log(response.data.articles);
                }
            };
            getArticles();
        }
        });
    }, [team]);

    console.log(articles)

    // Return the results of the getArticles() function within a 'NewsItem'
    return (<>
        <div className='form-news-feed-container'>
        <h1 class="h1-news-feed">News Feed</h1>
            {articles.map(article => {
                return (
                    <NewsItem 
                        publishedAt = {article.publishedAt}
                        title = {article.title}
                        description = {article.description}
                        url = {article.url}
                        urlToImage = {article.urlToImage}
                    />
                )
            })}
        </div>
        </>
    )
}

export default NewsList