import { StyledWrapper, StyledTitle } from "./styles";
import React from "react";

interface props {
    message: string;
};

const LoadingIndicator: React.FC<props> = ({ message }) => {
    return (
        <StyledWrapper>
            <StyledTitle>{message}</StyledTitle>
        </StyledWrapper>
    );
}

export default LoadingIndicator;