import { Component, OnInit } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-dashboard-post-editor',
  templateUrl: './dashboard-post-editor.component.html',
  styleUrls: ['./dashboard-post-editor.component.scss']
})
export class DashboardPostEditorComponent implements OnInit {
  public editor = ClassicEditor;
  public data = "<p>Hello, world!</p>";
  constructor() { }

  ngOnInit() {
    console.log('Hello')
  }

  saveArticle() {
    console.log(this.data);
  }

  onChange( {editor}: ChangeEvent) 
  {
    this.data = editor.getData();
  }
}
