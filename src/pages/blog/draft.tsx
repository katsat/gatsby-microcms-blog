import React, { useEffect, useState } from "react"
import { PageProps } from "gatsby"
import queryString from "query-string"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const BlogPage = ({ location }) => {
  const { contentId, draftKey } = queryString.parse(location.search);
  const [data, setData] = useState({microcmsBlog: [] });

  useEffect(() => {
    if (!contentId || !draftKey) return
    fetch(`https://8w7mnb9ia6.microcms.io/api/v1/blog/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY' : "810293baad604761a447483baa169272b2e2",
      },
    })
      .then(res => res.json())
      .then(res => setData({ microcmsBlog: res }));  // ※1
  }, []);  // ※2

  if (data === null) {
    return null;
  }
  console.log(data);

  return data ? (
    <Layout>
        <SEO title={data.microcmsBlog.title} />
        <span>{data.microcmsBlog.writer.name}</span>
        <h1>{data.microcmsBlog.title}</h1>
        <div
        dangerouslySetInnerHTML={{
            __html: `${data.microcmsBlog.body}`,
        }}
        />
    </Layout>
  ) : (
      <div>loading...</div>
  )
}

export default BlogPage