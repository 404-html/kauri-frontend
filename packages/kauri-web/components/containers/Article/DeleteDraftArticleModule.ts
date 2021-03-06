import { Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import { showNotificationAction } from '../../../lib/Module';
import { deleteDraftArticle } from './__generated__/deleteDraftArticle';
import { getArticleTitle } from './__generated__/getArticleTitle';

export const deleteDraftArticleMutation = gql`
  mutation deleteDraftArticle($id: String, $version: Int) {
    cancelArticle(id: $id, version: $version) {
      hash
    }
  }
`;

export const getArticleTitleQuery = gql`
  query getArticleTitle($id: String, $version: Int) {
    getArticle(id: $id, version: $version) {
      title
    }
  }
`;

export interface IDependencies {
  apolloClient: ApolloClient<{}>;
  apolloSubscriber: <T>(hash: string) => Promise<{ data: { output: T } }>;
  smartContracts: any;
  web3: any;
  fetch: any;
  web3PersonalSign: any;
  getGasPrice: any;
  driverJS: any;
  personalSign: any;
}

interface IAction {
  type: string;
  payload?: {};
}

interface IDeleteDraftArticlePayload {
  id: string;
  version: number;
}

interface IDeleteDraftArticleAction extends IAction {
  type: 'DELETE_DRAFT_ARTICLE';
  payload: IDeleteDraftArticlePayload;
}

const DELETE_DRAFT_ARTICLE = 'DELETE_DRAFT_ARTICLE';

export const deleteDraftArticleAction = (
  payload: IDeleteDraftArticlePayload
): IDeleteDraftArticleAction => ({
  payload,
  type: DELETE_DRAFT_ARTICLE,
});

interface IDeleteDraftArticleCommandOutput {
  id: string;
  version: number;
}

const CommandOutput = t.interface({
  hash: t.string,
});

const GetArticle = t.interface({
  title: t.string,
});

export const deleteDraftArticleEpic: Epic<any, {}, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(DELETE_DRAFT_ARTICLE)
    .switchMap(({ payload: variables }: IDeleteDraftArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate<deleteDraftArticle>({
          mutation: deleteDraftArticleMutation,
          variables,
        })
      )
        .mergeMap(({ data: { cancelArticle } }) =>
          apolloSubscriber<IDeleteDraftArticleCommandOutput>(
            CommandOutput.decode(cancelArticle).getOrElseL(errors => {
              throw new Error(failure(errors).join('\n'));
            }).hash
          )
        )
        .mergeMap(({ data: { output: { id, version } } }) =>
          apolloClient.query<getArticleTitle>({
            query: getArticleTitleQuery,
            variables: { id, version },
          })
        )
        .map(
          ({ data: { getArticle } }) =>
            GetArticle.decode(getArticle).getOrElseL(errors => {
              throw new Error(failure(errors).join('\n'));
            }).title
        )
        .mergeMap(title =>
          Observable.merge(
            Observable.of(
              (showNotificationAction as any)({
                description: `Your draft article "${title}" has been deleted!`,
                message: 'Draft article deleted',
                notificationType: 'success',
              })
            )
          )
        )
    );
