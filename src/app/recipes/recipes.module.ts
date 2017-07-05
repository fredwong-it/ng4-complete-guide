import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipesComponent,
        RecipeStartComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})

export class RecipesModule {

}