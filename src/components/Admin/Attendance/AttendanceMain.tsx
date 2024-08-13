import { Box } from "components/common";
import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useRecoilValue } from "recoil";
import { sortOptionState } from "store/form";

import { SortSelectBox } from "./AttendanceButton/SortSelectBox";
import { MainList } from "./AttendanceList/MainList";
import { EmptyList } from "./EmptyList";
import { MainSearchContext } from "./hooks/useSearchContext";
import { RootContainer, ScrollableContent } from "./styles";

export function AttendanceMain() {
  const { schoolId, adminId } = useAdminInfo();
  const { searchText, isFocused } = MainSearchContext.useSearchContext();
  const sortName = useRecoilValue(sortOptionState);

  const { data: dogList } = useDogListAndSortedList({ sortName, schoolId, adminId });
  const { data: searchList } = useDogSearchQuery(schoolId, searchText);

  const data = searchText ? searchList : dogList;

  return (
    <RootContainer isFocus={isFocused}>
      <ScrollableContent>
        {!searchText ? <SortSelectBox sortName={sortName} /> : <Box height="52px" />}
        {!data || data.length === 0 ? (
          <EmptyList isSearching={!!searchList} />
        ) : (
          <MainList data={data} />
        )}
      </ScrollableContent>
    </RootContainer>
  );
}
