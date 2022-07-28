import React from "react";
import { nanoid } from "nanoid";
import Video from "./Video";
import Article from "./Article";
import Popular from "./Popular";
import New from "./New";

export default function List(props) {
  function withHoc() {
    return function Wrapper(props) {
      function Component1() {
        return props.views < 100 ? props.children[1] : props.children[2];
      }
      return <Component1 />;
    };
  }

  const ListItem = withHoc();

  function List(props) {
    return props.list.map((item) => {
      switch (item.type) {
        case "video":
          return (
            <>
              <ListItem
                key={nanoid()}
                {...item}
                children={[
                  <Video {...item} />,
                  <New {...item} children={<Video {...item} />} />,
                  <Popular {...item} children={<Video {...item} />} />,
                ]}
              />
            </>
          );
        case "article":
          return (
            <ListItem
              key={nanoid()}
              {...item}
              children={[
                <Video {...item} />,
                <New {...item} children={<Article {...item} />} />,
                <Popular {...item} children={<Article {...item} />} />,
              ]}
            />
          );
        default:
          throw Error("Error");
      }
    });
  }

  return <List {...props} />;
}
