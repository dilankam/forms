import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = []; 
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router:Router) { }
/*
  getPosts(){
    console.log("===getPosts===");
    // return [...this.posts];
    // return this.posts;
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
    // return [...this.posts];
  }*/

  getPosts(){
    console.log("===getPosts===");
    // return [...this.posts];
    // return this.posts;
    this.http.get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
    )
    .pipe(map((postData)=>{
      return postData.posts.map(postRec=>{
        return {
          title: postRec.title,
          content:postRec.content,
          id:postRec._id
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
    // return [...this.posts];
  }

  getPostUpdateListner(){
    return this.postsUpdated.asObservable();
  } 

  getPost(id:string){
    //this will execute every post in the array
    //if find the record add them in to new javascript object and return
    // return {...this.posts.find(p=>p.id ===id)};

    //this is observable. should subscribe to get the data
    return this.http.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/posts/"+id);
  }

  addPost(title: string, content: string){
    const post: Post = {id:null,title : title,content: content};
    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts",post)
    .subscribe(responseData =>{
      console.log(responseData.message);
      const id = responseData.postId;
      post.id=id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
    // this.posts.push(post);
    // this.postsUpdated.next([...this.posts]);
  }

  deletePost(postId: string){
    console.log("deletePost");
    this.http.delete("http://localhost:3000/api/posts/"+postId)
    .subscribe(()=>{
      //filter return subset of array
      //if the condition true keep the record, if false remove from new filtered posts
      const updatedPosts = this.posts.filter(post => post.id !==postId);
      this.posts= updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(id:string, title: string, content:string){
    const post:Post = {id:id,title:title,content:content};
    this.http.put("http://localhost:3000/api/posts/"+id,post)
    .subscribe(response => {
      //after post update, update local post array
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
}
