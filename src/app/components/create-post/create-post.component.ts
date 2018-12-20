import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
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

  constructor(public postService : PostService,public route: ActivatedRoute) { }

  ngOnInit() {
    //this should be a observable because url changing
    //this is observable. all built in observables no need to be unsubscribe
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postID=paramMap.get('postId');
        // this.post = this.postService.getPost(this.postID);
        this.postService.getPost(this.postID).subscribe(postData=>{
          this.post = {id:postData._id, title:postData.title,content:postData.content};
        });
      }else{
        this.mode='create';
        this.postID= null;
      }
    });
    
  }

  onSavePost(form:NgForm){
    if(this.mode=="create"){
      console.log("create");
      this.postService.addPost(form.value.enteredTitle,form.value.enteredContent);
    }else{
      console.log("update");
      this.postService.updatePost(this.postID,form.value.enteredTitle,form.value.enteredContent);
    }

    form.resetForm();
  }
}
