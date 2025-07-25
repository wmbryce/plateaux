import { Suspense } from "react";
import { PageContent } from "../components/page-content";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <PageContent />
    </Suspense>
  );
}
