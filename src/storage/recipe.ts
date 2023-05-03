import { ObjectId } from "mongoose";
import { IRecipe, Recipe } from "../models/Recipe.model";

export const createRecipe = async (recipe: IRecipe): Promise<IRecipe> => {
    const recipeInsert = new Recipe(recipe);

    await recipeInsert.save();

    return recipeInsert;
}

export const updateRecipe = async (id: ObjectId, recipe: IRecipe) => {
    const updateResult = await Recipe.updateOne({ _id: id }, recipe);

    if (!updateResult.matchedCount) {
        throw new Error('Could not find a recipe to udpate')
    }

    return recipe;
}

export const getRecipes = async(): Promise<IRecipe[]> => {

    const recipes = await Recipe.find({});

    return recipes;
}