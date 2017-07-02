import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  selectSubscription: Subscription;
  editItemId: number;
  isEditMode: boolean = false;
  
  getSubmitText() {
    if (this.isEditMode) {
      return "Update";
    }
    else {
      return "Add";
    }
  }

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.selectSubscription = this.slService.ingredientSelected
        .subscribe((id: number) => {
          this.editItemId = id;
          let ingredient = this.slService.getIngredient(id);

          this.slForm.setValue({
            name: ingredient.name,
            amount: ingredient.amount
          });

          this.isEditMode = true;
        });
  }

  onDeleteItem() {
    this.slService.deleteIngredient(this.editItemId);
    this.exitEditMode();
  }

  createIngredient() {
    const value = this.slForm.value;
    const ingredient = new Ingredient(value.name, value.amount);

    return ingredient;
  }

  onSubmit() {
    const ingredient = this.createIngredient();

    if (this.isEditMode) {
      // edit
      this.slService.editIngredient(this.editItemId, ingredient);
    }
    else {
      // add
      this.slService.addIngredient(ingredient);
    }

    this.exitEditMode();
  }

  exitEditMode() {
    this.isEditMode = false;
    this.slService.exitEditMode.next();
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.selectSubscription.unsubscribe();
  }
}
