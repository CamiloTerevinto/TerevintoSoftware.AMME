import { Component, input, model, output, Signal } from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})
export class EditorToolbarComponent {
  
  public onSave = output();
  public onExit = output();
  
  public editor: Signal<AceAjax.Editor> = input<AceAjax.Editor>();
  public documentState = model<"clean" | "pendingChanges">();
  public pageName = model<string>();

  insertContent(type: string) {
    if (!this.editor) {
      return;
    }

    const range = this.editor().selection.getRange();
    let selectedText = this.editor().session.getTextRange(range);
    let startSize = 2;
    let initText = '';
    const isSelected = !!selectedText;

    switch (type) {
      case 'Bold':
        initText = 'Bold Text';
        selectedText = `**${selectedText || initText}**`;
        break;
      case 'Italic':
        initText = 'Italic Text';
        selectedText = `*${selectedText || initText}*`;
        startSize = 1;
        break;
      case 'Heading':
        initText = 'Heading';
        selectedText = `# ${selectedText || initText}`;
        break;
      case 'Reference':
        initText = 'Reference';
        selectedText = `> ${selectedText || initText}`;
        break;
      case 'Link':
        selectedText = `[${selectedText}](https://)`;
        startSize = 1;
        break;
      case 'Image':
        selectedText = `![](https://)`;
        break;
      case 'Ul':
        selectedText = `- ${selectedText || initText}`;
        break;
      case 'Ol':
        selectedText = `1. ${selectedText || initText}`;
        startSize = 3;
        break;
      case 'Code':
        initText = 'Source Code';
        selectedText =
          '```language\r\n' + (selectedText || initText) + '\r\n```';
        startSize = 3;
        break;
    }

    this.editor().session.replace(range, selectedText);

    if (!isSelected) {
      range.start.column += startSize;
      range.end.column = range.start.column + initText.length;
      this.editor().selection.setRange(range, false);
    }

    this.editor().focus();
  }
}
