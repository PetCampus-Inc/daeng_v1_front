import { routes } from "constants/path";

import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import { Text } from "components/common";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkButton = () => {
  return (
    <Link to={routes.admin.signup.root}>
      <StyledLink typo="label2_14_M" color="gray_2">
        처음이신가요? 회원가입하기 <ArrowRightSquare w={24} h={24} />
      </StyledLink>
    </Link>
  );
};

export default LinkButton;

const StyledLink = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
