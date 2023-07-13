import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleEditorService, DashboardItemComponent } from 'src/app/core';
import { UserService } from 'src/app/core/services';
import { PostEditorService } from '../../services';

@Component({
  selector: 'app-dashboard-quick-create',
  templateUrl: './dashboard-quick-create.component.html',
  styleUrls: ['./dashboard-quick-create.component.scss'],
  providers: [
    {provide: ArticleEditorService, useClass: PostEditorService}
  ]
})
export class DashboardQuickCreateComponent extends DashboardItemComponent implements OnInit {

  public quickCreateForm = this.formBuilder.group({
    title: ['', Validators.required],
    text: ['']
  })

  constructor(private postEditor: ArticleEditorService, 
    private formBuilder: FormBuilder,
    private userService: UserService) {
    super()
   }

  public ngOnInit() {
    this.initArticle();
  }


  public submit() {
    const value = this.quickCreateForm.value;
    this.postEditor.quickDraftCreate(value).subscribe(isCreated => {
      if(isCreated) {
        this.initArticle();
      }
    });
  }

  private initArticle() {
    this.userService.getUser().subscribe(user => {
      this.postEditor.createArticle(user);
    })
  }
}
