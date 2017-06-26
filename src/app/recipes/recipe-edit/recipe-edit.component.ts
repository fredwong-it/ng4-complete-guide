import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  imagePathObj;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
        .subscribe((params: Params) => {
          this.id = +params["id"];
          this.editMode = params["id"] != null;
          this.initForm();
        });
    
    this.recipeService.editModeChanged.next(true);
  }

  private initForm() {
    let recipeName = null;
    let recipeImagePath = null;
    let recipeDesc = null;
    let ingredients = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;

      // create ingredients
      for (let ingredient of recipe.ingredients) {
        const control = this.createIngredientControl(ingredient.name, ingredient.amount);
        ingredients.push(control);
      }
    }

    // create the recipeForm
    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDesc, Validators.required),
      "ingredients": new FormArray(ingredients)
    });

    this.imagePathObj = this.recipeForm.get("imagePath");
    
    console.log(this.recipeForm.value);
  }

  onSave() {
    console.log(this.recipeForm.value);

    // this.recipeForm.value has the same structure as Recipe model, so we can use it directly instead of create new Recipe()
    if (this.editMode) {
      // edit
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      // add
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.navigateOut();
  }

  onCancel() {
    this.navigateOut();
  }

  private navigateOut() {
    this.router.navigate([".."], { relativeTo: this.route });   // or ../
  }

  onAddIngredient() {
    const control = this.createIngredientControl();
    (<FormArray>this.recipeForm.get("ingredients")).push(control);
  }

  private createIngredientControl(name = null, amount = null) {
    const control = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "amount": new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    return control;
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(id)
  }

  ngOnDestroy() {
    this.recipeService.editModeChanged.next(false);
  }
}
