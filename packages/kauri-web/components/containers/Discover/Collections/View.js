// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import CollectionSearch from './CollectionSearch'
import { Helmet } from 'react-helmet'
import CollectionCard from '../../../../../kauri-components/components/Card/CollectionCard'
import { Link } from '../../../../routes'
import Loading from '../../../common/Loading'
import moment from 'moment'
import userIdTrim from '../../../../lib/userid-trim'

type Props = {
  data: {
    searchCollections: ?Array<CollectionDTO>,
  },
  hostName: string,
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const CollectionsHeader = styled.div`
  background-color: ${props => props.theme.colors.primaryTextColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[3]}px;
  padding-bottom: ${props => props.theme.space[3]}px;
`

const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: ${props => props.theme.fontSizes[5]}px;
  margin-top: ${props => props.theme.space[4]}px;
  margin-bottom: ${props => props.theme.space[3]}px;

  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`

const KauriDescription = styled.div`
  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`

export const CollectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: 1280px;
  > div {
    margin: 15px;
  }
`

class Collections extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    if (this.props.data.error) {
      console.log('There was an issue', this.props.data)
      return null
    } // TODO replace with an error message if exists

    const { searchCollections } = this.props.data

    const pageTitle = 'Discover Collections'

    return (
      <ContentContainer>
        <Helmet>
          <title>Kauri - {pageTitle}</title>
          <meta
            name='description'
            content='Discover the best collections of blockchain related articles, tutorials and how-to guides'
          />
          <meta name='keywords' content='ethereum, blockchain, learn to code, developer documentation' />
          <link rel='canonical' href={`https://${this.props.hostName}`} />
        </Helmet>
        <CollectionsHeader>
          <KauriTitle>{pageTitle}</KauriTitle>
          <KauriDescription>Users' and Communities' Collections</KauriDescription>
          <CollectionSearch />
        </CollectionsHeader>
        {searchCollections ? (
          <CollectionsContainer>
            {searchCollections.content.map(collection => {
              const articleCount =
                collection.sections &&
                collection.sections.reduce((current, next) => {
                  current += next.resourcesId && next.resourcesId.length
                  return current
                }, 0)
              return (
                <CollectionCard
                  changeRoute={this.props.routeChangeAction}
                  key={collection.id}
                  id={collection.id}
                  name={collection.name}
                  description={collection.description}
                  username={collection.owner && collection.owner.username}
                  userId={collection.owner && collection.owner.id}
                  userAvatar={collection.owner && collection.owner.avatar}
                  imageURL={collection.background}
                  articleCount={articleCount}
                  date={moment(collection.dateUpdated).format('D MMM YYYY')}
                  cardHeight={290}
                  linkComponent={(childrenProps, route) => (
                    <Link toSlug={route.includes('collection') && collection.name} useAnchorTag href={route}>
                      {childrenProps}
                    </Link>
                  )}
                />
              )
            })}
          </CollectionsContainer>
        ) : (
          <Loading />
        )}
      </ContentContainer>
    )
  }
}

export default Collections
