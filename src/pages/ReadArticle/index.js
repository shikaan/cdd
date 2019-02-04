import React from "react"
import {graphql} from "gatsby"

import Template from "~templates/Main"

import Bio from "~components/Bio"
import SEO from "~components/seo"

import {rhythm} from "~utils/typography"

import CallToActions from "./CallToActions";
import FrontMatter from "./FrontMatter";
import TableOfContents from "./TableOfContents";
import Article from "./Article";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Template location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.frontmatter.description}/>

        <FrontMatter post={post} pageContext={this.props.pageContext}/>

        <TableOfContents post={post}/>

        <Article post={post}/>

        <CallToActions post={post}/>

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio/>
      </Template>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        cover_image
        published
        comment_link
      }
    }
  }
`
