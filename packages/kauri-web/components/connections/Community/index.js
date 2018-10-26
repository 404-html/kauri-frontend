import View from './View'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { searchForOneCommunity } from '../../../queries/Community'
import withLoading from '../../../lib/with-loading'
import withApolloError from '../../../lib/with-apollo-error'

const mapStateToProps = state => ({
  hostName: state.app && state.app.hostName,
})

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(searchForOneCommunity, {
    options: ({ category }) => ({
      variables: {
        name: 'kauri',
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View)
