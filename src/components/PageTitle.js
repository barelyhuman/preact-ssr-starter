import { styled } from "goober";

const Title = styled("h1")`
  color: #181813;
`;

export default function PageTitle({ children }) {
  return <Title>{children}</Title>;
}
