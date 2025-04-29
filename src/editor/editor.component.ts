import { Component, forwardRef, AfterViewInit, OnInit, OnDestroy, ElementRef, output, input, effect, viewChild, Signal, SecurityContext, inject, model } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

declare let hljs: any;

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatMarkdownEditorComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MatMarkdownEditorComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class MatMarkdownEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly marked: Marked;
  private readonly aceEditorContainer: Signal<ElementRef> = viewChild<ElementRef>("aceEditor");
  private readonly _domSanitizer: DomSanitizer = inject(DomSanitizer);

  private _renderMarkTimeout: NodeJS.Timeout;
  private _markdownValue: SafeHtml;

  public initialValue = input<string>();
  public documentContent = output<string>();
  public onSave = output();
  public onExit = output();
  public documentState = model<"clean" | "pendingChanges">();
  public pageName = model<string>();

  protected previewHtml: any;
  protected editor: AceAjax.Editor;
  protected isDocumentDirty: boolean;

  constructor() {
    this.marked = new Marked(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    effect(() => {
      const value = this.initialValue();
      this.updateMarkdownValue(value);
      this.editor?.setValue(value, 1);
    });
  }

  ngOnInit() {
    const editorElement = this.aceEditorContainer().nativeElement;

    this.editor = ace.edit(editorElement);
  }

  ngAfterViewInit() {
    this.editor.$blockScrolling = Infinity;
    this.editor.session.setUseWrapMode(true);
    this.editor.renderer.setOption('displayIndentGuides', false);
    this.editor.renderer.setOption('printMargin', false);
    this.editor.session.setMode('ace/mode/markdown');
    this.editor.setValue(this.initialValue() || '', 1);
    this.editor.setOption('scrollPastEnd', false);

    this.editor.on('change', () => {
      const newValue = this.editor.getValue();
      this.documentContent.emit(newValue);
      this.updateMarkdownValue(newValue);

      if (this._markdownValue !== this.initialValue()) {
        this.isDocumentDirty = true;
        this.documentState.set("pendingChanges");
      }
      else {
        this.isDocumentDirty = false;
        this.documentState.set("clean");
      }
    });
  }

  ngOnDestroy() {
    return this.editor && this.editor.destroy();
  }

  private updateMarkdownValue(value: any) {
    this._markdownValue = value;

    if (value !== null && value !== undefined) {
      if (this._renderMarkTimeout) {
        clearTimeout(this._renderMarkTimeout);
      }
      this._renderMarkTimeout = setTimeout(() => {
        const html = this.marked.parse(value || '', { async: false });
        this.previewHtml = this._domSanitizer.sanitize(SecurityContext.HTML, html);
      }, 100);
    }
  }
}
