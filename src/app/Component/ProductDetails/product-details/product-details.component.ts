import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [
    HeaderComponent,
    FooterComponent,
    CarouselModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  userProductID!: number;
  AddtocartData: any[] = [];
  products: any;

  ngOnInit(): void {
    // this.cartProducts = this.getCartProducts();
    // const storedCart = localStorage.getItem('cartProducts');
    // if (storedCart) {
    //   this.cartProducts = JSON.parse(storedCart);
    // }
    window.scrollTo(0, 0);
    this.loadCart();

    this.route.paramMap.subscribe((params) => {
      this.userProductID = Number(params.get('userProductID'));
      if (this.userProductID) {
        this.getallproduct(this.userProductID);
      }
    });

    if (this.productdetails.length > 0) {
      this.selectedProduct = this.productdetails[0];
    }
  }

  constructor(
    private servcie: WebService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="bi bi-arrow-left text-dark"></i>',
      '<i class="bi bi-arrow-right text-dark"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  AddCartform = new FormGroup({
    phoneNumber: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    variantListInputModels: new FormArray([
      new FormGroup({
        userProductID: new FormControl(0),
        userProductVariantID: new FormControl(0),
        quantity: new FormControl(0),
      }),
    ]),
  });

  selectedProduct: any = null;
  selectedVariant: any = null;

  quantity: number = 1;

  selectProduct(variant: any) {
    this.selectedVariant = variant;
    this.cd.detectChanges();
    this.quantity = 1;
  }

  productdetails: any;

  getallproduct(userProductID: number) {
    this.servcie.getproductdetails(userProductID).subscribe(
      (resp: any) => {
        if (resp.status && resp.data) {
          // Merge product and variants properly
          this.products = resp.data;
          this.productdetails = resp.data.product;
          this.selectedProduct = {
            ...resp.data.product,
            variants: resp.data.variants || [], // Ensure variants exist
          };
        } else {
          this.selectedProduct = null;
        }
        console.log('Fetched Product:', this.selectedProduct);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  public counter: number = 1;

  public increment() {
    this.counter++;
  }
  public decrement() {
    if (this.counter > 1) {
      this.counter--;
    }
  }

  cartProducts: any[] = [];
  AddtocartClick(selectedVariant: any, quantity: number) {
    try {
      let cart: any[] = JSON.parse(
        localStorage.getItem('cartProducts') || '[]'
      );

      if (!selectedVariant || !selectedVariant.userProductVariantID) {
        console.error('Invalid product variant:', selectedVariant);
        return;
      }

      const existingProductIndex = cart.findIndex(
        (item) =>
          item.userProductVariantID === selectedVariant.userProductVariantID
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({ ...selectedVariant, quantity });
      }

      localStorage.setItem('cartProducts', JSON.stringify(cart));

      // 🔹 Immediately update cartProducts
      this.cartProducts = [...cart];

      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  getCartProducts(): any[] {
    return JSON.parse(localStorage.getItem('cartProducts') || '[]');
  }

  loadCart() {
    this.cartProducts = JSON.parse(
      localStorage.getItem('cartProducts') || '[]'
    );
  }

  reloda() {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  removeFromCart(userProductVariantID: number) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cartProducts') || '[]');

    // Find the index of the product with the given userProductID
    const productIndex = cart.findIndex(
      (item: any) => item.userProductVariantID === userProductVariantID
    );

    // Remove only the specific product if it exists
    if (productIndex !== -1) {
      cart.splice(productIndex, 1); // Remove only that item
    }

    // Update localStorage with the new cart data
    localStorage.setItem('cartProducts', JSON.stringify(cart));

    // Update the cartProducts array to reflect changes in the UI
    this.cartProducts = [...cart]; // Ensure UI updates correctly
    localStorage.removeItem('cartProducts');
  }

  updateQuantity(index: number, newQuantity: number) {
    this.cartProducts[index].quantity = newQuantity;
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  PlaceOrder() {
    // Retrieve cart data from session storage
    const storedCart = JSON.parse(localStorage.getItem('cartProducts') || '[]');

    // Update the form with session storage cart items
    this.AddCartform.patchValue({
      variantListInputModels: storedCart.map((item: any) => ({
        userProductID: item.userProductID,
        userProductVariantID: item.userProductVariantID,
        quantity: item.quantity || 1,
      })),
    });

    console.log('Submitting Order:', this.AddCartform.value); // Debugging

    // Call API
    this.servcie.addweblead(this.AddCartform.value).subscribe(
      (response) => {
        Swal.fire('Success', 'Order placed successfully!', 'success');
        sessionStorage.removeItem('cart'); // Clear cart after order
        this.AddtocartData = []; // Reset UI
        this.AddCartform.reset(); // Reset form
      },
      (error) => {
        Swal.fire('Error', 'Failed to place order', 'error');
        console.error('Order Error:', error);
      }
    );
  }
}
