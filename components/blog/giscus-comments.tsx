"use client"

import Giscus from "@giscus/react"

export function GiscusComments() {
  return (
    <Giscus
      repo="atodev/product-showcase"
      repoId="R_kgDORVoOlw"
      category="Announcements"
      categoryId="DIC_kwDORVoOl84C4ynf"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  )
}
