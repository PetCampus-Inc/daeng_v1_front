import { Box } from "components/common";
import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useRecoilValue } from "recoil";
import { sortOptionState } from "store/form";

import { SortSelectBox } from "./Button/SortSelectBox";
import { MainSearchContext } from "./hooks/useSearchContext";
import { EmptyList } from "./List/EmptyList";
import { MainList } from "./List/MainList";
import { RootContainer, ScrollableContent } from "./styles";

export function AttendanceMain() {
  const { schoolId } = useAdminInfo();
  const { searchText, isFocused } = MainSearchContext.useSearchContext();
  const sortName = useRecoilValue(sortOptionState);

  const { data: dogList } = useDogListAndSortedList({ sortName, schoolId });
  const { data: searchList } = useDogSearchQuery(schoolId, searchText);

  const data = searchText ? searchList : dogList;

  return (
    <RootContainer isFocus={isFocused}>
      {!searchText ? <SortSelectBox sortName={sortName} /> : <Box height="52px" />}
      <ScrollableContent>
        {!data || data.length === 0 ? (
          <EmptyList isSearching={!!searchList} />
        ) : (
          <MainList data={data} />
        )}
      </ScrollableContent>
    </RootContainer>
  );
}
