// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import slugify from 'slugify'
import rake from 'rake-js'
import R from 'ramda'
import CollectionHeader from '../../../../kauri-components/components/Headers/CollectionHeader.bs'
import CollectionSection from './CollectionSection.bs'
import ScrollToTopOnMount from '../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import { Link } from '../../../routes'

type Props = {
  data: {
    getCollection?: CollectionDTO,
  },
  routeChangeAction: string => void,
  hostName: string,
  userId?: string,
}

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.colors.bgPrimary};
  opacity: 0.8;
  margin-top: -106px;
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const HeaderContainer = styled(ContentContainer)`
  background: url(${props => props.background}) center center;
  background-size: cover;
  margin-top: -76px;
  padding-top: 106px;
  padding-bottom: 50px;
  flex-wrap: wrap;
  position: relative;
`

class CollectionPage extends Component<Props, { trianglify: string }> {
  state = {
    trianglify: '',
  }

  componentDidMount () {
    const trianglify = require('trianglify')
    const trianglifyBg = trianglify({
      width: 1920,
      height: 400,
      cell_size: 60,
      variance: 1,
      x_colors: ['#0BA986', '#1E3D3B', '#1E2428'],
    })

    const generatedSvgString = new XMLSerializer().serializeToString(trianglifyBg.svg())
    const trianglifyBgString = 'data:image/svg+xml;base64,' + window.btoa(generatedSvgString)
    this.setState({ trianglifyBg: trianglifyBgString })
  }

  render () {
    if (!this.props.data || !this.props.data.getCollection) return null
    const { id, name, background, description, dateCreated, owner, sections } = this.props.data.getCollection
    const { userId, routeChangeAction, hostName } = this.props
    const extractedKeywords = description ? rake(description, { language: 'english' }) : []
    const bg = (background && background) || this.state.trianglifyBg
    const url = `https://${hostName.replace(/api\./g, '')}/collection/${this.props.id}/${slugify(name, {
      lower: true,
    })}`

    const resourceType = R.pipe(
      R.path(['data', 'getCollection', 'owner', 'resourceIdentifier', 'type']),
      R.toLower
    )(this.props)

    return (
      <div>
        <Helmet>
          <title>{name} - Kauri</title>
          <meta name='description' content={`${description && description.slice(0, 151)}...`} />
          <meta name='keywords' content={extractedKeywords.map(keyword => keyword)} />
          <link rel='canonical' href={url} />
          <meta property='og:title' content={name} />
          <meta property='og:site_name' content='kauri.io' />
          <meta property='og:url' content={`https://${hostName}/article/${id}/${slugify(name, { lower: true })}`} />
          <meta property='og:description' content={`${description && description.substring(0, 100)}...`} />
          <meta property='og:type' content='article' />
          <meta property='og:image' content={bg} />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' ccontent={`https://${hostName}/article/${id}/${slugify(name, { lower: true })}`} />
          <meta name='twitter:title' content={name} />
          <meta name='twitter:description' content={`${description && description.substring(0, 100)}...`} />
          <meta name='twitter:creator' content='@kauri_io' />
          <meta name='twitter:image' content={bg} />
        </Helmet>
        <ScrollToTopOnMount />
        <HeaderContainer background={bg}>
          <Overlay />
          <CollectionHeader
            id={id}
            name={name}
            description={description || ''}
            updated={dateCreated}
            username={owner && owner.username}
            ownerId={owner.id}
            userId={userId || ''}
            userAvatar={owner && owner.avatar}
            linkComponent={childrenProps => (
              <Link
                fullWidth={false}
                useAnchorTag
                href={
                  resourceType === 'community'
                    ? `/community/${owner && owner.id}`
                    : `/public-profile/${owner && owner.id}`
                }
              >
                {childrenProps}
              </Link>
            )}
            url={url}
            profileImage={owner.profileImage}
            routeChangeAction={routeChangeAction}
          />
        </HeaderContainer>
        <ContentContainer>
          {sections &&
            sections.map(section => {
              return (
                <CollectionSection
                  key={section.name}
                  name={section.name}
                  description={section.description || ''}
                  articles={section.resources}
                />
              )
            })}
        </ContentContainer>
      </div>
    )
  }
}

export default CollectionPage
