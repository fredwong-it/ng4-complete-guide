import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { slService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe("Test recipe 1", 
                    "This is a test recipe 1", 
                    "http://s345780157.onlinehome.us/wp-content/uploads/2011/03/Rosh-Hashanah-chicken-with-apples.jpg",
                    [
                        new Ingredient("Meat", 1),
                        new Ingredient("Banada", 10)
                    ]
        ),
        new Recipe("Apple recipe", 
                    "This is a apple recipe", 
                    "http://s345780157.onlinehome.us/wp-content/uploads/2011/03/Rosh-Hashanah-chicken-with-apples.jpg",
                    [
                        new Ingredient("Rice", 100),
                        new Ingredient("Apple", 2)
                    ]
        )
    ];

    editModeChanged = new Subject<boolean>();
    recipeChanged = new Subject<void>();

    constructor(private slService: slService) {
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next();
    }

    updateRecipe(id: number, newRecipe: Recipe) {
        this.recipes[id] = newRecipe;
        this.recipeChanged.next();
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipeChanged.next();
    }
}