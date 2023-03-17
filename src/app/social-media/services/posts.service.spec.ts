import { TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from "./posts.service";
import { environment } from "src/environments/environment";
import { Post } from "../models/post.model";

describe('PostsService: unit test', () => {
    let postsService: PostsService;
    let controller: HttpTestingController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostsService]
        });
        
        postsService = TestBed.inject(PostsService);
        controller = TestBed.inject(HttpTestingController);
    }));

    it('should get posts', () => {
        let result: Post[] | undefined;
        const mockPosts = [
            { id: 1, userId: 1, title: 'Prout', createdDate: '01/01/1970', content: 'My prout', comments: [], imageUrl: '' },
            { id: 2, userId: 2, title: 'Pouet', createdDate: '01/01/1970', content: 'My pouet', comments: [], imageUrl: '' }
        ];

        postsService.getPosts().subscribe((response => {
            result = response;
        }));

        const mockReq = controller.expectOne(`${environment.apiUrl}/posts`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockPosts);

        controller.verify();

        expect(result).toEqual(mockPosts);
    });
});