import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        FormsModule
    ]
})

export class SharedModule {

}