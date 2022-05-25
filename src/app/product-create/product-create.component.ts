import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../category/models/category.model';
import { CategoryService } from '../category/services/category.service';
import { ProductModel } from '../product/models/productModel';
import { ProductService } from '../product/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  form!: FormGroup;
  entity: ProductModel = new ProductModel();

  product: ProductModel = new ProductModel();

  categories!: CategoryModel[];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}
  get f() {
    return this.form.controls;
  }
  ngOnInit() {
    debugger;
    this.activatedRoute.params.subscribe((param) => {
      const id = param['productId'];
      if (id) {
        this.getProductbyId(Number(id));
      }
    });
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.form = this.fb.group({
      categoryId: [this.entity?.categoryId, Validators.required],
      productId: [this.entity?.productId],
      productName: [
        this.entity?.productName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      quantityPerUnit: [
        this.entity.quantityPerUnit,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      unitPrice: [this.entity.unitPrice, Validators.required],
    });
  }

  getProductbyId(id: number) {
    const model = this.productService.getProductById(id);
    if (model) {
      this.entity = model;
    }
  }

  onSaveReactiveForm() {
    if (this.form.valid) {
      //const formData1 = this.form.value as ProductModel;
      const model = this.form.getRawValue() as ProductModel;

      const saveControl = false;
      if (model.productId) {
      } else {
        this.productService.addProduct(model);
      }
      if (saveControl) {
        this.form.reset();
      }
    }
  }
  onSaveForm() {
    debugger;
    const addControl = this.productService.addProduct(this.product);
    if (addControl) {
      this.product = new ProductModel();
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }
}
