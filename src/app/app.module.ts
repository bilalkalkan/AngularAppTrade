import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { KdvPipe } from './product/pipe/kdv.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './product/pipe/filter.pipe';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    KdvPipe,
    FilterPipe,
    CartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
