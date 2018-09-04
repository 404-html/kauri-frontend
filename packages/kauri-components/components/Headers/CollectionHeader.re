let component = ReasonReact.statelessComponent("CollectionHeader");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        width(`percent(100.0)),
        flexDirection(row),
        media(
          "only screen and (max-width: 500px)",
          [flexDirection(column), padding(px(10))],
        ),
      ])
    );

  let leftSide =
    Css.(
      style([
        display(`flex),
        flex(3),
        flexDirection(column),
        color(hex("ffffff")),
      ])
    );

  let rightSide =
    Css.(
      style([
        display(`flex),
        flex(1),
        alignItems(`center),
        flexDirection(column),
      ])
    );
};

let make =
    (
      ~name,
      ~description,
      ~username,
      ~userId,
      ~linkComponent=?,
      /* ~profileImage=?, */
      ~updated,
      ~url,
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.leftSide>
        <PostedDate date_field=updated dateType=PostedDate.Updated />
        <Heading size=28 text=name color="ffffff" />
        <Paragraph cardHeight=9000 size=16 text=description color="ffffff" />
        <ShareArticle url title=name />
      </div>
      <div className=Styles.rightSide>
        <Label text="Curator" color="ffffff" />
        {
          Belt.Option.mapWithDefault(
            linkComponent,
            <UserWidgetSmall
              pageType=None
              username=username->Belt.Option.getWithDefault(userId)
              color="ffffff"
            />,
            linkComponent =>
            linkComponent(
              <UserWidgetSmall
                pageType=None
                username=username->Belt.Option.getWithDefault(userId)
                color="ffffff"
              />,
            )
          )
        }
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  date: string,
  name: string,
  description: string,
  username: Js.Nullable.t(string),
  url: string,
  userId: string,
  profileImage: string,
  updated: string,
  routeChangeAction: string => unit,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~name=jsProps->nameGet,
      ~description=jsProps->descriptionGet,
      ~username=jsProps->usernameGet->Js.Nullable.toOption,
      ~userId=jsProps->userIdGet,
      ~linkComponent=jsProps->linkComponentGet,
      ~url=jsProps->urlGet,
      /* ~profileImage=jsProps->profileImageGet, */
      ~updated=jsProps->updatedGet,
      [||],
    )
  );