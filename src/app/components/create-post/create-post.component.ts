import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enteredTitle="";
  enteredContent="";
  titlePlceHolder="Title";
  private mode = "create";
  private postID: string;
  post:Post;
  form: FormGroup;

  constructor(public postService : PostService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'enteredTitle' : new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]
      }),
      'enteredContent' : new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]
      })
    });

    //this should be a observable because url changing
    //this is observable. all built in observables no need to be unsubscribe
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postID=paramMap.get('postId');
        // this.post = this.postService.getPost(this.postID);
        this.postService.getPost(this.postID).subscribe(postData=>{
          this.post = {id:postData._id, title:postData.title,content:postData.content};
        
          //set value to the form on edit
          this.form.setValue({
            'enteredTitle': this.post.title,
            'enteredContent': this.post.content
          });
        });
      }else{
        this.mode='create';
        this.postID= null;
      }
    });
    
  }

  onSavePost(){
    if(this.mode=="create"){
      console.log("create");
      this.postService.addPost(this.form.value.enteredTitle,this.form.value.enteredContent);
    }else{
      console.log("update");
      this.postService.updatePost(this.postID,this.form.value.enteredTitle,this.form.value.enteredContent);
    }

    this.form.reset();
  }
}
