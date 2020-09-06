import styled from "styled-components/native";

interface IProfile {
  profile: string;
}

export const Container = styled.View<IProfile>`
  flex: 1;
  background: ${props => props.profile == "Helper" ? "#54C7C0" : "#516DF5"};
  justify-content: center;
`;

