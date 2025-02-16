import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyled = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}
`;
export const Container = styled.div`
    width: 100%;
    max-height: 100vh;
    height: 100vh;
    display: flex;
    justify-content: center;
`
export const ContainerPage = styled.main`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: start;
    justify-content: center;
    margin-top: 20px;
    padding: 1rem;
`
export const Page = styled.main`
    width: 800px;
    flex: 1;
    max-width: 100%;
`