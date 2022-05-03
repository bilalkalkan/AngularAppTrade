import { Component, OnInit } from '@angular/core';
import { CategoryModel } from './models/category.model';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryList!: CategoryModel[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getcategoryList();
  }
  getcategoryList() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        debugger;
        this.categoryList = response;
      },
    });
  }
}
