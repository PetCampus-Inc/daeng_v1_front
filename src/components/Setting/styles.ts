import styled from "styled-components";

interface ISettingProps {
  type?: string;
}

export const SettingList = styled.ul``;

export const SettingItem = styled.li<ISettingProps>`
  padding: 1rem;
  display: flex;
  flex-direction: ${(props) => (props.type === "verUpdate" ? "column" : "row")};
  justify-content: ${(props) => (props.type === "notification" ? "space-between" : "normal")};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  ${({ theme }) => theme.typo.label1_16_M};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 0;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtomBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

// TODO 추후 공통 컴포넌트 작업 필요합니다.
export const StyledIconBox = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.body1_18_B}
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const SubTitle = styled.span`
  ${({ theme }) => theme.typo.body2_16_R}
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Text = styled.span`
  ${({ theme }) => theme.typo.label1_16_M};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const SubTextPL = styled.span`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_2};
  padding-left: 1.75rem;
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const GotoPageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3125rem;
  width: 100%;
`;

export const GotoUpdateButton = styled.button`
  ${({ theme }) => theme.typo.caption1_12_B};
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  font-weight: 700;
  padding: 0 0.5rem;
`;
