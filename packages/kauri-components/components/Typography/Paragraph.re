let component = ReasonReact.statelessComponent("Paragraph");

module Styles = {
  let baseParagraph = (~colorProp, ~sizeProp) =>
    Css.[
      fontSize(px(sizeProp)),
      fontWeight(400),
      color(hex(colorProp)),
      unsafe("wordBreak", "break-word"),
    ];

  let paragraph = (~colorProp, ~sizeProp) =>
    Css.(style(baseParagraph(~colorProp, ~sizeProp)));
};

let getLineClamp = (~text, ~cardHeight) =>
  switch (text, cardHeight) {
  | (text, cardHeight) when Js.String.length(text) > 65 && cardHeight <= 290 =>
    (text |> Js.String.substring(~from=0, ~to_=65)) ++ "..."
  | (text, _) => text
  };

let make = (~cardHeight=290, ~text, ~color="1E2428", ~size=14, _children) => {
  ...component,
  render: _self =>
    <div className={Styles.paragraph(~colorProp=color, ~sizeProp=size)}>
      {getLineClamp(~cardHeight, ~text) |> ReasonReact.string}
    </div>,
};