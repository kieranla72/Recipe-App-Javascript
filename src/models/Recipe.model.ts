import mongoose, { Schema, Types } from 'mongoose';

export interface IIngredient {
    name: string,
    description: string,
    quantity: number,
    quantityType: string
}

export const ingredientSchema = new Schema<IIngredient>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        quantity: {
            type: Number,
            required: false,
        },
        quantityType: {
            type: String,
            required: false,
        }
    }
)

export interface IRecipe {
    _id: Types.ObjectId;
    name: string,
    description: string,
    cookingTimeInMinutes: number,
    cost: number,
    method: Types.Array<string>,
    ingredients: Types.DocumentArray<IIngredient>,
    logName: () => void;
}

export const recipeSchema = new mongoose.Schema<IRecipe>(
    {
        name: {
            type: String,
            alias: 'Name',
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        cookingTimeInMinutes: {
            type: Number,
            required: false,
        },
        cost: {
            type: Number,
            required: false,
        },
        method: [{
            type: String,
            required: false,
        }],
        ingredients: [ingredientSchema],
    }, 
    {
        methods: {
            logName() {
                console.log(`A new recipe called ${this.name} has been created`)
            }
        },
        timestamps: true,
    }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
