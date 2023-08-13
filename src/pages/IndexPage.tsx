import { LoadingIndicator } from "components/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const IndexPage = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <LoadingIndicator isLoading={isLoading} />
            {!isLoading && <Link to="/login"><StyledButton>Go to Login Page</StyledButton></Link>}
        </div>
    );
};


const StyledButton = styled.button`
  background-color: #6A24FE;
  color: #fff;
  margin: 0 30px ;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4b19cc;
  }
`;

export default IndexPage;
