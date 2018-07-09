// @flow
import React from 'react'
import { Form } from 'antd'
import SubmitArticleFormActions from './SubmitArticleFormActions'
import SubmitArticleFormHeader from './SubmitArticleFormHeader'
import SubmitArticleFormContent from './SubmitArticleFormContent'

import type { EditArticlePayload, SubmitArticlePayload } from './Module'
import { formatMetadata } from './Module'
import type { ShowNotificationPayload } from '../../../lib/Module'

type Props =
  | any
  | {
      submitArticleAction: SubmitArticlePayload => void,
      editArticleAction: EditArticlePayload => void,
      article_id?: string,
      request_id: string,
      data: any,
      article?: any,
      form: any,
      handleFormChange: ({ text: string }) => void,
      routeChangeAction: string => void,
      isKauriTopicOwner: boolean,
      showNotificationAction: ShowNotificationPayload => void,
    }

type SubmitArticleVariables = { subject: string, text: string, sub_category?: string, version?: string }

class SubmitArticleForm extends React.Component<Props> {
  static Header = SubmitArticleFormHeader
  static Actions = SubmitArticleFormActions
  static Content = SubmitArticleFormContent

  getNetwork = async () =>
    new Promise((resolve, reject) => {
      window.web3.version.getNetwork((err, netId) => {
        if (err) {
          reject(err)
        }

        const networkId = netId
        let networkName

        switch (netId) {
          case '1':
            networkName = 'Mainnet'
            break
          case '2':
            networkName = 'Morden'
            break
          case '3':
            networkName = 'Ropsten'
            break
          case '4':
            networkName = 'Rinkeby'
            break
          case '42':
            networkName = 'Kovan'
            break
          case '224895':
            networkName = 'Kauri Dev'
            break
          default:
            networkName = 'Unknown'
        }

        resolve({ networkId: Number(networkId), networkName })
      })
    })

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(
      async (formErr, { text, subject, sub_category, category, version }: SubmitArticleVariables) => {
        const { networkName } = await this.getNetwork()
        if (networkName !== 'Rinkeby' && networkName !== 'Kauri Dev') {
          return this.props.showNotificationAction({
            notificationType: 'error',
            message: 'Network error!',
            description: 'Please switch to the correct Ethereum network!',
          })
        }
        if (!formErr) {
          const { submitArticleAction, editArticleAction, request_id, data, article_id } = this.props

          if (typeof request_id === 'string') {
            if (typeof article_id === 'string') {
              return editArticleAction({ request_id: data.getArticle.request_id, text, article_id, subject })
            } else {
              return submitArticleAction({
                request_id,
                text,
                subject,
                sub_category: data.getRequest.sub_category,
                metadata: formatMetadata({ version }),
              })
            }
          } else if (typeof article_id === 'string') {
            return editArticleAction({ text, article_id, subject, sub_category })
          } else {
            return submitArticleAction({
              request_id,
              text,
              subject,
              sub_category,
              category,
              metadata: formatMetadata({ version }),
            })
          }
        } else {
          Object.keys(formErr).map(errKey =>
            formErr[errKey].errors.map(err =>
              this.props.showNotificationAction({
                notificationType: 'error',
                message: 'Validation error!',
                description: err.message,
              })
            )
          )
          return console.error(formErr)
        }
      }
    )
  }

  render () {
    const { routeChangeAction, isKauriTopicOwner } = this.props

    return (
      <Form>
        <SubmitArticleForm.Actions
          {...this.props.form}
          handleSubmit={this.handleSubmit}
          routeChangeAction={routeChangeAction}
          text={this.props.data && this.props.data.getArticle && this.props.data.getArticle.text}
        />
        <SubmitArticleForm.Header
          {...this.props.form}
          category={
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.category) ||
            (this.props.data && this.props.data.getRequest && this.props.data.getRequest.category)
          }
          subCategory={
            (this.props.data && this.props.data.getRequest && this.props.data.getRequest.sub_category) ||
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.sub_category)
          }
          subject={this.props.data && this.props.data.getArticle && this.props.data.getArticle.subject}
          metadata={this.props.data && this.props.data.getArticle && this.props.data.getArticle.metadata}
          isKauriTopicOwner={isKauriTopicOwner}
        />
        <SubmitArticleForm.Content
          {...this.props.form}
          article_id={this.props.data && this.props.data.getArticle && this.props.data.getArticle.article_id}
          text={this.props.data && this.props.data.getArticle && this.props.data.getArticle.text}
        />
      </Form>
    )
  }
}

const WrappedSubmitArticleForm = Form.create()(SubmitArticleForm)

export default WrappedSubmitArticleForm