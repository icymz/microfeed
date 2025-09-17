import React from 'react';
import AdminWholeHtml from "../components/AdminWholeHtml";
import {NAV_ITEMS, NAV_ITEMS_DICT, OUR_BRAND} from "../../common-src/Constants";

export default class EdgeAdminVisitsApp extends React.Component {
  render() {
    const {feedContent, onboardingResult} = this.props;
    return (
      <AdminWholeHtml
        title={`${NAV_ITEMS_DICT[NAV_ITEMS.VISITS].name} | ${OUR_BRAND.domain}`}
        description=""
        webpackJsList={['visits_js']}          // 下面在 webpack 中会新增这个 entry
        webpackCssList={['admin_styles_css']}
        feedContent={feedContent}
        onboardingResult={onboardingResult}
      />
    );
  }
}