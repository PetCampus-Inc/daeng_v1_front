import ArrowDownIcon from "assets/svg/arrow-down-icon";
import Header from "components/common/Header";
import Calendar from "components/Member/Agenda/Calendar";
import CompletedNotice from "components/Member/Agenda/CompletedNotice";
import NoCompletedNotice from "components/Member/Agenda/NoCompletedNotice";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const MemberAgendaPage = () => {
  const [isCalendarClosed, setIsCalendarClosed] = useState<boolean>(false);
  const handleCloseButton = () => {
    setIsCalendarClosed((prev) => !prev);
  };

  return (
    <>
      <div>Chat</div>
      <Header type="text" text="알림장" />

      {/* <NavBar type="admin" attendance={PATH.ADMIN_CHAT} /> */}
      <ErrorBoundary fallback={<div>TODO: 달력fallback 페이지 제작 필요</div>}>
        <Calendar />
        <CloseButton onClick={handleCloseButton}>
          {isCalendarClosed ? (
            <>
              펼쳐보기 <ArrowDownIcon className="down" />
            </>
          ) : (
            <>
              닫기 <ArrowDownIcon />
            </>
          )}
        </CloseButton>
      </ErrorBoundary>
      <ErrorBoundary fallback={<NoCompletedNotice />}>
        <NoticeWrapper>
          <CompletedNotice dogId={2} />
        </NoticeWrapper>
      </ErrorBoundary>
    </>
  );
};

export default MemberAgendaPage;

const NoticeWrapper = styled.div`
  padding: 2.5rem 1rem;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 50px;
  background-color: white;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_M};
  > svg {
    transform: rotateX(180deg);
    &.down {
      transform: rotateX(0deg);
    }
    transition: all 0.3s;
  }
`;
