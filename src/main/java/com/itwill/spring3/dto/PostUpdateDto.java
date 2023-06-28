package com.itwill.spring3.dto;

import lombok.Data;

@Data //getter,setter 전부 다 있음
public class PostUpdateDto {

    private long id; //name 속성을 id라고 씀
    private String title;
    private String content;
}
