import gql from 'graphql-tag'

export const submitArticle = gql`
  mutation submitArticle(
    $request_id: String
    $text: String
    $subject: String
    $sub_category: String
    $category: String
    $metadata: Map_String_StringScalar
  ) {
    submitArticle(
      request_id: $request_id
      text: $text
      subject: $subject
      sub_category: $sub_category
      category: $category
      metadata: $metadata
    ) {
      hash
    }
  }
`

export const commentArticle = gql`
  mutation commentArticle(
    $comment: String
    $highlight_from: Int
    $highlight_to: Int
    $article_id: String
    $anchor_key: String
    $focus_key: String
  ) {
    commentArticle(
      comment: $comment
      highlight_from: $highlight_from
      highlight_to: $highlight_to
      id: $article_id
      anchor_key: $anchor_key
      focus_key: $focus_key
    ) {
      hash
    }
  }
`

export const getArticle = gql`
  query getArticle($article_id: String) {
    getArticle(id: $article_id) {
      article_id
      user_id
      request_id
      date_created
      date_updated
      text
      tip
      status
      subject
      sub_category
      category
      content_hash
      versions(version: "ALL") {
        text
        version
        date_created
        comments {
          comment_id
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
          user {
            username
          }
        }
      }
      user {
        user_id
        username
      }
      metadata
    }
  }
`

export const getArticleForAnalytics = gql`
  query getArticle($article_id: String) {
    getArticle(id: $article_id) {
      article_id
      user_id
      request_id
      date_created
      date_updated
      tip
      status
      subject
      sub_category
      category
      content_hash
      user {
        user_id
        username
      }
      metadata
    }
  }
`

export const editArticle = gql`
  mutation editArticle($article_id: String, $text: String, $subject: String) {
    editArticle(id: $article_id, text: $text, subject: $subject) {
      hash
    }
  }
`

export const searchApprovedArticles = gql`
  query searchApprovedArticles($size: Int = 500, $text: String, $category: String) {
    searchArticles(
      size: $size
      dir: DESC
      filter: { full_text: $text, status_in: [APPROVED], category_in: [$category] }
    ) {
      totalElements
      content {
        article_id
        user_id
        request_id
        date_created
        date_updated
        tip
        status
        category
        sub_category
        subject
        text
        versions(version: "ALL") {
          version
          date_created
          comments {
            date_created
            comment
            highlight_from
            highlight_to
            anchor_key
            focus_key
          }
        }
      }
    }
  }
`

export const globalSearchApprovedCategoryArticles = gql`
  query globalSearchApprovedArticles($size: Int = 500, $category: String) {
    searchArticles(size: $size, dir: DESC, filter: { category_in: [$category], status_in: [APPROVED] }) {
      totalElements
      content {
        article_id
        user_id
        request_id
        date_created
        date_updated
        tip
        status
        category
        sub_category
        subject
        text
        versions(version: "ALL") {
          version
          date_created
          comments {
            date_created
            comment
            highlight_from
            highlight_to
            anchor_key
            focus_key
          }
        }
      }
    }
  }
`

export const globalSearchApprovedArticles = gql`
  query globalSearchApprovedArticles($size: Int = 500, $text: String) {
    searchArticles(size: $size, dir: DESC, filter: { full_text: $text, status_in: [APPROVED] }) {
      totalElements
      content {
        article_id
        user_id
        request_id
        date_created
        date_updated
        tip
        status
        category
        sub_category
        subject
        text
        versions(version: "ALL") {
          version
          date_created
          comments {
            date_created
            comment
            highlight_from
            highlight_to
            anchor_key
            focus_key
          }
        }
      }
    }
  }
`

export const searchPersonalSubmittedArticles = gql`
  query searchPersonalSubmittedArticles($size: Int = 500, $userId: String) {
    searchArticles(size: $size, dir: DESC, filter: { user_id_eq: $userId }) {
      content {
        article_id
        user_id
        request_id
        date_created
        date_updated
        tip
        text
        status
        category
        sub_category
        subject
        versions(version: "ALL") {
          comments {
            date_created
          }
        }
        user {
          username
        }
      }
    }
  }
`

export const searchPendingArticles = gql`
  query searchPendingArticles($size: Int = 500, $filter: ArticleFilterInput) {
    searchArticles(size: $size, dir: DESC, filter: $filter) {
      content {
        article_id
        user_id
        request_id
        date_created
        date_updated
        tip
        text
        content_hash
        status
        category
        sub_category
        subject
        versions(version: "ALL") {
          comments {
            date_created
          }
        }
        user {
          username
          user_id
        }
      }
      totalElements
    }
  }
`

export const getTotalArticlesCount = gql`
  query getTotalArticlesCount($category: String) {
    searchArticles(filter: { category_in: [$category], status_in: [APPROVED] }) {
      totalElements
    }
  }
`

export const totalArticlesCount = gql`
  query totalArticlesCount($filter: ArticleFilterInput) {
    searchArticles(filter: $filter) {
      totalElements
    }
  }
`

export const rejectArticle = gql`
  mutation rejectArticle($article_id: String, $rejection_cause: String) {
    rejectArticle(id: $article_id, rejection_cause: $rejection_cause) {
      hash
    }
  }
`

export const searchApprovedArticleHistory = gql`
  query searchApprovedArticleHistory($userId: String, $categories: [String]) {
    searchArticles(filter: { category_in: $categories, status_in: [APPROVED], moderator_eq: $userId }) {
      content {
        article_id
        user_id
        request_id
        date_created
        date_updated
        tip
        text
        status
        category
        sub_category
        subject
        versions(version: "ALL") {
          comments {
            date_created
          }
        }
        user {
          username
        }
      }
      totalElements
    }
  }
`

export const storeArticleOwnershipSignature = gql`
  mutation storeArticleOwnershipSignature($id: String, $signature: String) {
    storeArticleOwnershipSignature(id: $id, signature: $signature) {
      hash
    }
  }
`

export const storeArticleValidationSignature = gql`
  mutation storeArticleValidationSignature($id: String, $signature: String) {
    storeArticleValidationSignature(id: $id, signature: $signature) {
      hash
    }
  }
`

export const deleteArticleComment = gql`
  mutation deleteArticleComment($article_id: String, $comment_id: Int) {
    deleteArticleComment(id: $article_id, comment_id: $comment_id) {
      hash
    }
  }
`