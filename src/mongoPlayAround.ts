import mongoose, { Types } from 'mongoose';

export interface IIngredient {
    name: string,
    description: string,
    quantity: number,
    quantityType: string
}

export interface IRecipe {
    name: string,
    description: string,
    cookingTimeInMinutes: number,
    cost: number,
    method: Types.Array<string>,
    ingredients: Types.DocumentArray<IIngredient>,
    logName: () => void;
}

const main = async() => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    mongoose.connection.on('disconnected', err => {
        console.log('Connection was disconnected')
    })

    const ingredientSchema = new mongoose.Schema<IIngredient>(
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

    const recipeSchema = new mongoose.Schema<IRecipe>(
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

    const Recipe = mongoose.model('Recipe', recipeSchema);

    const recipe = new Recipe({
        name: 'recipe1',
        description: 'new description',
        ingredients: [
            {
                name: 'ingredient name'
            }
        ]
    });

    await recipe.save();

    // recipe.name = 'This is a different name';

    // await recipe.save();

    // const recipes = await Recipe
    //     .find()
    //     .where('name')
    //     .equals('recipe1');
    const recipes = await Recipe
        .find({ name: 'recipe1'})
        .select('name');

    console.log(recipes);


}

main()
    .then()
    .catch((err) => console.log(err));