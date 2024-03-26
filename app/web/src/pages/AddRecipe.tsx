import {useState} from "react";
import styled from "styled-components";
import theme from "../theme";

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

interface Recipe {
  id: number;
  imageURL: string;
  author: string;
  cook_time: number;
  serving_size: number;
  date: string;
  prep_time: number;
  tags: string[];
  ingredients: { [key: string]: string };
  steps: { [key: string]: string };
  title: string;
}

const TutorialsPage = () => {
  // const [id, setID] = useState<number>(0)
  // const [imageURL, setImageURL] = useState<string>("")
  // const [author, setAuthor] = useState<string>("")
  // const [cookTime, setcookTime] = useState<number>(0)
  // const [servingSize, setServingSize]  = useState<number>(0)
  // const [date, setDate] = useState<string>("")
  // const [prepTime, setPrepTime] = useState<number>(0)
  // const [tags, setTags] = useState<string>("")
  const [leftContainerHeight, setLeftContainerHeight] = useState(215); // Initial height
  const [rightContainerHeight, setRightContainerHeight] = useState(215); 
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ ingredient: "", quantity: "", unit: "" }]);
  const [steps, setSteps] = useState<Steps[]>([{step: ""}]);
  // const [title, setTitle] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([{
    id: 0,
    imageURL: "",
    author: "", 
    cook_time: 0,
    serving_size: 0,
    date: "",
    prep_time: 0,
    tags: [],
    ingredients: { ingredient: "", quantity: "", unit: "" },
    steps: {step: ""},
    title: ""
  }])

  const handleAddStep = () => {
    setSteps([...steps, { step: "" }]);
    setLeftContainerHeight(leftContainerHeight + 7);
    setRightContainerHeight(rightContainerHeight + 7);
  };

  const handleRemoveStep = () => {
    setSteps(steps.splice(0, steps.length - 1));
    setLeftContainerHeight(leftContainerHeight - 7);
    setRightContainerHeight(rightContainerHeight - 7);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "", unit: "" }]);
    setLeftContainerHeight(leftContainerHeight + 6);
    setRightContainerHeight(rightContainerHeight + 6);
  };

  const handleRemoveIngredient = () => {
    setIngredients(ingredients.splice(0, ingredients.length - 1));
    setLeftContainerHeight(leftContainerHeight - 6);
    setRightContainerHeight(rightContainerHeight - 6);
  };

  const handleIngredientChange = (index: number, key: keyof Ingredient, value: string) => {
    const newIngredients: Ingredient[] = [...ingredients]; // Explicitly define the type of newIngredients
    newIngredients[index][key] = value;
    console.log(newIngredients)
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, key: keyof Steps, value: string) => {
    const newSteps: Steps[] = [...steps]; // Explicitly define the type of newIngredients
    newSteps[index][key] = value;
    setSteps(newSteps);
  };

  return (
      <PageContainer>
          <LeftContainer height={leftContainerHeight}></LeftContainer>
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
              {ingredients.map((ingredient, index) => (
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
            {steps.map((step, index) => (
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
            <AddRecipeButton>Add Recipe</AddRecipeButton>
          </FormContainer>
          <RightContainer height={rightContainerHeight}></RightContainer>
    </PageContainer>
  );
};

export default TutorialsPage;
