import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

/**
 * PostListComponent class displays a post list.
 */
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  /**
   * Observable that contains the post list.
   */
  posts$!: Observable<Post[]>;

  /**
   * Constructor.
   * 
   * @param {ActivatedRoute} route The route.
   * @param {PostsService} postsService The post service.
   */
  constructor(private route: ActivatedRoute,
              private postsService: PostsService) { }

  /**
   * Init the component.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    );
  }

  /**
   * Add a new comment.
   * 
   * @param {object} postCommented Contains the comment and the postId.
   */
  onPostCommented(postCommented: { comment: string, postId: number }) {
    this.postsService.addNewComment(postCommented);
  }
}
