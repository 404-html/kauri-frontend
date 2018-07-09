import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { getArticle } from '../../../queries/Article'
import { getRequest } from '../../../queries/Request'
import { submitArticleAction, editArticleAction } from './Module'
import { routeChangeAction, showNotificationAction } from '../../../lib/Module'
import View from './View'

const mapStateToProps = (state, ownProps) => ({
  isKauriTopicOwner: Boolean(
    state.app.user && state.app.user.topics && state.app.user.topics.find(topic => topic === 'kauri')
  ),
})

export default compose(
  connect(mapStateToProps, { submitArticleAction, editArticleAction, routeChangeAction, showNotificationAction }),
  graphql(getRequest, {
    options: ({ request_id }) => ({
      variables: {
        request_id,
      },
    }),
    skip: ({ request_id }) => !request_id,
  }),
  graphql(getArticle, {
    options: ({ article_id }) => ({
      variables: {
        article_id,
      },
    }),
    skip: ({ article_id }) => !article_id,
  })
)(View)