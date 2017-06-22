import { Subject } from 'rxjs/Rx';
import { Ingredient } from '../shared/ingredient.model';

export class slService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    ingredientSelected = new Subject<number>();
    ingredientChanged = new Subject<void>();
    exitEditMode = new Subject<void>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(id: number) {
        return this.ingredients[id];
    }

    selectIngredient(id: number) {
        this.ingredientSelected.next(id);
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next();
    }

    editIngredient(id: number, ingredient: Ingredient) {
        this.ingredients[id] = ingredient;
        this.ingredientChanged.next();
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientChanged.next();
    }
}