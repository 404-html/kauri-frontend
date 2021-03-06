open ReasonApolloTypes;

type queryObj = {
  .
  "query": ReasonApolloTypes.queryString,
  "variables": Js.Json.t,
  "fetchPolicy": Js.Nullable.t(string),
};

type mutationObj = {
  .
  "mutation": ReasonApolloTypes.queryString,
  "variables": Js.Json.t,
  "fetchPolicy": Js.Nullable.t(string),
};

type generatedApolloClient = {
  .
  "query":
    [@bs.meth] (queryObj => Js.Promise.t(ReasonApolloTypes.executionResult)),
  "mutate":
    [@bs.meth] (
      mutationObj => Js.Promise.t(ReasonApolloTypes.executionResult)
    ),
  "resetStore": [@bs.meth] (unit => unit),
};

type fetch;

type linkOptions = {
  .
  "uri": string,
  "includeExtensions": Js.Nullable.t(bool),
  "fetch": Js.Nullable.t(fetch),
  "headers": Js.Nullable.t(Js.Json.t),
  "credentials": Js.Nullable.t(string),
  "fetchOptions": Js.Nullable.t(Js.Json.t),
};

[@bs.module "apollo-client"] [@bs.new]
external createApolloClientJS : 'a => generatedApolloClient = "ApolloClient";

[@bs.obj]
external apolloClientObjectParam :
  (
    ~link: apolloLink,
    ~cache: apolloCache,
    ~ssrMode: bool=?,
    ~ssrForceFetchDelay: int=?,
    ~connectToDevTools: bool=?,
    ~queryDeduplication: bool=?
  ) =>
  _ =
  "";