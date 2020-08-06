import styled from "@emotion/styled";
const defaultImage = "https://www.fintros.com/assets/how-it-works-anonymous-9410b457c2f2ee0bc77fe28c21aed3df6ddb647175c2dbd78fcbff4aa3c23145.png";

export const ContentContainer = styled.div`
  @media (max-width: 1280px) {
    margin-left: 0;
  }
`;

export const Image = styled.div`
  background-image: url('${props => props.backgroundImage || defaultImage}');
  background-position: center 25%;
  background-size: cover;
  color: #000;
  height: 28.75rem;
  width: 28.75rem;


  @media (max-width: 1280px) {
    margin-bottom: 1.5rem;
    width: 100%;
  }

  @media (max-width: 767px) {
    height: 15.5rem;
    padding: 0 1.5rem;
    width: 100%;
  }
`;

export const ReadMore = styled.a`
  border-bottom: 0.125rem solid currentcolor;
  color: rgba(0, 0, 0, 0.88);
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.125em;
  line-height: 1;
  margin: 0px;
  padding-bottom: 0.25rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 100ms ease-in 0s;
`;

export const TitleWrapper = styled.h2`
  font-weight: bold;
  margin-top: 2rem;
`;

export const TopicWrapper = styled.span`
  border-bottom: 0.125rem solid transparent;
  color: rgb(204, 131, 92);
  color: rgb(204, 131, 92);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.125em;
  line-height: 1;
  margin: 0px;
  padding-bottom: 0.25rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 100ms ease-in 0s;
`;
