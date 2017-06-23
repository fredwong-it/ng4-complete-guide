import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  editForm: FormGroup;
  imagePathObj;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      "name": new FormControl(null),
      "imagePath": new FormControl(null),
      "description": new FormControl(null),
      "ingredients": new FormArray([])
    });

    this.imagePathObj = this.editForm.get("imagePath");

    this.route.params
        .subscribe((params: Params) => {
          this.id = +params["id"];
          this.editMode = params["id"] != null;
          //console.log(this.editMode);

          if (this.editMode) {
            this.initForm();
          }
        });
    
    this.recipeService.editModeChanged.next(true);
  }

  initForm() {
    const recipe = this.recipeService.getRecipe(this.id);

    this.editForm.setValue({
      name: recipe.name,
      imagePath: recipe.imagePath,
      description: recipe.description,
      ingredients: []
    });
  }

  onSave() {
    console.log(this.editForm.value);

    const value = this.editForm.value;
    const recipe = new Recipe(value.name, value.description, value.imagePath, []);

    if (this.editMode) {
      // edit
      this.recipeService.editRecipe(this.id, recipe);
    }
    else {
      // add
      this.recipeService.addRecipe(recipe);
    }
    
    this.navigateOut();
  }

  onCancel() {
    this.navigateOut();
  }

  private navigateOut() {
    if (this.editMode) {
      // edit
      this.router.navigate([".."], { relativeTo: this.route });
    }
    else {
      // add
      this.router.navigate(["/recipes"]);
    }
  }

  ngOnDestroy() {
    this.recipeService.editModeChanged.next(false);
  }
}
