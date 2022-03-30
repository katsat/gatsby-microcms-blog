import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { StaticImage } from "gatsby-plugin-image"

const BlogPage = ({ data }) => (
  <Layout>
    <SEO title={data.microcmsBlog.title} />
    <h1 className="text-3xl font-bold underline">{data.microcmsBlog.title}</h1>
    <div
      dangerouslySetInnerHTML={{
        __html: `${data.microcmsBlog.body}`,
      }}
    />
    <div
      dangerouslySetInnerHTML={{
        __html: `${data.microcmsBlog.html_body}`,
      }}
    />
  </Layout>
)

export default BlogPage

export const query = graphql`
  query($id: String!) {
    microcmsBlog(id: { eq: $id }) {
      blogId
      title
      body
      html_body
    }
  }
`