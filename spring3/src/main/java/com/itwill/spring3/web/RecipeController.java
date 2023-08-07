package com.itwill.spring3.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itwill.spring3.service.PostService;
import com.itwill.spring3.service.ReplyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/recipe")
public class RecipeController {

    @GetMapping("/recipe")
    public String recipe(Model model) {
        log.info("recipe()");
        
        return "/recipe/recipe"; // View의 이름.
    }
    
    @GetMapping("/detail")
    public String recipeDetail(Model model) {
        log.info("recipeDetail()");
        
        return "/recipe/detail"; // View의 이름.
    }
    
    
}
