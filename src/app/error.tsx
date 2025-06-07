"use client";

import sc from "@styles/pages/Error.module.scss";

export default function ErrorPage() {
  return (
    <div className={sc.error}>
      <h1>Error</h1>
      <p>Something went wrong! Please try again later</p>
    </div>
  );
}
