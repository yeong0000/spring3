package com.itwill.spring3.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itwill.spring3.dto.PostCreateDto;
import com.itwill.spring3.dto.PostSearchDto;
import com.itwill.spring3.dto.PostUpdateDto;
import com.itwill.spring3.repository.post.Post;
import com.itwill.spring3.repository.reply.Reply;
import com.itwill.spring3.service.PostService;
import com.itwill.spring3.service.ReplyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {
    
    
    private final PostService postService; //final은 반드시 초기화->@RequiredArgsConstructor
    private final ReplyService replyService;
    
    
    @GetMapping //클릭해서 들어오니까 get
    public String read(Model model) {
        log.info("read()");
        
        //postService이용
        List<Post> list = postService.read();
        
        //Model에 검색 결과를 세팅:(디스패처서블릿한테 모델 달라고 요구)
        model.addAttribute("posts",list); 
        //->변수이름(posts)과 값(list)을 넘김.//posts를 화면에 그리기만하면됨.->templates read.html
        
        return "/post/read";
    }
    
    @GetMapping("/create") 
    public void create() {
        log.info("create() GET");
        
        //리턴값이 없는 경우 view의 이름은 요청 주소와 같음
    }
    
    @PostMapping("/create")
    public String create(PostCreateDto dto) {
        log.info("create(dto={}) POST", dto);
        
        //TODO: form에서 submit(제출)된 내용을 DB 테이블에 insert
        postService.create(dto);
        
        //DB 테이블 insert 후 포스트 목록 페이지로 redirect 이동.
        return "redirect:/post";
        
    }
    
    // "/post/details", "/post/modify" 요청 주소들을 처리하는 컨트롤러 메서드
    @GetMapping({"/details","/modify"})
    public void read(Long id, Model model) {
        log.info("read(id={})", id);
        
        //POSTS 테이블에서 id에 해당하는 포스트를 검색
        Post post = postService.read(id);
        
        //결과를 model에 저장 -> 뷰로 전달(void라서 요청주소 그대로 전달)
        model.addAttribute("post",post);
        
        //REPLIES 테이블에서 해당 포스트에 달린 댓글 개수를 검색
        List<Reply> replyList = replyService.read(post);
        model.addAttribute("replyCount",replyList.size());
        
        //컨트롤러 메서드의 리턴값이 void인 경우
        //뷰의 이름은 요청 주소와 같다!
        //details -> details.html /  modify -> modify.html
    }
    
    @PostMapping("/delete")
    public String delete(long id) {
        
        //postService를 이용해서 DB 테이블에서 포스트를 삭제하는 서비스 호출:
        postService.delete(id);
        log.info("삭제결과delete(id={})", id);
        
        return "redirect:/post";
    }
    
    @PostMapping("/update")
    public String update(PostUpdateDto dto) {
        
        log.info("update(dto={})", dto);
        
        //포스트 업데이트 서비스 호출:
        postService.update(dto);
        
        
        return "redirect:/post/details?id=" + dto.getId(); 
        
    }
    
    @GetMapping("/search")
    public String search(PostSearchDto dto, Model model) {
        log.info("search(dto={})", dto);
        
        // TODO: postService의 검색 기능 호출:
        List<Post> list = postService.search(dto);
        
        //검색 결과를 Model에 저장해서 뷰로 전달:
        model.addAttribute("posts",list);
        
        return "/post/read";
    }
    
}
