// @flow
import React, { Component } from 'react'
import styled from 'styled-components';
import moment from 'moment';
import CollectionHeader from '../../../../kauri-components/components/Headers/CollectionHeader.bs';
import CollectionSection from '../../../../kauri-components/components/Section/CollectionSection.bs';

type Props = {
  data: {
    collection?: CollectionDTO,
  },
  routeChangeAction: string => void,
};

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};

`;

const HeaderContainer = styled(ContentContainer)`
  background: #1E2428;
  background: url("https://images.unsplash.com/photo-1533491135387-41e068a8e735") center center;
  background-size: cover;
`;

class CollectionPage extends Component<Props> {

  render () {
      const { name, description, date_created, owner, sections } = this.props.data.collection;
      return (
        <div>
          <HeaderContainer>
            <CollectionHeader
              name={name}
              description={description}
              updated={"Collection Updated " + moment(date_created).fromNow()}
              username={owner.username} />
          </HeaderContainer>
          <ContentContainer>
            {sections && sections.map(i => <CollectionSection
              name={i.name}
              key={i.name}
              routeChangeAction={this.props.routeChangeAction}
              description={i.description}
              articles={i.articles} />)}
          </ContentContainer>
        </div>
    );
  }
}

export default CollectionPage
