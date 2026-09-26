import PaginaSector, { metadataSector } from "../components/PaginaSector";

export const metadata = metadataSector("infoproductores");

export default function Page() {
  return <PaginaSector slug="infoproductores" />;
}
