import {useState} from "react";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import theme from "../theme";
import axios from "axios"

const PageContainer = styled.div`
    display: flex;
    height: 100%`;

const LeftContainer = styled.div<{ height: number }>`
    flex: 1;
    color: red;
    background-color: ${theme.colors.primary};
    position: absolute;
    height: ${props => props.height}vh;
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
    height: 200vh;
    length: 100%
`;

const RightContainer = styled.div<{ height: number }>`
    flex: 3
    color: red;
    background-color: ${theme.colors.primary};
    position: absolute;
    height: ${props => props.height}vh;
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

const IngredientsBody = styled(Body) `
    top: 115%;`

const StepsBody = styled(Body) `
    top: 130%;`

const StepsContainer = styled.div`
  padding-right: 10%;
  padding-top: 2%;
`;

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
 width: 40px;
 height: 40px;
 border-radius: 50%;
 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
 margin-right: 10px;

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

const UnitSelect= styled.select`
  padding: 0.5rem 0.5rem 0.5rem 1rem; // Right padding to make room for the icon
  border: 1px solid ${theme.colors.grey};
  border-radius: 72px;
  font-size: 1rem;
  width: 40%;
  flex: 1;
`;

const Option = styled.option`
  font-size: 1rem;
`;

// Define an interface for the ingredient object
interface Ingredient {
  ingredient: string;
  quantity: string;
  unit: string;
}

interface Steps {
  step: string;
}

const TutorialsPage = () => {
  // const [imageURL, setImageURL] = useState<string>("")
  const [cookTime, setCookTime] = useState<number>(0)
  const [servingSize, setServingSize]  = useState<number>(0)
  const [prepTime, setPrepTime] = useState<number>(0)
  // const [tags, setTags] = useState<string>("")
  const [leftContainerHeight, setLeftContainerHeight] = useState(215); // Initial height
  const [rightContainerHeight, setRightContainerHeight] = useState(215); 
  const [recipeIngredients, setIngredients] = useState<Ingredient[]>([{ ingredient: "", quantity: "", unit: "" }]);
  const [recipeSteps, setSteps] = useState<Steps[]>([{step: ""}]);
  const [newTitle, setTitle] = useState<string>("")

  const handleAddStep = () => {
    setSteps([...recipeSteps, { step: "" }]);
    setLeftContainerHeight(leftContainerHeight + 7);
    setRightContainerHeight(rightContainerHeight + 7);
  };

  const handleRemoveStep = () => {
    setSteps(recipeSteps.splice(0, recipeSteps.length - 1));
    setLeftContainerHeight(leftContainerHeight - 7);
    setRightContainerHeight(rightContainerHeight - 7);
  };

  const handleAddIngredient = () => {
    setIngredients([...recipeIngredients, { ingredient: "", quantity: "", unit: "" }]);
    setLeftContainerHeight(leftContainerHeight + 6);
    setRightContainerHeight(rightContainerHeight + 6);
  };

  const handleRemoveIngredient = () => {
    setIngredients(recipeIngredients.splice(0, recipeIngredients.length - 1));
    setLeftContainerHeight(leftContainerHeight - 6);
    setRightContainerHeight(rightContainerHeight - 6);
  };

  const handleIngredientChange = (index: number, key: keyof Ingredient, value: string) => {
    const newIngredients: Ingredient[] = [...recipeIngredients]; // Explicitly define the type of newIngredients
    newIngredients[index][key] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, key: keyof Steps, value: string) => {
    const newSteps: Steps[] = [...recipeSteps]; // Explicitly define the type of newIngredients
    newSteps[index][key] = value;
    setSteps(newSteps);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleCookTimeChange = (value: string) => {
    setCookTime(Number(value));
  };

  const handlePrepTimeChange = (value: string) => {
    setPrepTime(Number(value));
  };

  const handleServingSizeChange = (value: string) => {
    setServingSize(Number(value));
  };

  const AddRecipe = () => {
      const auth = getAuth();
      const user = auth.currentUser;
      var ingredientsDict: { [id: string] : string} = {}
      var quantitiesDict: { [id: string] : string} = {}
      var unitsDict: { [id: string] : string} = {}
      var stepsDict: { [id: string] : string} = {}
      for (let i = 0; i < recipeIngredients.length; i++) {
        ingredientsDict[i.toString()] = recipeIngredients[i]["ingredient"]
        quantitiesDict[i.toString()] = recipeIngredients[i]["quantity"]
        unitsDict[i.toString()] = recipeIngredients[i]["unit"]
      }
      for (let i = 0; i < recipeSteps.length; i++) {
        stepsDict[i.toString()] = recipeSteps[i]["step"]
      }

      if (user) {
        const newRecipe = {
          'author': user["email"]?.split("@")[0],
          'cook_time': cookTime,
          'prep_time': prepTime,
          'serving_size': servingSize,
          'title': newTitle,
          'ingredients': ingredientsDict,
          'quantities': quantitiesDict,
          'units': unitsDict,
          'steps': stepsDict,
          'tags': []
        }

        const postRecipe = async() => {
          await axios.post('http://localhost:9000/recipes/add_recipe', newRecipe)
            .then(function (response: any) {
              console.log(response.json()); // Response from the server
            })
            .catch(function (error: any) {
              console.error('Error making POST request:', error);
            });
        }
        postRecipe()
      }
      else {
        console.log("user has not been found!")
      }
  }

  return (
      <PageContainer>
          <LeftContainer height={leftContainerHeight}></LeftContainer>
          <FormContainer>
            <Title>Add Your Own Recipe</Title>
            <TitleBody>Recipe Title:</TitleBody>
            <Input type="text" placeholder="ex: Chicken Cassarolle" onChange={(e) => handleTitleChange(e.target.value)}/>

            <CookBody>Cook Time:</CookBody>
            <NumberInput type="number" placeholder="ex: 5 (minutes)" onChange={(e) => handleCookTimeChange(e.target.value)}/>

            <PrepBody>Prep Time:</PrepBody>
            <NumberInput type="number" placeholder="ex: 20 (minutes)" onChange={(e) => handlePrepTimeChange(e.target.value)}/>

            <ServingBody>Serving Size:</ServingBody>
            <NumberInput type="number" placeholder="ex: 4 (people)" onChange={(e) => handleServingSizeChange(e.target.value)}/>

            <IngredientsBody>Ingredients:</IngredientsBody>
            <ImageButton onClick={handleAddIngredient}>+</ImageButton>
            <ImageButton onClick={handleRemoveIngredient}>-</ImageButton>
            <IngrediantsContainer>
              <IngrediantRow>
                  <IngrediantText>Ingredient</IngrediantText>
                  <IngrediantText></IngrediantText>
                  <IngrediantText>Quantity</IngrediantText>
                  <IngrediantText>Units</IngrediantText>
              </IngrediantRow>
              {recipeIngredients.map((ingredient, index) => (
                <IngrediantRow key={index}>
                    <IngrediantInput
                      type="text"
                      placeholder="Ingredient"
                      value={ingredient.ingredient}
                      onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                    />
                    <QuantityInput
                      type="text"
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    />
                  <UnitSelect
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  >
                    <Option value="">Select Unit</Option>
                    <Option value="lbs">lbs</Option>
                    <Option value="tsp">tsp</Option>
                    <Option value="tbsp">tbsp</Option>
                    <Option value="cups">cups</Option>
                    <Option value="cans">cans</Option>
                    <Option value="oz">oz</Option>
                    <Option value="quart">quart</Option>
                    <Option value="gallon">gallons</Option>
                    <Option value="liters">liters</Option>
                    <Option value="cloves">cloves</Option>
                  </UnitSelect>
                </IngrediantRow>
              ))}
            </IngrediantsContainer>

            <StepsBody>Steps:</StepsBody>
            <ImageButton onClick={handleAddStep}>+</ImageButton>
            <ImageButton onClick={handleRemoveStep}>-</ImageButton>
            {recipeSteps.map((step, index) => (
            <StepsContainer key={index}>
              <span>Step {index + 1}:    </span>
              <Input 
                type="text" 
                placeholder=""
                value={step.step}
                onChange={(e) => handleStepChange(index, 'step', e.target.value)}/>
            </StepsContainer>
            ))}
            <TagsBody>Tags:</TagsBody>
            <Input type="text" placeholder="ex: Gluten Free"/>
            <br/><br/><br/><br/><br/><br/>
            <AddRecipeButton onClick={AddRecipe}>Add Recipe</AddRecipeButton>
          </FormContainer>
          <RightContainer height={rightContainerHeight}></RightContainer>
    </PageContainer>
  );
};

export default TutorialsPage;
