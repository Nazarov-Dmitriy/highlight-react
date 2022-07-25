import React from "react";
import { nanoid } from "nanoid";

export default function List(props) {
  function withData() {
    return function () {
      const Func = function (props) {
        function Component1() {
          return props.views < 100 ? props.children[1] : props.children[2];
        }
        return <Component1 />;
      };

      return Func;
    };
  }

  const ListItem = withData()();

  function New(props) {
    return (
      <div className="wrap-item wrap-item-new">
        <span className="label">New!</span>
        {props.children}
      </div>
    );
  }

  function Popular(props) {
    return (
      <div className="wrap-item wrap-item-popular">
        <span className="label">Popular!</span>
        {props.children}
      </div>
    );
  }

  function Article(props) {
    return (
      <div className="item item-article">
        <h3>
          <a href="##">{props.title}</a>
        </h3>
        <p className="views">Прочтений: {props.views} </p>
      </div>
    );
  }

  function Video(props) {
    return (
      <div className="item item-video">
        ssssssss
        <iframe
          title="props.url"
          src={props.url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <p className="views">Просмотров: {props.views}</p>
      </div>
    );
  }

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
