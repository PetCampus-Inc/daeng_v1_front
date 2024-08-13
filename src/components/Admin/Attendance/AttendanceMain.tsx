import { useDogListAndSortedList, useDogSearchQuery } from "hooks/api/admin/attendance";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useRecoilValue } from "recoil";
import { sortOptionState } from "store/form";

import { SortSelectBox } from "./AttendanceButton/SortSelectBox";
import { MainList } from "./AttendanceList/MainList";
import { EmptyList } from "./EmptyList";
import { useSearchContext } from "./hooks/useSearchContext";
import { List, Spacing } from "./styles";

export function AttendanceMain() {
  const { schoolId, adminId } = useAdminInfo();
  const { searchText, isFocused } = useSearchContext();
  const sortName = useRecoilValue(sortOptionState);

  const { data: dogList } = useDogListAndSortedList({ sortName, schoolId, adminId });
  const { data: searchList } = useDogSearchQuery(schoolId, searchText);

  const data = searchText ? searchList : dogList;

  return (
    <>
      <List isFocus={isFocused}>
        {!searchText ? <SortSelectBox sortName={sortName} /> : <Spacing />}
        {!data || data.length === 0 ? (
          <EmptyList isSearching={!!searchList} />
        ) : (
          <MainList data={data} />
        )}
      </List>
    </>
  );
}
