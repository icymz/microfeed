import React from "react";
import {renderReactToHtml} from "../../../edge-src/common/PageUtils";
import EdgeAdminVisitsApp from "../../../edge-src/EdgeAdminVisitsApp";

export async function onRequestGet({ data }) {
  const {feedContent, onboardingResult} = data;

  const fromReact = renderReactToHtml(
    <EdgeAdminVisitsApp
      feedContent={feedContent}
      onboardingResult={onboardingResult}
    />
  );

  return new Response(fromReact, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}