package com.itwill.spring3.repository.member;

public enum Role {
    //상수들 설정
    
    USER("ROLE_USER", "USER"),
    ADMIN("ROLE_ADMIN", "ADMIN");
    
    private final String key;
    private final String name;
    
    Role(String key, String name) {
        this.key = key;
        this.name = name;
    }
    
    public String getKey() {
        return this.key;
    }
}
