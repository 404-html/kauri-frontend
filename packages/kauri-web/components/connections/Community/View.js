// @flow
import React from 'react'
import R from 'ramda'
import Community from './Community.bs'

type Props = {
  category: string,
  hostName: string,
  data: { getCommunity: CommunityDTO },
}

class CommunityConnection extends React.Component<Props> {
  render () {
    const communitiesArrayWithIdeallyOneInIt = R.path(['data', 'searchCommunities', 'content'])(this.props)
    if (Array.isArray(communitiesArrayWithIdeallyOneInIt) && communitiesArrayWithIdeallyOneInIt.length > 0) {
      return (
        <Community
          id={communitiesArrayWithIdeallyOneInIt[0].id}
          name={communitiesArrayWithIdeallyOneInIt[0].name}
          avatar={communitiesArrayWithIdeallyOneInIt[0].avatar}
          website={communitiesArrayWithIdeallyOneInIt[0].website}
          category={this.props.category}
          hostName={this.props.hostName}
        />
      )
    }
    return null
  }
}

export default CommunityConnection
