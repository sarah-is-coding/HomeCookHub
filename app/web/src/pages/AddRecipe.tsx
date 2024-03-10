import React from "react";
import styled from "styled-components";
import theme from "../theme";

const PageContainer = styled.div`
    display: flex;
    height: 100%`;

const LeftContainer = styled.div`
    flex: 1;
    color: red;
    background-color: #9f4644;
    position: absolute;
    height: 200vh;
    left: 0%;
    width: 20%`

const FormContainer = styled.div`
    flex: 3;
    position: absolute;
    color: black;
    top: 15%;
    left: 25%;
    border-color: black;
    border-radius: 5px;
    length: 100%
`;

const RightContainer = styled.div`
    flex: 3
    color: red;
    background-color: #9f4644;
    position: absolute;
    height: 200vh;
    left: 80%;
    width: 20%`

const Title = styled.h1`
  color: black;
  left: 10%;
  top: 15%;
  width: 800px;
  text-align: left;
  font-size: 4rem;
  padding-bottom: 100px
`;

const Body = styled.h1`
  color: black;
  left: 20%;
  width: 400px;
  text-align: left;
  font-size: 2rem;
  padding-top: 100px
`;


const TitleBody = styled(Body) `
  top: 40%;`

const CookBody = styled(Body) `
    top: 55%;`

const PrepBody = styled(Body) `
    top: 70%;`

const ServingBody = styled(Body) `
    top: 85%;`

const ImageBody = styled(Body) `
    top: 100%;`

const IngredientsBody = styled(Body) `
    top: 115%;`

const StepsBody = styled(Body) `
    top: 130%;`

const TagsBody = styled(Body) `
    top: 145%;`

const Input = styled.input`
    padding: 0.5rem 0.5rem 0.5rem 1rem; // Right padding to make room for the icon
    border: 1px solid ${theme.colors.grey};
    border-radius: 72px;
    font-size: 1rem;
    width: 40%;
  `;

const NumberInput = styled(Input)`
    width: 20%;
  `;


const ImageButton = styled.button`
 width: 100px;
 border-radius: 10%;
 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

`  
const IngrediantsContainer = styled.div`
  padding-right: 10%;
  padding-top: 5%;
`;

const IngrediantRow = styled.div`
display: flex;
  margin-bottom: 10px;
  `;
  
  const IngrediantText = styled.span`
  flex: 1;
  padding-right: 100px;
  `;
  
  const IngrediantInput = styled(Input)`
  flex: 2;
`;

const QuantityInput = styled(IngrediantInput)`
flex: 1;
`;

const AddRecipeButton = styled.button`
  width: 200px;
  height: 50px;
  left: 20%;
  border-radius: 10%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  color: ${theme.colors.black};
  font-size: 1.5rem;
`;
const UnitInput = styled(IngrediantInput)`
  flex: 1;
`;


const TutorialsPage = () => {
  return (
      <PageContainer>
          <LeftContainer></LeftContainer>
          <FormContainer>
            <Title>Add Your Own Recipe</Title>
            <TitleBody>Recipe Title:</TitleBody>
            <Input type="text" placeholder="ex: Chicken Cassarolle"/>

            <CookBody>Cook Time:</CookBody>
            <NumberInput type="number" placeholder="ex: 5 (minutes)"/>

            <PrepBody>Prep Time:</PrepBody>
            <NumberInput type="number" placeholder="ex: 20 (minutes)"/>

            <ServingBody>Serving Size:</ServingBody>
            <NumberInput type="number" placeholder="ex: 4 (people)"/>

            <ImageBody>Image:</ImageBody>
            <ImageButton>Add Image</ImageButton>

            <IngredientsBody>Ingredients:</IngredientsBody>
            <IngrediantsContainer>
            <IngrediantRow>
                <IngrediantText>Ingredient</IngrediantText>
                <IngrediantText></IngrediantText>
                <IngrediantText>Quantity</IngrediantText>
                <IngrediantText>Units</IngrediantText>
            </IngrediantRow>
            <IngrediantRow>
                <IngrediantInput type="text" placeholder="Ingredient" />
                <QuantityInput type="text" placeholder="Quantity" />
                <UnitInput type="text" placeholder="Units" />
            </IngrediantRow>
            </IngrediantsContainer>

            <StepsBody>Steps:</StepsBody>
            <Input type="text" placeholder="ex: Crack Open 2 Eggs"/>

            <TagsBody>Tags:</TagsBody>
            <Input type="text" placeholder="ex: Gluten Free"/>
            <br/><br/><br/><br/><br/><br/>
            <AddRecipeButton>Add Recipe</AddRecipeButton>
          </FormContainer>
          <RightContainer></RightContainer>
    </PageContainer>
  );
};

export default TutorialsPage;
