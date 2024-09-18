import { SORT_NAME_KEY } from "constants/storage";

import { SORT_OPTIONS, SortOptions } from "components/Admin/Attendance/constant";
import { Box } from "components/common";
import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useLocalStorage } from "hooks/common/useLocalStorage";

import { SortSelectBox } from "./Button/SortSelectBox";
import { MainSearchContext } from "./hooks/useSearchContext";
import { EmptyList } from "./List/EmptyList";
import { MainList } from "./List/MainList";
import { RootContainer, ScrollableContent } from "./styles";

export function AttendanceMain() {
  const { schoolId } = useAdminInfo();
  const { searchText, isFocused } = MainSearchContext.useSearchContext();
  const [sortName, setSortName] = useLocalStorage<SortOptions>(
    SORT_NAME_KEY,
    SORT_OPTIONS.REGISTERED
  );

  const { data: dogList } = useDogListAndSortedList({ sortName, schoolId });
  const { data: searchList } = useDogSearchQuery(schoolId, searchText);

  const data = searchText ? searchList : dogList;

  return (
    <RootContainer isFocus={isFocused}>
      {!searchText ? (
        <SortSelectBox sortName={sortName} onSelect={setSortName} />
      ) : (
        <Box height="52px" />
      )}
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
