package com.itwill.spring3.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.spring3.dto.PostCreateDto;
import com.itwill.spring3.dto.PostSearchDto;
import com.itwill.spring3.dto.PostUpdateDto;
import com.itwill.spring3.repository.post.Post;
import com.itwill.spring3.repository.post.PostRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostService {

    //생성자를 사용한 의존성 주입:(객체는 생성되어서 넘어옴)
    private final PostRepository postRepository;
    
    //DB POSTS 테이블에서 전체 검색한 결과를 리턴:
    @Transactional(readOnly = true) //성능향상, 읽기전용
    public List<Post> read() {
        log.info("read()");
        
        return postRepository.findByOrderByIdDesc();
    }

    //DB POSTS 테이블에 엔터티를 삽입(insert):
    public Post create(PostCreateDto dto) {
       log.info("create(dto={})", dto);
       
       //DTO를 entity로 변환:
       Post entity = dto.toEntity();
       log.info("entity={}", entity);
       
       //DB 테이블에 저장(insert)
       postRepository.save(entity);
       log.info("entity={}", entity);
       
       return entity;
    }

    @Transactional(readOnly = true) //select문 읽기 전용인지 확인하고 트랜젝션널주면 성능향상
    public Post read(Long id) {
        log.info("read(id={})", id);
        
        return postRepository.findById(id).orElseThrow();
    }

    //삭제
    public void delete(long id) {
        log.info("delete(id={})", id);
        
        postRepository.deleteById(id);
    }

    //업데이트
    @Transactional //기본값 readOnly가 false니까 (1)
    public void update(PostUpdateDto dto) {
        log.info("update(dto={})", dto);
        
        //(1) 메서드에 @Transactional 애너테이션을 설정
        //(2) DB에서 엔터티를 검색 
        //(3) 검색한 엔터티를 수정
        //트랜잭션이 끝나는 시점에 DB update가 자동으로 수행됨!
        Post entity = postRepository.findById(dto.getId()).orElseThrow(); //(2)
        entity.update(dto); //(3)
        
//        Post entity = postRepository.findById(dto.getId()).orElseThrow();
//        entity.update(dto);
//        postRepository.saveAndFlush(entity);
    }
    
    @Transactional(readOnly = true) //(readOnly = true) -> 속도 빨라짐
    public List<Post> search(PostSearchDto dto){
        List<Post> list = null;
        switch(dto.getType()) {
        case "t":
            list = postRepository.findByTitleContainsIgnoreCaseOrderByIdDesc(dto.getKeyword());
            break;
        case "c":
            list = postRepository.findByContentContainsIgnoreCaseOrderByIdDesc(dto.getKeyword());
            break;
        case "tc":
            list = postRepository.searchByKeyword(dto.getKeyword());
            break;
        case "a":
            list = postRepository.findByAuthorContainsIgnoreCaseOrderByIdDesc(dto.getKeyword());
            break;
        }
        
        return list;
        
    }
    
    
    
}
