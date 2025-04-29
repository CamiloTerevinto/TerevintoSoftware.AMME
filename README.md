This repository contains an Angular Material-based Markdown editor. 

## Important notes:

* This is based on Michael Doye's codebase, last released in 2019: https://github.com/michaeldoye/mat-markdown-editor.
* I have fixed all problems to support the latest Angular version and related dependencies.
* I have removed logic that I do not need from the original code, as I do not intend to publish this as a public package. 
* This version is set up to act as a full screen / modal component (akin to a wiki page) rather than as a field inside a form.
* This codebase is MIT-licensed, feel free to use/update/clone as you want. I can accept PRs fixing/improving things but do not want to take this further for now.

## Required libraries
This was tested with the following libraries:

* Ace editor: 1.40.0
* Marked: 15.0.7
* Highlight.js: 11.11.1

These libraries can be imported in your index.html file as follows:

Styles:

```html
<!-- Choose any other color style desired -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/vs2015.min.css" rel="stylesheet">
```

Scripts:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.40.0/ace.min.js"
integrity="sha512-ltU111DxCFsqGT1FvKWwInwpg7r3cKcyqWSvN92Lo1NM3Q4Zskli4GnV2htQHF9u4o6NATHgNUDFyvqrxKdPzg=="
crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.7/marked.min.js"
integrity="sha512-rPuOZPx/WHMHNx2RoALKwiCDiDrCo4ekUctyTYKzBo8NGA79NcTW2gfrbcCL2RYL7RdjX2v9zR0fKyI4U4kPew=="
crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
integrity="sha512-EBLzUL8XLl+va/zAsmXwS7Z2B1F9HUHkZwyS/VKwh3S7T/U0nF4BaU29EP/ZSf6zgiIxYAnKLu6bJ8dqpmX5uw=="
crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

To facilitate type hints, I also use these packges as dev dependencies:

```json
{
    "devDependencies": {
        "@types/ace": "^0.0.52",
        "marked": "^15.0.8",
        "marked-highlight": "^2.2.1"
    }
}
```