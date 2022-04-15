import React from "react";

import girl from "../../images/girl.svg";
import girl2 from "../../images/girl2.svg";

import {
  LeftStatementsContainer,
  HomePageContainer,
  GreenContentContainer,
  BottomContainer,
  SecondaryTextConytainer,
  MainTextContainer,
  DoughtButton,
  MenthorButton,
  ImgContainer,
} from "./styles";

export default function HomePage() {
  return (
    <HomePageContainer className="mainContent">
      <GreenContentContainer>
        <LeftStatementsContainer>
          <MainTextContainer>
            <h1>Technical Share</h1>
          </MainTextContainer>
          <h2>
            Conectando pessoas
            <p>interessadas pela tecnologia</p>
          </h2>
        </LeftStatementsContainer>

        <ImgContainer>
          <img src={girl} alt="Tech Share" />
        </ImgContainer>
      </GreenContentContainer>
      <BottomContainer>
        <MenthorButton>
          <p>Marcar Mentoria</p>
        </MenthorButton>
        <DoughtButton>
          <p>tirar dúvida</p>
        </DoughtButton>
      </BottomContainer>

      <img src={girl2} alt="Technical Share" className="BottomImage" />
    </HomePageContainer>
  );
}
