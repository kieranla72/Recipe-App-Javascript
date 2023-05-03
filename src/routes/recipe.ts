import express, { NextFunction, Request, Response } from 'express';
import { IRecipe } from '../models/Recipe.model';
import { createRecipe, getRecipes, updateRecipe } from '../storage/recipe';

const recipeRouter = express.Router();

recipeRouter.post('/recipe', async(req: Request<any, any, IRecipe>, res: Response, next: NextFunction) => {

    try {
        const recipe: IRecipe = req.body;
    
        const insertedRecipe = await createRecipe(recipe);
    
        res.status(200).send(insertedRecipe);

    } catch(err) {
        console.log(`There was an error inserting the new recipe ${err}`)
        res.status(500).send();
        next();
    }
})

recipeRouter.post('/recipe/:id', async(req: Request<any, any, IRecipe>, res: Response, next: NextFunction) => {

    try {
        const recipe: IRecipe = req.body;
        const recipeId = req.params.id;
    
        await updateRecipe(recipeId, recipe);
    
        res.status(200).send();

    } catch(err) {
        console.log(`There was an error updating the recipe ${err}`)
        res.status(500).send();
        next();
    }
})

recipeRouter.get('/recipes', async(req: Request, res: Response, next: NextFunction) => {

    try {
        const recipes = await getRecipes();
    
        res.status(200).send(recipes);

    } catch(err) {
        console.log(`There was an error updating the recipe ${err}`)
        res.status(500).send();
        next();
    }
})


export default recipeRouter;