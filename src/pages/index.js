import React from 'react'
import { graphql } from 'gatsby'

import Article from '../components/Article'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Index"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

        <h3>Latest Articles</h3>

        <div className="block">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug

            return (
              <Article
                title={title}
                // subtitle={node.excerpt}
                date={node.frontmatter.date}
                slug={node.fields.slug}
                timeToRead={node.timeToRead}
                key={node.fields.slug}
              />
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 80)
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
          }
        }
      }
    }
  }
`
