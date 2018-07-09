import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import ArticleSubmitted from '../components/containers/ArticleSubmitted'

class ArticleSubmittedPage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.url}>
        <ArticleSubmitted article_id={this.props.url.query['article_id']} />
      </App>
    )
  }
}

export default compose(withData, withApollo)(ArticleSubmittedPage)