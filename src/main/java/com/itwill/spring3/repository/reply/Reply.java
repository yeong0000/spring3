package com.itwill.spring3.repository.reply;

import com.itwill.spring3.repository.BaseTimeEntity;
import com.itwill.spring3.repository.post.Post;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString(exclude = {"post"})
@Entity
@Table(name = "REPLIES")  //엔터티랑 테이블 이름 달라서
@SequenceGenerator(name = "REPLIES_SEQ_GEN", sequenceName = "REPLIES_SEQ", allocationSize = 1) //id가 시퀀스/name은 알아서 만들어
public class Reply extends BaseTimeEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REPLIES_SEQ_GEN")
    private Long id; //Primary Key
    
    @ManyToOne(fetch = FetchType.LAZY) //EAGER(기본값):즉시로딩, Lazy:지연로딩
    //포스트 한개에 리플라이 여러개 달림 -> 여러 개(many)의 댓글이 한 개(one)의 포스트에 달려있을 수 있음
    //long이 아니고 Post라고 줘서 관계를 맺어줘야됨
    private Post post; //Foreign Key, 관계를 맺고 있는 엔터티.
    
    @Column(nullable = false) //not null 제약조건
    private String replyText; //댓글 내용
    
    @Column(nullable = false) //not null 제약조건
    private String writer; //댓글 작성자
}
