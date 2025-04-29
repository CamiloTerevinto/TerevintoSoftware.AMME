import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EditorToolbarComponent } from './toolbar/toolbar.component';
import { MatMarkdownEditorComponent } from './editor/editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    declarations: [
        EditorToolbarComponent,
        MatMarkdownEditorComponent
    ],
    exports: [
        EditorToolbarComponent,
        MatMarkdownEditorComponent
    ]
})
export class MarkdownEditorModule {

}
