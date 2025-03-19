import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [HeaderComponent,FooterComponent,CarouselModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  userProductID!:number;

  cartItems: any[] = [];
  ngOnInit(): void {

    const storedCart = sessionStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : []; 

    this.loadCart();
    this.route.paramMap.subscribe(params => {
      this.userProductID = Number(params.get('userProductID'));
      if (this.userProductID) {
        this.getallproduct(this.userProductID);
      }
    });

    if (this.productdetails.length > 0) {
      this.selectedProduct = this.productdetails[0];
    }
  }

  constructor(private servcie:WebService,private cd: ChangeDetectorRef,private route: ActivatedRoute,
      private router: Router){}

   customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['<i class="bi bi-arrow-left text-dark"></i>', '<i class="bi bi-arrow-right text-dark"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    }

    AddCartform = new FormGroup({
      phoneNumber : new FormControl(''),
      name: new FormControl(''),
      address : new FormControl(''),
      variantListInputModels: new FormArray([
        new FormGroup({
          userProductID: new FormControl(0),
          userProductVariantID: new FormControl(0),
          quantity: new FormControl(0)
        })
      ])
    })



    selectedProduct: any = null;
    selectedVariant: any = null;



    selectProduct(variant: any) {
      this.selectedVariant = variant; 
      this.cd.detectChanges(); 
    }





    productdetails:any

    getallproduct(userProductID: number) {
      this.servcie.getproductdetails(userProductID).subscribe(
        (resp: any) => {
          if (resp.status && resp.data) {
            // Merge product and variants properly
           this.productdetails = resp.data.product
            this.selectedProduct = {
              ...resp.data.product,
              variants: resp.data.variants || []  // Ensure variants exist
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

    public counter:number = 1;

    public increment() {
      this.counter++;
    }
    public decrement() {
      if (this.counter > 1) {
        this.counter--;
      }
    }
    
    updateCart() {
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.cartItems = [...this.cartItems]; // Force UI refresh
    }
    
    


    addToCart(selectedVariant: any) {
      if (!selectedVariant) return;
    
      // Retrieve the cart from session storage or initialize an empty array
      let cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    
      // Check if the product already exists in the cart
      let existingProduct = cart.find((item: any) => item.userProductID === selectedVariant.userProductID);
    
      if (existingProduct) {
        // Increase quantity if the product is already in the cart
        // existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * (existingProduct.variants?.[0]?.price || existingProduct.price);
      } else {

        let productPrice = selectedVariant.variants?.[0]?.price || selectedVariant.price;
        let newProduct = {
          ...selectedVariant,
          quantity: 1,
          totalPrice: productPrice,
        };

        cart.push(newProduct);
      }
    
      // Store updated cart back in session storage
      sessionStorage.setItem('cartItems', JSON.stringify(cart));
    
      console.log('Cart updated:', cart);
    }
    
    
    
  

    removeFromCart(index: number) {
      this.cartItems.splice(index, 1);
    
      // ✅ Update sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    
      // ✅ Force UI to refresh
      this.cartItems = [...this.cartItems]; 
    }
    

    loadCart() {
      this.cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
    }

    saveCart() {
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

PlaceOrder() {
  // Retrieve cart data from session storage
  const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');

  // Update the form with session storage cart items
  this.AddCartform.patchValue({
    variantListInputModels: storedCart.map((item: any) => ({
      userProductID: item.userProductID,
      userProductVariantID: item.variants?.[0]?.userProductVariantID || 0,
      quantity: item.quantity || 1
    }))
  });

  console.log('Submitting Order:', this.AddCartform.value); // Debugging

  // Call API
  this.servcie.addweblead(this.AddCartform.value).subscribe(
    (response) => {
      Swal.fire('Success', 'Order placed successfully!', 'success');
      sessionStorage.removeItem('cart'); // Clear cart after order
      this.cartItems = []; // Reset UI
      this.AddCartform.reset(); // Reset form
    },
    (error) => {
      Swal.fire('Error', 'Failed to place order', 'error');
      console.error('Order Error:', error);
    }
  );
}

  
    


}
