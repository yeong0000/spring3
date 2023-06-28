package com.itwill.spring3.repository.post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//엔터티 클래스 이름 post , post의 id 컬럼은 long 타입
public interface PostRepository extends JpaRepository<Post, Long> {
 
    // id 내림차순 정렬:
    // select * from POSTS order by ID desc
    List<Post> findByOrderByIdDesc();
    
    //제목으로 검색:
    //select * from posts p
    //where lower(p.title) like lower('%' || ? || '%')
    //order by p.id desc
    List<Post> findByTitleContainsIgnoreCaseOrderByIdDesc(String title);
    
    
    //내용으로 검색:
    //select * from posts p
    //where lower(p.content) like lower('%' || ? || '%')
    //order by p.id desc
    List<Post> findByContentContainsIgnoreCaseOrderByIdDesc(String content);
    
    //작성자로 검색:
    //select * from posts p
    //where lower(p.author) like lower('%' || ? || '%')
    //order by p.id desc
    List<Post> findByAuthorContainsIgnoreCaseOrderByIdDesc(String author);
    
    //제목 또는 내용으로 검색:
    //select * from posts p
    //where lower(p.title) like lower('%' || ? || '%')
    //   or lower(p.content) like lower('%' || ? || '%')
    //order by p.id desc
    List<Post> findByTitleContainsIgnoreCaseOrContentContainsIgnoreCaseOrderByIdDesc(String title, String content);
    
    //JPQL(JPA Query Language) 문법으로 쿼리를 작성하고, 그 쿼리를 실행하는 메서드 이름을 설정:
    //JPQL은 Entity 클래스의 이름과 필드 이름들을 사용해서 작성.
    //(주의) DB 테이블이름과 컬럼 이름을 사용하지 않음! 
    //변수의 위치가 두개지만 keyword 주면 아규먼트 하나로 title, content 둘 다 검색 가능
    //*사용불가! 모든내용 검색 -> p 라고 적음
    @Query(
         "select p from Post p " +
         " where lower(p.title) like lower('%' || :keyword || '%') " +
         " or lower(p.content) like lower('%' || :keyword || '%') " +
         " order by p.id desc"
    )
    
    List<Post> searchByKeyword(@Param("keyword") String keyword);
    
    
    
}
