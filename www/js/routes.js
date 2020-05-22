var routes = [
  // Index page
  {
    path: '/home/',
    url: './index.html',
    name: 'home',
    on: {
      pageInit: function(e, page) {
        // console.log("Hi Home Init");
      }
    }
  },
  {
    path: '/Category/:id/',
    url: './pages/Category.html',
    name: 'Category',
  },
  
  {
    path: '/ResetPassword/',
    url: './pages/ResetPassword.html',
    name: 'ResetPassword',
  },
  
  {
    path: '/MyAuction/',
    url: './pages/MyAuction.html',
    name: 'MyAuction',
  },
  
  {
    path: '/PraivacyPolicy/',
    url: './pages/PraivacyPolicy.html',
    name: 'PraivacyPolicy',
  },
  
  {
    path: '/termAndCondition/',
    url: './pages/termAndCondition.html',
    name: 'termAndCondition',
  },
  {
    path: '/verifyCode/',
    url: './pages/verifyCode.html',
    name: 'verifyCode',
  },
  {
    path: '/selcLang/',
    url: './pages/selcLang.html',
    name: 'selcLang',
  },
  {
    path: '/Cash_on_Deleviry/',
    url: './pages/Cash_on_Deleviry.html',
    name: 'Cash_on_Deleviry',
  },
  {
    path: '/Login/',
    url: './pages/Login.html',
    name: 'Login',
  },
 
  {
    path: '/Register/',
    url: './pages/Register.html',
    name: 'Register',
  },
 
  {
    path: '/forgetPassword/',
    url: './pages/forgetPassword.html',
    name: 'forgetPassword',
  },

  {
    path: '/AuctionList/',
    url: './pages/AuctionList.html',
    name: 'AuctionList',
  },

  {
    path: '/Register-Company/',
    url: './pages/Register-Company.html',
    name: 'Register-Company',
  },

  {
    path: '/EditProfile/',
    url: './pages/EditProfile.html',
    name: 'EditProfile',
  },

  {
    path: '/Delivery/',
    url: './pages/Delivery.html',
    name: 'Delivery',
  },

  {
    path: '/orders/',
    url: './pages/orders.html',
    name: 'orders',
  },
  {
    path: '/CheckOutFirst/',
    url: './pages/CheckOutFirst.html',
    name: 'CheckOutFirst',
  },
  
  {
    path: '/SubmitOrder/',
    url: './pages/SubmitOrder.html',
    name: 'SubmitOrder',
  },
  
  {
    path: '/Search/:searchName/',
    url: './pages/Search.html',
    name: 'Search',
  },
  
  {
    path: '/MyOrder/',
    url: './pages/MyOrder.html',
    name: 'MyOrder',
  },
  
  {
    path: '/instructions/',
    url: './pages/instructions.html',
    name: 'instructions',
  },
  {
    path: '/ProfileShop/',
    url: './pages/ProfileShop.html',
    name: 'ProfileShop',
  },
  {
    path: '/CategoryProduct/:id/',
    url: './pages/CategoryProduct.html',
    name: 'CategoryProduct',
  },

  {
    path: '/profile/',
    url: './pages/profile.html',
    name: 'profile',
  },
  {
    path: '/Auction/:id/',
    url: './pages/Auction.html',
    name: 'Auction',
  },
  {
    path: '/contactUs/',
    url: './pages/contactUs.html',
    name: 'contactUs',
  },


  {
    path: '/AllCategory/',
    url: './pages/AllCategory.html',
    name: 'AllCategory',
  },
 




  
  {
    path: '/panel-right-1/',
    content: '\
      <div class="page">\
        <div class="navbar">\
          <div class="navbar-inner sliding">\
            <div class="left">\
              <a href="#" class="link back">\
                <i class="icon icon-back"></i>\
                <span class="ios-only">Back</span>\
              </a>\
            </div>\
            <div class="title">Panel Page 1</div>\
          </div>\
        </div>\
        <div class="page-content">\
          <div class="block">\
            <p>This is a right panel page 1</p>\
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>\
          </div>\
        </div>\
      </div>\
    ',
  },
  {
    path: '/panel-right-2/',
    content: '\
      <div class="page">\
        <div class="navbar">\
          <div class="navbar-inner sliding">\
            <div class="left">\
              <a href="#" class="link back">\
                <i class="icon icon-back"></i>\
                <span class="ios-only">Back</span>\
              </a>\
            </div>\
            <div class="title">Panel Page 2</div>\
          </div>\
        </div>\
        <div class="page-content">\
          <div class="block">\
            <p>This is a right panel page 2</p>\
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>\
          </div>\
        </div>\
      </div>\
    ',
  },
  {
    path: '(.*)',
    url: './index.html',
  },
];
