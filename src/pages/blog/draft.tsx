import React, { useEffect, useState } from "react"
import { PageProps } from "gatsby"
import queryString from "query-string"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

type BaseCmsProperties = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }

type BlogPost = BaseCmsProperties & {
    title: string
}

const BlogPage = ({ location }) => {
  const { contentId, draftKey } = queryString.parse(location.search);
  const [data, setData] = useState<null | BlogPost>(null)

  useEffect(() => {
    if (!contentId || !draftKey) return
    fetch(`https://8w7mnb9ia6.microcms.io/api/v1/blog/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY' : "810293baad604761a447483baa169272b2e2",
      },
    })
      .then(res => res.json())
      .then(res => setData(res));  // ※1
  }, []);  // ※2

  if (data === null) {
    return null;
  }
  console.log(data);

  return data ? (
    <Layout>
        <span>{data.title}</span>
    </Layout>
  ) : (
      <div>loading...</div>
  )
}

export default BlogPage