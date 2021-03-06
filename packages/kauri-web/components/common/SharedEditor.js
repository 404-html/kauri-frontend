import React from 'react'
import { EditorState, ContentState } from 'draft-js'
import styled, { css } from 'styled-components'
import ReactMde, { DraftUtil } from '@rej156/react-mde'
import Showdown from 'showdown'
import { getDefaultCommands } from '@rej156/react-mde/lib/js/commands'
import R from 'ramda'
import { hljs } from '../../lib/hljs'
import uploadImageCommand from '../../lib/reactmde-commands/upload-image'
import youtubeCommand from '../../lib/reactmde-commands/youtube'

export const errorBorderCss = css`
  position: absolute;
  z-index: 1000;
  width: 950px;
  height: 22em;
  border: 2px solid ${props => props.theme.errorRedColor};
`

export const EditorContainer = styled.div`
  min-height: 20em;
  cursor: text;
  margin-bottom: 2em;
  ${props => props.hasErrors && errorBorderCss};
`

let reactMdeCommands = getDefaultCommands()
reactMdeCommands[1][3] = uploadImageCommand
reactMdeCommands[1][4] = youtubeCommand

Showdown.extension('highlightjs', function () {
  return [
    {
      type: 'output',
      regex: new RegExp(`<code>`, 'g'),
      replace: `<code class="hljs">`,
    },
  ]
})

export class SharedEditor extends React.Component<*> {
  commands = reactMdeCommands
  converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    extensions: ['highlightjs'],
  })

  componentDidUpdate () {
    if (document.querySelector('.mde-preview')) {
      R.map(block => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
    }
  }

  async componentDidMount () {
    if (this.props.editorState) {
      const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        extensions: ['highlightjs'],
      })
      // console.log(this.props.editorState)
      const mdeState = await DraftUtil.getMdeStateFromDraftState(
        (this.props.editorState && this.props.editorState.draftEditorState) ||
          EditorState.createWithContent(
            ContentState.createFromText(
              typeof this.props.editorState === 'string'
                ? JSON.parse(this.props.editorState).markdown
                : this.props.editorState.markdown
            )
          ),
        markdown => Promise.resolve(converter.makeHtml(markdown))
      )
      this.props.handleChange(mdeState)
    }
  }

  render () {
    const { editorState, handleChange, readOnly } = this.props

    return (
      <div className='container'>
        <ReactMde
          commands={this.commands}
          editorKey='foobaz'
          layout='tabbed'
          readOnly={readOnly}
          spellCheck
          stickyToolbar
          onChange={handleChange}
          editorState={editorState}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
        />
      </div>
    )
  }
}

export default SharedEditor
