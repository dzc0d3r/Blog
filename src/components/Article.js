import React from 'react'
import { Link } from 'gatsby'

function ArticleLink ({ title, slug, subtitle, thumbnail, topics, date, timeToRead}) {
  if (topics) {
    var listTopics = topics.map(tag => (
      <h5 className="chip">{ tag }</h5>
    ))
  }
  
  return (
    <Link to={slug}>
      <div className="article card">
        <div className="article-header">
          <div>
            <h3>{ title }</h3>
            <h4 className="grey">{ subtitle }</h4>
            <p>Tiime to read : ~{ timeToRead } min | { date }</p>
            <div>{ listTopics }</div>
          </div>
          
          { thumbnail &&
            <img
              src={`./assets/thumbnails/${thumbnail}.jpg`}
              alt={`${title} thumbnail`}
            />
          }
        </div>
        
        <div className="article-footer">
          <p className="pill"><span>Read Article</span></p>
        </div>
      </div>
    </Link>
  )
}

export default ArticleLink