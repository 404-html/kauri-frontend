// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { EditorState, convertFromRaw } from 'draft-js'
import { Divider } from 'antd'
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
  CreateRequestDetails,
} from '../../CreateRequestForm/CreateRequestContent'
import DatePosted from '../../../common/DatePosted'
import { SubmitArticleFormHeadings, OutlineLabel } from '../../SubmitArticleForm/SubmitArticleFormContent'
import DescriptionRow from '../../Requests/DescriptionRow'
import { contentStateFromHTML, getHTMLFromMarkdown } from '../../../../lib/markdown-converter-helper'

export const ApprovedArticleDetails = CreateRequestDetails.extend`
  align-items: inherit;
`

const Username = styled.strong`
  color: ${props => props.theme.primaryColor};
`

export default ({ text, username }: { text?: string, username?: ?string }) => {
  let editorState = typeof text === 'string' && JSON.parse(text)
  editorState =
    editorState && typeof editorState.markdown === 'string'
      ? editorState
      : EditorState.createWithContent(convertFromRaw(JSON.parse(text)))

  const headingsAvailable =
    typeof editorState === 'object' && editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .find(contentBlock => contentBlock.toJS().type.includes('header'))
      : editorState
        .getCurrentContent()
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type === 'header-two').length > 0

  return (
    <SubmitArticleFormContent>
      <SubmitArticleFormContainer>
        <DescriptionRow fullText record={{ text }} />
      </SubmitArticleFormContainer>
      <ApprovedArticleDetails type='outline'>
        {Boolean(headingsAvailable) && (
          <Fragment>
            <OutlineLabel>Outline</OutlineLabel>
            <Divider style={{ margin: '20px 0' }} />
            <SubmitArticleFormHeadings editorState={text && typeof text === 'string' ? JSON.parse(text) : text} />
          </Fragment>
        )}
        <Divider />
        <DatePosted>
          <span>WRITTEN BY</span>
          <Username>{username || 'Unknown writer'}</Username>
        </DatePosted>
      </ApprovedArticleDetails>
    </SubmitArticleFormContent>
  )
}