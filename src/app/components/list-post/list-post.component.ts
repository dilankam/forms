import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostService) { }

  ngOnInit() {
    // this.posts = this.postService.getPosts();
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListner()
      .subscribe((posts:Post[])=>{
        this.posts=posts;
      });
  }

  onDelete(postId:string){
    // console.log(postId);
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

 


}
