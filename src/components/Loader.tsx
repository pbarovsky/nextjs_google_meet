import { Loader2 } from "lucide-react";

import sc from "@styles/components/Loader.module.scss";

export default function Loader() {
  return (
    <div className={sc.loader_container}>
      <Loader2 className={sc.loader} />
    </div>
  );
}
