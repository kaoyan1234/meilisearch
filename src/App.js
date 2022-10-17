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
  Snippet,
} from "react-instantsearch-dom";
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch("http://124.222.100.88", "", {
  paginationTotalHits: 30, // default: 200.
  placeholderSearch: true, // default: true.
  primaryKey: "Index", // default: undefined
  // ...
});

const App = () => (
  <div className="ais-InstantSearch">
    <h1>往年考研调剂信息搜索 - 考研 1234</h1>
    <p>
      所有数据来自各院校单位的网站通知公告，数据由个人手工采集而来，本网站尽量保证准确性，但不提供任何担保
    </p>
    <InstantSearch indexName="tiaoji" searchClient={searchClient}>
      <Configure
        hitsPerPage={6}
        attributesToSnippet={["description:50"]}
        snippetEllipsisText={"..."}
      />
      <div>
        <SearchBox />
        <Hits hitComponent={Hit} />
        <Pagination showLast={true} />
      </div>
    </InstantSearch>
  </div>
);

const Hit = ({ hit }) => (
  <div key={hit.Index}>

    <div className="hit-title">
      <span className="hit-title-txt hit-txt">{hit.Des} {hit.AMD ? "" : "[专]"}</span>
      <span className="hit-headcount">{hit.Sam ? "[同校]" : ""} {hit.HC}</span>
    </div>

    <div className="hit-school-line hit-txt">
      <span className="hit-school">{hit.School}</span>
      <span className="hit-line">{hit.Line.Sum}/{hit.Line.Big}/{hit.Line.Sma}</span>
    </div>

    <div className="hit-labels">
      {hit.Subject.map(item => (<span key={item.toString()} className="hit-info">{item}</span>))}
      {hit.Src.map(item => (<span key={item.toString()} className="hit-info">{item}</span>))}
    </div>

  </div>
);

export default App;
