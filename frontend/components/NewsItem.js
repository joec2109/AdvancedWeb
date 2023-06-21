import React from 'react';

// Find news items and display them within 'tiles' on the news feed page
const NewsItem = ({ title, description, url, urlToImage, publishedAt }) => {

    return (
        <div className='form-newsfeed'>
            <div className='form-news-feed-tile'>
                <h3 className = "form-news-feed-tile-date">{publishedAt.substring(0,10)}</h3>
                <h2><a className='form-headers' href={url}>{title}</a></h2>
                <img src={urlToImage} alt={urlToImage} />
                <p>{description}</p>
            </div>
        </div>
    )
}

export default NewsItem