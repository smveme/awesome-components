import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';

@Injectable()
export class PostResolver implements Resolve<Post[]> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post[]> {
    return this.postService.getPosts();
  }
}
