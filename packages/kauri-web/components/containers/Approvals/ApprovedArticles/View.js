// @flow
import React from 'react'
import { Container } from '../ArticleRequests/View'
import SubmittedArticle from '../../SubmittedArticles/SubmittedArticle'
import type { ApproveArticlePayload } from '../../Article/Module'

const NoArticlesApproved = () => (
  <Container>
    <p>You have not approved any articles!</p>
  </Container>
)

const PendingPublicationArticles = ({
  articles,
  ethUsdPrice,
  userId,
  routeChangeAction,
  approveArticleAction,
  rejectArticleAction,
}: {
  articles: Array<ArticleDTO>,
  ethUsdPrice: number,
  userId: string,
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
  rejectArticleAction: string => void,
}) => (
  <Container>
    {articles.map(article => (
      <SubmittedArticle
        type='approved'
        routeChangeAction={routeChangeAction}
        approveArticleAction={approveArticleAction}
        rejectArticleAction={rejectArticleAction}
        userId={userId}
        ethUsdPrice={ethUsdPrice}
        key={article.article_id}
        article={article}
      />
    ))}
  </Container>
)

type Props = {
  data: { searchArticles: { content: Array<?ArticleDTO> } },
  ethUsdPrice: ?number,
  userId: ?string,
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
  rejectArticleAction: string => void,
}

export default ({
  data: {
    searchArticles: { content },
  },
  ethUsdPrice,
  userId,
  routeChangeAction,
  approveArticleAction,
  rejectArticleAction,
}: Props) =>
  content.length > 0 ? (
    <PendingPublicationArticles
      routeChangeAction={routeChangeAction}
      articles={content}
      ethUsdPrice={ethUsdPrice}
      userId={userId}
      approveArticleAction={approveArticleAction}
      rejectArticleAction={rejectArticleAction}
    />
  ) : (
    <NoArticlesApproved />
  )
