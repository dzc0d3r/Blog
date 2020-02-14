import React from 'react'

function Footer () {
  return (
    <footer>
      <div className="container">
        <div>
          <a href="https://github.com/ashwin-op">
            <img src="/assets/github-white.svg" alt="GitHub logo" />
          </a>

          <a href="">
            <img src="/assets/world.svg" alt="Web icon" />
          </a>
        </div>
      
        <p>
          Built with <img src="/assets/gatsby.svg" alt="Gatsby.js" style={{ height: '26px', margin: '0 8px' }} />
          and a whole lotta Googling
        </p>
      </div>
    </footer>
  )
}

export default Footer