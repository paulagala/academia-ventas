import PaginaSector, { metadataSector } from "../components/PaginaSector";

export const metadata = metadataSector("empresas-de-formacion");

export default function Page() {
  return <PaginaSector slug="empresas-de-formacion" />;
}
