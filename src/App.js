import "instantsearch.css/themes/algolia-min.css";
import React from "react";
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Snippet
} from "react-instantsearch-dom";
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch("http://124.222.100.88", "");

const App = () => (
  <div className="ais-InstantSearch">
    <h1>往年考研调剂信息搜索 - 考研 1234</h1>
    <h2>
      <code>kaoyan1234.com</code>{" "}
      <span role="img" aria-label="emoji">
        🎮
      </span>
    </h2>
    <p>
      所有数据来自各院校单位的网站通知公告，数据由个人手工采集而来，本网站尽量保证准确性，但不提供任何担保
    </p>
    <InstantSearch indexName="tiaoji" searchClient={searchClient}>
      <div className="left-panel">
        <ClearRefinements />
        <SortBy
          defaultRefinement="steam-video-games"
          items={[
            { value: "steam-video-games", label: "Relevant" },
            {
              value: "steam-video-games:recommendationCount:desc",
              label: "Most Recommended"
            },
            {
              value: "steam-video-games:recommendationCount:asc",
              label: "Least Recommended"
            }
          ]}
        />
        <h2>Genres</h2>
        <RefinementList attribute="genres" operator="and" />
        <h2>Players</h2>
        <RefinementList attribute="players" />
        <h2>Platforms</h2>
        <RefinementList attribute="platforms" />
        <h2>Misc</h2>
        <RefinementList attribute="misc" />
        <Configure
          hitsPerPage={6}
          attributesToSnippet={["description:50"]}
          snippetEllipsisText={"..."}
        />
      </div>
      <div className="right-panel">
        <SearchBox />
        <Hits hitComponent={Hit} />
        <Pagination showLast={true} />
      </div>
    </InstantSearch>
  </div>
);

const Hit = ({ hit }) => (
  <div key={hit.id}>
    <div className="hit-name">
      <Highlight attribute="name" hit={hit} />
    </div>
    <img src={hit.image} align="left" alt={hit.name} />
    <div className="hit-description">
      <Snippet attribute="description" hit={hit} />
    </div>
    <div className="hit-info">price: {hit.price}</div>
    <div className="hit-info">release date: {hit.releaseDate}</div>
  </div>
);

export default App;
