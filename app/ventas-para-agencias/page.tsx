import PaginaSector, { metadataSector } from "../components/PaginaSector";

export const metadata = metadataSector("agencias");

export default function Page() {
  return <PaginaSector slug="agencias" />;
}
