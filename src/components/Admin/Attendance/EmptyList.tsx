import { EmptyText } from "./styles";

export function EmptyList({ isSearching }: { isSearching: boolean }) {
  const text = isSearching ? "검색 결과와 일치하는 강아지가 없어요" : "아직 등원한 강아지가 없어요";

  return <EmptyText>{text}</EmptyText>;
}
