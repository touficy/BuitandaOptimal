// import { start } from "repl";

// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
   theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
   id: 'io.framework7.testapp',
   root: '#app',
   theme: 'md',
   data: function () {
      return {
         user: {
            firstName: 'John',
            lastName: 'Doe',
         },
      };
   },
   calendar: {
      url: 'calendar/',
      dateFormat: 'dd.mm.yyyy',
   },
   dialog: {
      // set default title for all dialog shortcuts
      // change default "OK" button text
      buttonOk: 'ok',

   },
   methods: {
      helloWorld: function () {
         app.dialog.alert('Hello World!');
      },
   },
   routes: routes,
   popup: {
      closeOnEscape: true,
   },
   sheet: {
      closeOnEscape: true,
   },
   popover: {
      closeOnEscape: true,
   },
   actions: {
      closeOnEscape: true,
   },
   on: {

   }

});
var view = app.views.create('.view-main', {
   dynamicNavbar: true,
   stackPages: true
});

setTimeout(function () {
   $('.loader-screen').hide();
}, 2000);

$$(document).on('page:init', function (e) {
   /* background image to cover */


});



function showIndicator() {
   app.preloader.show();
   setTimeout(function () {
      app.preloader.hide();
   }, 5000);
}
function alert(msg) {
   app.dialog.alert(msg, "Buitanda");
}

function alert_Reload (msg){
   app.dialog.alert(msg , "Buitanda" ,function() {
      location.reload()
  } )
}

function AnotherAlert(msg) {
   app.dialog.alert(msg, "Buitanda", ReloadeApp);
 }
function ReloadeApp() {
   location.reload();

}
function AnotherAlert(msg) {
   app.dialog.alert(msg, "Buitanda", ReloadeApp);
}

function hideIndicator() {
   app.preloader.hide();
}

function reloadPage() {
   //console.log('in reloade func')
   view.router.refreshPage();
}
var PLATFORM = '';
var UUID = '';
var versionApp

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   cordova.getAppVersion.getVersionNumber(function (version) {
      $('.versionStyle').html('V' + version)
      VersionApp = version
      $.ajax({
         type: 'GET',
         url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=checkversion&version=" + version + "&format=json",


         success: function (json) {
            if (json['posts'][0] == 1) {
               var text = if_lang('we have update in Buitanda, do you want to get it ? ', 'temos atualização em Buitanda, você deseja obtê-la?')
               app.dialog.confirm(text, 'Buitanda', updateApplication())
            }
            //console.log(json)




         }
      });
      //console.log('V' + version)
   });

   // $('.HomeTab').html(if_lang('HOME','INICIAR'))
   // $('.CATEGORYTab').html(if_lang(' CATEGORY',' CATEGORIAS'))
   // $('.AUCTIONTab').html(if_lang('AUCTION','LEILÕES'))
   // $('.PROFILETab').html(if_lang('PROFILE','PERFIL'))


  if (Framework7.device.ios) {
        var mob_model = device.model;
        // console.log(device.model);
        var mob_model_num = mob_model.split("e")[1].split(",");
        if (mob_model_num[0] > 10 || (mob_model_num[0] == 10 && (mob_model_num[1] == 3) || mob_model_num[1] == 6)) {
            // alert("iphone x");         
            // $('.nav-height').attr('style', 'padding-top:65px!important');
            $('body').css({
                "padding-top": "constant(safe-area-inset-top)!important;",
                "padding-top": "env(safe-area-inset-top)!important;"
            });
            $('.toolbar').css({
                "margin-bottom": "constant(safe-area-inset-bottom)!important;",
                "margin-bottom": "env(safe-area-inset-bottom)!important;"
            });
        }
    }
    if (device.platform.toLowerCase() == "android") {
        var permissions = cordova.plugins.permissions;
        var list = [
            // permissions.CAMERA,
            // permissions.GET_ACCOUNTS,
            permissions.ACCESS_COARSE_LOCATION,
            // permissions.CAMERA,
            // permissions.GET_ACCOUNTS,
            // permissions.READ_CONTACTS,CAPTURE_VIDEO_OUTPUT
            // permissions.READ_CALENDAR,
            // permissions.CAPTURE_VIDEO_OUTPUT,
            // permissions.WRITE_EXTERNAL_STORAGE
        ];
        permissions.checkPermission(list, success, error);

        function error() {
            console.warn('Some needed permissions is not turned on');
        }

        function success(status) {
            if (!status.hasPermission) {

                permissions.requestPermissions(
                    list,
                    function(status) {
                        if (!status.hasPermission) error();
                    },
                    error);
            }
        }
    }
    
        PLATFORM = device.platform;
   console.log(PLATFORM)
   // alert("hi");
   // //console.log('device ready --- > ' + localStorage, mercadoLanguage)

   // use_touchid(1234);
   // delete_pass();
   window.plugins.OneSignal
      .startInit("77d5e885-c96a-4342-b141-4efcadb9c1e8")
      .handleNotificationOpened(function (jsonData) {
         console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
         var new_id = jsonData.notification.payload.additionalData.id;
         var page = jsonData.notification.payload.additionalData.page;

         if (page) {
            if (new_id) {
               if (page == 'auction') {
                  go_to_page_params('Auction', new_id)
               }
               if (page == 'orders') {
                  getMyOrder(new_id)
               }
            }
            // view.router.navigate({name:page,param:{}})
         }

      }).endInit();
   window.plugins.OneSignal.getIds(function (ids) {
      UUID = ids.userId;

      // alert(UUID);
      localStorage.setItem("login_uuid", ids.userId);

      localStorage.MercardoUUID = ids.userId
      // //console.log('getIds: ' + JSON.stringify(ids));
   });

   document.addEventListener("backbutton", onBackKeyDown, false);

   function onBackKeyDown(e) {
      var att = $$(".page-current").attr("data-name");
      //console.log('att ------ > '+ att)
      //console.log(view.history)
      if (att == "index" || att == "home") {
         app.dialog.confirm(if_lang('Are you sure want to quit?', 'Você tem certeza que quer sair?'), 'Buitanda',
            function () {
               navigator.app.exitApp();
            },
            function () { }
         );
      }
      /** before Cat and auction  */


      // if(att == 'CategoryProduct' && navigationFlag == '1'){
      //    go_to_page('home')
      // }
      // if(att == 'CategoryProduct' && navigationFlag == '2'){
      //    go_to_page_two_params('Category' , MainCatID , MainNameCat)

      // }
      // if(att == 'Auction' && navigationFlag == '1'){
      //    go_to_page('home')

      // }
      // if(att == 'Auction' && navigationFlag == '3'){
      //    go_to_page('AuctionList')

      // }


      // /** after Cat and auction  */
      // if(att == 'home' && navigationFlag == '1'){
      //    go_to_page_two_params('CategoryProduct' , GloCategoryID , GNameID)
      // }
      // if(att == 'AllCategory' && navigationFlag == '2'){
      //    go_to_page_two_params('CategoryProduct' , GloCategoryID , GNameID)

      // }
      // if(att == 'AuctionList' && navigationFlag == '3'){
      //    go_to_page_two_params('CategoryProduct' , GloCategoryID , GNameID)

      // }
      // if(att == 'profile' && navigationFlag == '4'){
      //    go_to_page_two_params('CategoryProduct' , GloCategoryID , GNameID)

      // }
      // if(att == 'home' && navigationFlag == '5'){
      //    go_to_page_two_params('Auction' , GloCategoryID , GNameID)

      // }
      // if(att == 'AllCategory' && navigationFlag == '6'){
      //    go_to_page_two_params('Auction' , GloCategoryID , GNameID)

      // }
      // if(att == 'AuctionList' && navigationFlag == '7'){
      //    go_to_page_two_params('Auction' , GloCategoryID , GNameID)

      // }
      // if(att == 'profile' && navigationFlag == '8'){
      //    go_to_page_two_params('Auction' , GloCategoryID , GNameID)

      // }
      else {
         view.router.back();
      }
   }
}

/*************LOGIN FACE ID SECTION **************/
var biometryType;
var token = "";

function login_using_touchid() {
   if (window.plugins) {
      if (Framework7.device.ios) {
         window.plugins.touchid.isAvailable(function (biometryType) {
            if (localStorage.email == undefined) {
               alert("We could not associate your face ID with existing account<br>Please login first");
            } else {
               window.plugins.touchid.has("user_pass", function () {
                  window.plugins.touchid.verify("user_pass", "Get Your Password", function (passw) {
                     // alert(passw);
                     login(localStorage.email, passw);
                  });
               }, function () {
                  alert("We could not associate your face I'd with existing account<br>Please login first");
               });
            }

         }, function (msg) {
            alert("no Touch ID available");
         });
      } else if (PLATFORM.toLowerCase() == "android") {
         // //console.log(token);
         // var decryptConfig = {
         //   clientId: "user_pass",
         //   username: "currentUser",
         //   token: token
         // };
         //
         // FingerprintAuth.decrypt(decryptConfig, successCallback2, errorCallback2);
         //
         // function successCallback2(result) {
         //   //console.log("successCallback(): " + JSON.stringify(result));
         //   if (result.withFingerprint) {
         //     //console.log("Successful biometric authentication.");
         //     if (result.password) {
         //       //console.log("Successfully decrypted credential token.");
         //       //console.log("password: " + result.password);
         //       login(email, result.password);
         //     }
         //   } else if (result.withBackup) {
         //     //console.log("Authenticated with backup password");
         //   }
         // }
         //
         // function errorCallback2(error) {
         //   if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
         //     //console.log("FingerprintAuth Dialog Cancelled!");
         //   } else {
         //     //console.log("FingerprintAuth Error: " + error);
         //   }
         // }
      }
   }
   //  });
}

/*************************************************/

var picEditProfile
$$(document).on('page:init', '.page[data-name="profile"]', function (e) {
   console.log(localStorage.buitandaUserID)
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   // logout()
   getMyCard()

   if (Checklogin()) {
      $('.LoggedOut').hide()
   }
   else {
      $('.Logedin').hide()

   }

   $('.ProfileTitle').html(if_lang('PROFILE', 'PERFIL'))

   $('.Login').html(if_lang('Login', 'Entrar'))
   $('.Register').html(if_lang('Register', 'Registar'))
   $('.BECOME').html(if_lang('BECOME A SELLER', 'Ser Vendedor'))
   $('.EDIT').html(if_lang('EDIT PROFILE', 'EDITAR PERFIL'))
   $('.NOTIFICATION').html(if_lang('NOTIFICATION', 'NOTIFICAÇÃO'))
   $('.CONTACT').html(if_lang('CONTACT US', 'Contate-Nos'))
   $('.CHOOSE_Lang').html(if_lang('CHOOSE LANGUAGE', 'ESCOLHA O SEU IDIOMA'))
   $('.MyOrder').html(if_lang('MY ORDERS', 'Meu pedido'))
   $('.Logout').html(if_lang('Logout', 'SAIR'))

})


var flagSwip = 0
var flagAcution = 0
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
   console.log('home')
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   $('.LATEST_DEALS').html(if_lang('Deals of Day ', 'Ofertas do Dia'))
   $('.AUCTIONS').html(if_lang('AUCTIONS', 'LEILÕES'))
   $('.BEST_SELLER').html(if_lang('BEST SELLER', 'MAIS VENDIDOS'))
   $('.CLOSED_DEALS').html(if_lang('CLOSED DEALS', 'OFERTAS FECHADAS'))

   // $('.swiper-container').empty()
   // flagSwip = flagSwip + 1
   flagSwip = 0
   console.log('home')
   getLatestDeal()
   getAuctionHome()
   getBestSeller()
   // getClosettDeal()
   getBanners()
   getMyCard()
   // profile
   if (Checklogin()) {
      $('.LoggedOut').hide()
   }
   else {
      $('.Logedin').hide()

   }
   $('.ProfileTitle').html(if_lang('PROFILE', 'PERFIL'))

   $('.Login').html(if_lang('Login', 'Entrar'))
   $('.Register').html(if_lang('Register', 'Registar'))
   $('.BECOME').html(if_lang('BECOME A SELLER', 'Ser Vendedor'))
   $('.EDIT').html(if_lang('EDIT PROFILE', 'EDITAR PERFIL'))
   $('.NOTIFICATION').html(if_lang('NOTIFICATION', 'NOTIFICAÇÃO'))
   $('.CONTACT').html(if_lang('CONTACT US', 'Contate-Nos'))
   $('.CHOOSE_Lang').html(if_lang('CHOOSE LANGUAGE', 'ESCOLHA O SEU IDIOMA'))
   $('.MyOrder').html(if_lang('MY ORDERS', 'Meu pedido'))
   $('.Logout').html(if_lang('Logout', 'SAIR'))

})
$$(document).on('page:init', '.page[data-name="Register"]', function (e) {
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))


   $('.Person').html(if_lang('Person', 'Pessoal'))
   $('.Company').html(if_lang('Company', 'Empresa'))
   $('.CountryNAme').html(if_lang('Country', 'PAíS'))
   $('.addressCompanyLable').html( if_lang('Address', 'ENDEREÇO'));

   $('.namePersonLable').html( if_lang('Name', 'Nome'));
   $('.emailPersonLable').html( if_lang('EMAIL', 'EMAIL'));
   $('.mobilePersonLable').html( if_lang('Mobile', 'MóVEL'));
   $('.passwordPersonLable').html( if_lang('password', 'SENHA'));

   $('.AcceptSignUp').html(if_lang('I accept', 'eu aceito') + ' <a href="/termAndCondition/" onclick="" style="text-decoration: underline;">' + if_lang('Terms and Condition', 'termos e Condições') + '</a>')

   $('.City').html(if_lang('City', 'CIDADE'))

   getCountry()
})


$$(document).on('page:init', '.page[data-name="orders"]', function (e) {
   $('.OrdersTitle').html(if_lang('MY ORDERS', 'Meu pedido'))
   getMyCard()
   getOrders()
})


$$(document).on('page:init', '.page[data-name="MyAuction"]', function (e) {
   $('.MyAuctionTitle').html(if_lang('MY Auction', 'meu leilão'))
   getMyCard()
   getMyAuction()
})

$$(document).on('page:init', '.page[data-name="PraivacyPolicy"]', function (e) {


   getPrivacyPolicy()
})


$$(document).on('page:init', '.page[data-name="termAndCondition"]', function (e) {


   getTermAndCondition()
})
$$(document).on('page:init', '.page[data-name="MyOrder"]', function (e) {
   $('.MyOrderTitle').html(if_lang('MY ORDERS', 'Meu pedido'))
   $('.TotalShippingQ').html(if_lang('Total shipping ', ' ENTREGA	'))

   if(shipping == 0 ){
      $('.TotalShippingA').html(if_lang('Free Shipping ', ' Entrega Grátis'))
   }
   else{
      $('.TotalShippingA').html(if_lang( shipping +' KWZ', shipping+' KWZ'))
   
   
   }
   getMyCard()
})


$$(document).on('page:init', '.page[data-name="Register-Company"]', function (e) {
   console.log('inRegisterComant')
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))
   $('.AcceptSignUp').html(if_lang('I accept', 'eu aceito') + ' <a href="/termAndCondition/" onclick="" style="text-decoration: underline;">' + if_lang('Terms and Condition', 'termos e Condições') + '</a>')


   $('.titleRegisterCompany').html(if_lang('BECOME A SELLER', 'Ser Vendedor'))


   $('.CountryNAme').html(if_lang('Country', 'PAíS'))

   $('#nameSeller').attr('placeholder', if_lang('Company Name', 'Nome'));
   $('#addressSeller').attr('placeholder', if_lang('Address', 'ENDEREÇO'));
   $('#mobileSeller').attr('placeholder', if_lang('Mobile', 'MóVEL'));

   $('#phoneSeller').attr('placeholder', if_lang('phone', 'TELEFONE'));


   $('.City').html(if_lang('City', 'CIDADE'))

   getCountry()
   getCountryCompany()
})




$$(document).on('page:init', '.page[data-name="Cash_on_Deleviry"]', function (e) {
   $('#ProccedOrder').html(if_lang('proceed order', 'continuar ordem'))
   getMyCard()
   $('.Cash_on_DeleviryTitle').html(if_lang('Cash On Delivery', 'Contra reembolso'))
   $('.instruction_Delv').html(if_lang('<h2 style="text-align:center"> Cash On Delivery <h2>', '<h2 style="text-align:center"> Contra reembolso <h2>'))
})

$$(document).on('page:init', '.page[data-name="instructions"]', function (e) {
   $('#ProccedOrder').html(if_lang('proceed order', 'continuar ordem'))
   getMyCard()
   getInstructions()
})

$$(document).on('page:init', '.page[data-name="Login"]', function (e) {
   $('.emailLoginLable').html( if_lang('Email', 'INSERE O TEU EMAIL'));
   $('.passwordLoginsLable').html( if_lang('Password', 'Digite a senha'));
   $('.titleLogins').html(if_lang('Login', 'Entrar'))
   $('#loginbtn').html(if_lang('Login', 'Entrar'))
   $('#ForgetBtn').html(if_lang('Forget Password ?', 'Esqueceste-te da palavra-passe?'))

   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))
})


$$(document).on('page:init', '.page[data-name="forgetPassword"]', function (e) {
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))
   $('.forgetPassTitle').html(if_lang('FORGOT PASSWORD', 'Esqueceste-te da palavra-passe'))

   $('#sendC').html(if_lang('Reset Account ', ' Redefinir conta'))

})

$$(document).on('page:init', '.page[data-name="ResetPassword"]', function (e) {
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   $('.ResetPasswordTitle').html(if_lang('Reset Account ', ' Redefinir conta'))

   $('.passwordResetLable').httml( if_lang('password', 'SENHA'));
   $('.cPasswordResetLable').httml( if_lang('Confirmation password', 'SENHA DE CONFIRMAÇÃO'));

   $('#ResetPasswordBtn').html(if_lang('Reset   ', ' Redefinir  '))

})


$$(document).on('page:init', '.page[data-name="verifyCode"]', function (e) {
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   $('.VerifyTitle').html(if_lang('FORGOT PASSWORD', 'Esqueceste-te da palavra-passe'))
   $('.messageV').html(if_lang('please check your email and enter code you are received', 'verifique seu e-mail e digite o código recebido'))

   $('#ResetV').html(if_lang('Reset Account ', ' Redefinir conta'))
   $('#code').attr('placeholder', if_lang('Digit', 'Dígito'));

})


$$(document).on('page:init', '.page[data-name="contactUs"]', function (e) {
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))


   $('.ContactUs').html(if_lang('CONTACT US', 'CONTATE-NOS'))
   $('.addressC').html(if_lang('ADRESS <br> <span class="span-contact"> CAPOLO 1 RUA: PEDRO DE CASTRO VAN-DUNEM LOI MUNICIPIO: KILAMBA KIAXI LUANDA- ANGOLA </span>',
      'Endereço <br> <span class="span-contact"> CAPOLO 1 RUA: PEDRO DE CASTRO VAN-DUNEM LOI MUNICIPIO: KILAMBA KIAXI LUANDA- ANGOLA </span>'))

   $('.phoneContact').html(if_lang('PHONE NUMBER <br> <span class="span-contact PhoneNumbContact" onclick="callNum()"> + 244 923 474 222</span>',
      'Número de telefone <br> <span class="span-contact PhoneNumbContact" onclick="callNum()"> + 244 923 474 222</span>'))
   $('.NameCLable').html( if_lang('Name', 'Nome'));
   $('.SubjectCLable').html( if_lang('subject', 'sujeito'));
   $('.MsgCLable').html( if_lang('Message', 'mensagem'));
   $('#sendC').html(if_lang('Send ', ' ENVIAR'))

})


$$(document).on('page:init', '.page[data-name="CheckOutFirst"]', function (e) {
   $('.taxes').html(if_lang('ALL VAT TAXES ARE INCLUDED',' Preço com IVA incluido à taxa em vigor'))
   $('.TotalProductFirst').html(if_lang('Total products ', ' Total produtos	'))
   $('.TotalShippingQ').html(if_lang('Total shipping ', ' ENTREGA	'))
    if(shipping == 0 ){
      $('.TotalShippingA').html(if_lang('Free Shipping ', ' Entrega Grátis'))
   }
   else{
      $('.TotalShippingA').html(if_lang( shipping +' KWZ', shipping+' KWZ'))
   
   
   }
   $('.TotalWithShippingg').html(totalPlusShiping + ' KWZ') 

   $('.TotalQ').html(if_lang('Total ', ' Total'))
   $('.TAXESQ').html(if_lang('ALL VAT TAXES ARE INCLUDED ', ' Preço com IVA incluido à taxa em vigor'))
   $("#nextCheckout").html(if_lang('Next ', ' Seguinte  '))


   $('.SHOPINGCheckout').html(if_lang('CART ', 'CARRINHO'))
   $('.AddressCheckout').html(if_lang('ADDRESS ', '  ENDEREÇO  '))
   $('.DeliveryCheckout').html(if_lang('DELIVERY ', '  ENTREGA   '))
   $('.PaymentCHECKOUT').html(if_lang('PAYMENT ', '  PAGAMENTO'))

   getMyCard()
})



$$(document).on('page:init', '.page[data-name="SubmitOrder"]', function (e) {
   $('.payment_Method').html(if_lang('Payment Method','Opções de pagamentos'))
   $('#ProccedOrder').html(if_lang('proceed order', 'continuar ordem'))
   $('.Cash_on').html( if_lang( 'Cash on delivery  <a href="/Cash_on_Deleviry/" style=" margin-left: 48px;width: -webkit-fill-available "><span style="width: -webkit-fill-available">know more</span></a>',
   'Dinheiro na entrega  <a href="/Cash_on_Deleviry/" style=" margin-left: 25px;width: -webkit-fill-available "><span style="width: -webkit-fill-available">know more</span></a>'))
   $('.Credit_CardP').html(if_lang('Credit Card   <a href="#" style=" margin-left: 93px;width: -webkit-fill-available "><span style="width: -webkit-fill-available">know more</span></a>'  ,
                        'Cartão de crédito   <a href="#" style=" margin-left: 46px;width: -webkit-fill-available "><span style="width: -webkit-fill-available">know more</span></a>'))
   $('.Bank_Transfer').html( if_lang('Bank Transfer  <a href="/instructions/" style=" margin-left: 11vh;width: -webkit-fill-available "><span style="width: -webkit-fill-available">know more</span></a>',
                           'Transferência Bancária  <a href="/instructions/" style=" margin-left: 0vh;width: -webkit-fill-available "><span style="width: -webkit-fill-available">know more</span></a>' ))
   // $('.Trans').html(if_lang('<img src="img/TransEn.jpg "  onclick="go_to_page(' + "'instructions'" + ')" style="width: 90vw;"> ',
   //    '<img src="img/Trans.jpg "  onclick="go_to_page(' + "'instructions'" + ')" style="width: 90vw;">'))
   // $('.trans2').html(if_lang(' <img src="img/trans2En.jpg "  onclick="SubmitRefOrder()" style="width: 90vw;">',
   //    ' <img src="img/trans2.jpg "  onclick="SubmitRefOrder()" style="width: 90vw;">'))

   //    $('.trans3').html(if_lang(' <img src="img/Delv-En.jpg "  onclick="go_to_page(' + "'Cash_on_Deleviry'" + ')" style="width: 90vw;">',
   //    ' <img src="img/Delv-pur.jpg "  onclick="go_to_page(' + "'Cash_on_Deleviry'" + ')" style="width: 90vw;">'))

   $('.SHOPINGCheckout').html(if_lang('CART ', 'CARRINHO'))
   $('.AddressCheckout').html(if_lang('ADDRESS ', '  ENDEREÇO  '))
   $('.DeliveryCheckout').html(if_lang('DELIVERY ', '  ENTREGA   '))
   $('.PaymentCHECKOUT').html(if_lang('PAYMENT ', '  PAGAMENTO'))


   $('.TotalProductFirst').html(if_lang('Total  ', ' Total'))
   $('.TotalShippingQ').html(if_lang('Total shipping ', ' ENTREGA	'))
   $('.TotalWithShippingg').html(totalPlusShiping + ' KWZ') 

   if(shipping == 0 ){
   $('.TotalShippingA').html(if_lang('Free Shipping ', ' Entrega Grátis'))
}
else{
   $('.TotalShippingA').html(if_lang( shipping +' KWZ', shipping+' KWZ'))


}
   $('.TotalQ').html(if_lang('Total ', ' Total'))
   $('.TAXESQ').html(if_lang('ALL VAT TAXES ARE INCLUDED ', ' Preço com IVA incluido à taxa em vigor'))
   $("#nextCheckout").html(if_lang('Next ', ' Seguinte  '))


   getMyCard()
})

$$(document).on('page:init', '.page[data-name="ProfileShop"]', function (e) {
   getProfile()
   editShop()
   $('.addressShP').html(if_lang('Address ', '  Endereço'))
   $('.NoteP').html(if_lang('Note ', '  Notas'))
   $('.EditBtn').html(if_lang('Edit Info ', '  Atualizar '))
   $("#NextProfile").html(if_lang('Next ', ' Seguinte  '))


   $('.SHOPINGCheckout').html(if_lang('CART ', 'CARRINHO'))
   $('.AddressCheckout').html(if_lang('ADDRESS ', '  ENDEREÇO  '))
   $('.DeliveryCheckout').html(if_lang('DELIVERY ', '  ENTREGA   '))
   $('.PaymentCHECKOUT').html(if_lang('PAYMENT ', '  PAGAMENTO'))

})

$$(document).on('page:init', '.page[data-name="Delivery"]', function (e) {
   $('.SHOPINGCheckout').html(if_lang('CART ', 'CARRINHO'))
   $('.AddressCheckout').html(if_lang('ADDRESS ', '  ENDEREÇO  '))
   $('.DeliveryCheckout').html(if_lang('DELIVERY ', '  ENTREGA   '))
   $('.PaymentCHECKOUT').html(if_lang('PAYMENT ', '  PAGAMENTO'))

   $('.HomeDelivery').html(if_lang('Home / Office Delivery Shipping Time : Delivery within 48th after payment - Buissiness Days from 8am to 6pm and Saturday until 1pm Best Price and speed ',
      '  Entrega em Casa / Escritório Tempo de envio: Entrega até 48h após pagamento - Dias úteis das 8h às 18h e Sábados até às 13h O melhor preço e velocidade'))
   $('.pickupDEliivery').html(if_lang('Pick Up In Store - Buitanda | Monday to Friday - 8th to 17th|Address - 9am to 10pm Shipping Time : Wait for "available for Pickup"email ',
      '  Levantar na Loja - Buitanda | Segunda a sexta – 8h às 17h | Sábado – 9h às 13h Tempo de envio: Aguarde pelo email "Disponível para Levantamento"'))
   $('.FreeDeleivery').html(if_lang('Free ', '  Grátis'))
   $("#DelvieryNext").html(if_lang('Next ', ' Seguinte  '))


})
$$(document).on('page:init', '.page[data-name="AuctionList"]', function (e) {
   $('.titleAuctionList').html(if_lang('Auctions', 'Leilões'))
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   getMyCard()
   getAuctionsList()
})

$$(document).on('page:init', '.page[data-name="selcLang"]', function (e) {

   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   $('.Apply').html(if_lang('Apply', 'Aplique'))
   $('.selectLang').html(if_lang('CHOOSE LANGUAGE', 'ESCOLHA O SEU IDIOMA'))

   getLang()
})

$$(document).on('page:init', '.page[data-name="EditProfile"]', function (e) {
   console.log(PLATFORM)
   if (localStorage.buitandaUserType != 'Company') {
      $('.userType').hide()
   }
   console.log('user type ----- >' + localStorage.buitandaUserType)
   $('.addressCompanyLable').html( if_lang('Address', 'ENDEREÇO'));

   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   getProfile()
   $('.namePersonLable').html( if_lang('Name', 'Nome'));
   $('.mobilePersonLable').html( if_lang('Mobile', 'Móvel'));
   $('.passwordPersonLable').html( if_lang('Password', 'SENHA'));
   $('#CountryEdit').html(if_lang('Country', 'País'));
   $('#CityEdit').html(if_lang('City', 'Cidade'));
   $('#updateProfile').html(if_lang('Update', 'Atualizar'));
   getMyCard()

})

$$(document).on('page:init', '.page[data-name="Search"]', function (e, page) {
   var searchName = page.route.params.searchName;
   var textSearch = searchName
   console.log(textSearch)
   // $('.titleSearch').html(searchName)
   console.log(typeof( localStorage.buitandaUserID ))

   $.ajax({
      async: false,
      type: 'POST',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=search_deal&search=" + textSearch + "&lang=" + localStorage.BuitLang + "&customerId="+localStorage.buitandaUserID+"&format=json",


      success: function (json) {

         $('.titleSearch').html(textSearch)



         var li = ''
         if (json['posts'][0] != 0) {
            for (var i = 0; i < json['posts'].length; i++) {


               // li = li + '<div class="col-50"  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['title'], json['posts'][i]['title']) + "'" + ')" >' +
               li = li + '<div class="col-50"  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')" >' +
 
               ' <a > ' +

                  '<div class="white" style=" display:flex ;align-items:center " onclick="setbeforeNavigationFlag(2)">' +
                  ' <img class="img-product" src="' + json['posts'][i]['thumb'] + '"  style="width:100px;height : 100px">' +
                  '</div>' +
                  '<div class="white" style="margin-bottom:2vh ; margin-top: 1px">' +
                  '   <div class ="length-p">' +

                  ' <p class=" lineP margin-white paddig-product" style="color:black;"> ' + if_lang(json['posts'][i]['title'], json['posts'][i]['title']) + '  </p> ' +

                  ' </div>' +
                  ' <span>' + json['posts'][i]['current'] + ' KWZ</span> ' +

                  ' </div>' +

                  '  </a>' +

                  '</div>'

            }
            // console.log(li)
         }
         else {
            li = if_lang('<p>   not found </p> ', '<p>   not found </p> ')
         }
         $('.SearchProduc').html(li)

      }


   });



})
$$(document).on('page:init', '.page[data-name="AllCategory"]', function (e) {
   $('.TitleAllCategory').html(if_lang('Category', 'Categoria'))
   getAllCategory()
   // getMyCard()
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang('  CATEGORY', '  CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

})


var CategoryIdSearch
var MainCatID = undefined
var MainNameCat = ''
var start
var end
var sort = 'default'

$$(document).on('page:init', '.page[data-name="Category"]', function (e, page) {
   start = 0
   end = 8
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))

   getMyCard()
   var cat_id = page.route.params.id;
   var cat_name = page.route.params.nameCat;
   //console.log('Cat name ---  > '+ cat_name)
   cat_name = cat_name.split('%20')
   var n = ''
   for (var i = 0; i < cat_name.length; i++) {
      n = n + cat_name[i] + ' '
   }
   MainCatID = cat_id
   MainNameCat = n

   getCategoryProduct(cat_id, n , -1)


   var Data = [];
   var TempRecipe = []
   // $.ajax({
   //    type: 'GET',
   //    url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=deals&cat_id=" + CategoryIdSearch + "&format=json",


   //    success: function (json) {
   //       //alert(json['posts'][0]['description']);
   //       //  //console.log('json ')
   //       //  //console.log(json)

   //       for (var i = 0; i < json['posts'].length; i++) {
   //          TempRecipe.push(if_lang(json['posts'][i]['title'], json['posts'][i]['ar_title']) + '%%' + json['posts'][i]['image'] +
   //             '%%' + json['posts'][i]['id'] + '%%' + json['posts'][i]['current'] + '%%' + json['posts'][i]['desc'])
   //          Data.push(json['posts'][i]['title'])


   //       }

   //       var autocompleteDropdownSimple = app.autocomplete.create({
   //          inputEl: '#ProductCategorySearch',
   //          openIn: 'dropdown',
   //          source: function (query, render) {
   //             var results = [];
   //             if (query.length === 0) {
   //                render(results);
   //                return;
   //             }
   //             //console.log('query --- > '+query)
   //             // Find matched items
   //             for (var i = 0; i < Data.length; i++) {
   //                if (Data[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(Data[i]);
   //             }
   //             // Render items by passing array with result items

   //             render(results);
   //          },
   //          on: {
   //             change: function (value) {

   //                var li = ''


   //                var word = value['0']
   //                var newTemp = []
   //                for (var i = 0; i < TempRecipe.length; i++) {
   //                   newTemp.push(TempRecipe[i].split("%%")[0])
   //                   newTemp.push(TempRecipe[i].split("%%")[1])
   //                   newTemp.push(TempRecipe[i].split("%%")[2])
   //                   newTemp.push(TempRecipe[i].split("%%")[3])



   //                }
   //                var n = newTemp.indexOf(word)

   //                li = '<div class="col-50" onclick="go_to_page_two_params(' + newTemp[n + 2] + ')" >' +
   //                   ' <a > ' +

   //                   ' <img class="img-product" src="' + newTemp[n + 1] + '"  style=" ">' +

   //                   '<div class="white" style="margin-bottom:2vh ; margin-top: -4px">' +
   //                   ' <p class="margin-white paddig-product" style="color:black;"> ' + newTemp[n + 4] + '  <span>' + newTemp[n + 3] + ' KWZ</span> </p>' +
   //                   ' </div>' +
   //                   '  </a>' +

   //                   '</div>'


   //                $('.CatProd').html(li)


   //             },
   //          },
   //       });


   //    }



   // });




   var loading = false
   $$('.infinite-scroll-content').on('infinite', function () {
      if (loading)
         return;
      loading = true;
      setTimeout(function () {
         console.log('loading ---- > ', loading)

         loading = false;
         getCategoryProduct(cat_id, n)

      }, 1000);
   });
})
var GloCategoryID = undefined
var GNameID = ''
var prodFlag = 0
$$(document).on('page:init', '.page[data-name="CategoryProduct"]', function (e, page) {
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))
   prodFlag = prodFlag + 1
   getMyCard()
   var swi = '<div class="swiper-container swiper-categoryproductss  news-slide">' +
      '<div class="swiper-wrapper ">' +
      '   </div>' +
      ' <div class="swiper-button-prev"></div>' +
      '    <div class="swiper-button-next"></div>' +

      '   </div>'
   $('.swi').html(swi)
   //console.log(swi)
   $('.RecomendedForYOU').html(if_lang('RECOMMENDED ITEMS', 'ITENS RECOMENDADOS'))
   var cat_id = page.route.params.id;
   // var cat_name = page.route.params.nameCat;
   // cat_name = cat_name.split("%20")
   // var n = ''
   // for (var i = 0; i < cat_name.length; i++) {
   //    n = n + cat_name[i] + ' '
   // }

   GloCategoryID = cat_id;
   // GNameID = n
   getProduct(cat_id)





})

$$(document).on('page:init', '.page[data-name="Auction"]', function (e, page) {
   flagAcution = flagAcution + 1
   getMyCard()
   var swi = '<div class="swiper-container swiper-categoryproductssA  news-slide">' +
      '<div class="swiper-wrapper ">' +
      '   </div>' +
      ' <div class="swiper-button-prev"></div>' +
      '    <div class="swiper-button-next"></div>' +

      '   </div>'
   $('.swiAs').html(swi)
   //console.log('caat name ---- > '+ n )
   //console.log('id  ---- > '+ cat_id )
   $('.HomeTab').html(if_lang('HOME', 'INICIAR'))
   $('.CATEGORYTab').html(if_lang(' CATEGORY', ' CATEGORIAS'))
   $('.AUCTIONTab').html(if_lang('AUCTION', 'LEILÕES'))
   $('.PROFILETab').html(if_lang('PROFILE', 'PERFIL'))
   var cat_id = page.route.params.id;
   // var cat_name = page.route.params.nameCat;
   //  cat_name=cat_name.split("%20")
   var n = ''
   // for(var i = 0 ; i < cat_name.length ; i ++){
   //    n = n + cat_name[i] +' '
   // }
   //console.log('caat name ---- > '+ n )
   //console.log('id  ---- > '+ cat_id )
   GloCategoryID = cat_id;
   GNameID = n

   getAuctionProduct(cat_id, n)
   bidSetIntreval(cat_id)


})



//         $$(document).on('page:beforein', '.page[data-name="Auction"]',  function (e, page) {
//          // var cat_id = page.route.params.id;
//          // var cat_name = page.route.params.nameCat;
//          //  cat_name=cat_name.split("%20")
//          //  var n =''
//          // for(var i = 0 ; i < cat_name.length ; i ++){
//          //    n = n + cat_name[i] +' ' 
//          // }
//          // getAuctionProduct(cat_id , n)
// //console.log('=================================================Before Auctiooooooooooooooooooooon =================================================')

//         })


//         $$(document).on('page:afterin', '.page[data-name="Auction"]',  function (e, page) {
//          // var cat_id = page.route.params.id;
//          // var cat_name = page.route.params.nameCat;
//          //  cat_name=cat_name.split("%20")
//          //  var n =''
//          // for(var i = 0 ; i < cat_name.length ; i ++){
//          //    n = n + cat_name[i] +' '
//          // }
//          // getAuctionProduct(cat_id , n)
// //console.log('================================================= Auctiooooooooooooooooooooon =================================================')

//         })

/*      ***********************************************************************   */
// general fuanctions

function go_to_page_two_params(name, id, nameCat) {
   // view.router.navigate('/'+name+'/', {
   //    props: {
   //       id : id , 
   //       nameCat :  nameCat
   //    }
   //  })

   view.router.navigate({
      name: name,
      params: {
         id: id,
         nameCat: nameCat
      },
   });
}

function go_to_page_params(name, id) {
   //console.log(name)
   //console.log(params)

   view.router.navigate({
      name: name,
      params: {
         id: id
      },
   });
}
var language = localStorage.BuitLang

function go_to_page(pg_name) {
   view.router.navigate({
      name: pg_name
   });
   if (pg_name == 'not-found') {
      //console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees')

   }

}

function if_lang(en, portu) {

   if (localStorage.BuitLang == "English") {
      return en;
   } else if (localStorage.BuitLang == "Portuguese" || localStorage.BuitLang == null || localStorage.BuitLang == undefined) {
      localStorage.BuitLang = "Portuguese"
      return portu;
   }
}




function Checklogin() {
   var userLoggedIn = localStorage.buitandaUserID
   if (userLoggedIn == undefined) {
      return false;
   } else {
      return userLoggedIn;
   }
}

/* ********************************************************************** /* */
function getLatestDeal() {

   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=latest_deals&format=json",
      cache: false,


      success: function (json) {
         //alert(json['posts'][0]['description']);
         //  //console.log('json ')
         //  console.log(json)
         var mySwiper = app.swiper.create('.swiper-letest', {
            slidesPerView: 'auto',
            // autoplay: {
            //     delay: 3000,
            // },
            speed: 10,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });
         //   mySwiper.removeAllSlides();	

         //  var mySwiper = app.swiper.create('.swiper-letest', {
         //    slidesPerView: '3',
         //    // autoplay: {
         //    //    delay: 3000,
         //    // }, 
         //    speed: 50,
         //    paginationClickable: true,
         //    spaceBetween: 10,
         //    watchSlidesProgress: true
         // });
         var x = 'ahmed samir'

         if (flagSwip == 0) {
            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper.addSlide(i, '<div onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')" class="swiper-slide" style="width:34vw; " >' +
                  '<div class="Height-width" > ' +
                  ' <div class="divImgSwiper" onclick="setbeforeNavigationFlag(1)">' +
                  '  <img class=" " src="' + json['posts'][i]['thumb'] + '"  style=" "  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')">' +
                  ' </div>' +
                  ' </div>' +

                  '   <div>' +
                  '   <div class ="length-p" >' +

                  ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                  ' </div>' +
                  ' <span class="discount-price"  style="text-align:center; display:block; color:red">  ' + json['posts'][i]['original'] + ' KWZ</span>' +

                  ' <span style="text-align:center; display:block">  ' + json['posts'][i]['current'] + ' KWZ</span>' +


                  ' </div>' +
                  '  </div>');
               mySwiper.update();

            }

         }
         else {
            for (var i = 0; i < json['posts'].length; i++) {
               console.log(mySwiper)
               mySwiper[flagSwip].addSlide(i, '<div class="swiper-slide" style="width:34vw; " >' +
                  '<div class="Height-width" > ' +
                  ' <div class="divImgSwiper" onclick="setbeforeNavigationFlag(1)">' +
                  '  <img class="imageSwiper" src="' + json['posts'][i]['image'] + '"  style=" "  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')">' +
                  ' </div>' +
                  ' </div>' +

                  '   <div>' +
                  '   <div class ="length-p">' +

                  ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                  ' </div>' +

                  ' <span style="text-align:center; display:block">  ' + json['posts'][i]['current'] + ' KWZ</span>' +


                  ' </div>' +
                  '  </div>');
               mySwiper[flagSwip].update();

            }
         }

      }
   });

}

function getBestSeller() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=bestseller&format=json",
      cache: false,


      success: function (json) {
         //alert(json['posts'][0]['description']);
         //  //console.log('json ')
         //console.log(json)
         var mySwiper = app.swiper.create('.swiper-bestSeller', {
            slidesPerView: 'auto',
            // autoplay: {
            //     delay: 3000,
            // },
            speed: 100,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });

         //  var mySwiper = app.swiper.create('.swiper-letest', {
         //    slidesPerView: '3',
         //    // autoplay: {
         //    //    delay: 3000,
         //    // }, 
         //    speed: 50,
         //    paginationClickable: true,
         //    spaceBetween: 10,
         //    watchSlidesProgress: true
         // });
         var x = 'ahmed samir'

         if (flagSwip == 0) {

            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper.addSlide(i, '<div  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')" class="swiper-slide" style="width:34vw; " >' +
                  '<div class="Height-width" > ' +
                  ' <div class="divImgSwiper" onclick="setbeforeNavigationFlag(1)">' +
                  '  <img class="imageSwiper" src="' + json['posts'][i]['thumb'] + '"  style=" "  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')">' +
                  ' </div>' +
                  ' </div>' +

                  '   <div>' +
                  '   <div class ="length-p">' +

                  ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                  ' </div>' +

                  '   <span class="spanHome">  ' + json['posts'][i]['current'] + ' KWZ</span>' +


                  ' </div>' +
                  '  </div>');
               mySwiper.update();
            }
         }
         else {
            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper[flagSwip].addSlide(i, '<div class="swiper-slide" style="width:34vw; " >' +
                  '<div class="Height-width" > ' +
                  ' <div class="divImgSwiper" onclick="setbeforeNavigationFlag(1)">' +
                  '  <img class="imageSwiper" src="' + json['posts'][i]['image'] + '"  style=" "  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] +    ')">' +
                  ' </div>' +
                  ' </div>' +

                  '   <div>' +
                  '   <div class ="length-p">' +

                  ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                  ' </div>' +

                  '   <span class="spanHome">  ' + json['posts'][i]['current'] + ' KWZ</span>' +


                  ' </div>' +
                  '  </div>');
               mySwiper[flagSwip].update();
            }
         }

      }
   });


}

function getClosettDeal() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=closed_deals&format=json",

      success: function (json) {
         //alert(json['posts'][0]['description']);
         //  console.log('json ')
         console.log(json)
         var mySwiper = app.swiper.create('.swiper-closed', {
            slidesPerView: 'auto',
            // autoplay: {
            //    delay: 3000,
            // },
            speed: 100,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });


         if (flagSwip == 0) {
            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper.addSlide(i, '  <div class="swiper-slide"  style="width:17vh; ">' +
                  '  <div class="container">' +
                  '<div class="Height-width" > ' +
                  ' <div class="divImgSwiper" >' +
                  ' <img class="imageSwiper" src="' + json['posts'][i]['thumb'] + '"  style=" "  onclick="showClosedDeal(' + "'" + json['posts'][i]['thumb'] + "'" + ',' +
                  "'" + json['posts'][i]['current'] + "'" + ',' + json['posts'][i]['ordered_qty'] + ',' + "'" + json['posts'][i]['title'] + "'" + ')">' +
                  '   <img src="img/sold.png" class="top-left">' +

                  '  </div>' + '  </div>' +
                  '  </div>' +

                  //          ' <div class="inline">'+
                  //           '  <p class="lineP length-p" style="font-size:13px; font-weight: bolder; margin-top: unset; margin-bottom: unset;">'+if_lang( json['posts'][i]['title'] ,json['posts'][i]['sectitle'] )+'</p>'+
                  //         '    <p style="font-size:13px; margin-left: auto;font-weight: bolder; margin-top: unset; margin-bottom: unset;font-weight: bolder;">sold for</p>'+



                  //  '   </div>'+
                  //    ' <div style="margin:0 2vh 0 2vh; word-break: break-all;">'+
                  //       '<p style="text-align: end; margin: unset; font-weight: bolder; margin-bottom: 3vh;">'+json['posts'][i]['current']+'+ xl </p>'+
                  //     '</div>'+
                  '   <div>' +
                  '   <div class ="length-p">' +

                  ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                  ' </div>' +

                  //   '   <span class="spanHome">  '+json['posts'][i]['current']+' KWZ</span>'+


                  ' </div>' +
                  ' </div> ');

            }
            mySwiper.update();
         }
         else {
            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper[flagSwip].addSlide(i, '  <div class="swiper-slide"  style="width:17vh; ">' +
                  '  <div class="container">' +
                  '<div class="Height-width" > ' +
                  ' <div class="divImgSwiper" >' +
                  ' <img class="imageSwiper" src="' + json['posts'][i]['thumb'] + '"  style=" "  onclick="showClosedDeal(' + "'" + json['posts'][i]['thumb'] + "'" + ',' +
                  "'" + json['posts'][i]['current'] + "'" + ',' + json['posts'][i]['ordered_qty'] + ')">' +
                  '   <img src="img/sold.png" class="top-left">' +

                  '  </div>' + '  </div>' +
                  '  </div>' +

                  //          ' <div class="inline">'+
                  //           '  <p class="lineP length-p" style="font-size:13px; font-weight: bolder; margin-top: unset; margin-bottom: unset;">'+if_lang( json['posts'][i]['title'] ,json['posts'][i]['sectitle'] )+'</p>'+
                  //         '    <p style="font-size:13px; margin-left: auto;font-weight: bolder; margin-top: unset; margin-bottom: unset;font-weight: bolder;">sold for</p>'+



                  //  '   </div>'+
                  //    ' <div style="margin:0 2vh 0 2vh; word-break: break-all;">'+
                  //       '<p style="text-align: end; margin: unset; font-weight: bolder; margin-bottom: 3vh;">'+json['posts'][i]['current']+'+ xl </p>'+
                  //     '</div>'+
                  '   <div>' +
                  '   <div class ="length-p">' +

                  ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                  ' </div>' +

                  //   '   <span class="spanHome">  '+json['posts'][i]['current']+' KWZ</span>'+


                  ' </div>' +
                  ' </div> ');

            }
            mySwiper[flagSwip].update();
         }
      }
   });


}
function getAuctionHome() {
   var att = $$(".page-current").attr("data-name");
   console.log('att ------ > ' + att)
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=auctions_home&format=json",
      cache: false,

      success: function (json) {
         var mySwiper = app.swiper.create('.swiper-auction', {
            slidesPerView: 'auto',
            // autoplay: {
            //    delay: 3000,
            // },
            speed: 100,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });
         if (json['posts'][0] != 0) {

            //alert(json['posts'][0]['description']);
            //  //console.log('json ')
            //console.log('auction Home')
            //console.log(json)
            var mySwiper = app.swiper.create('.swiper-auction', {
               slidesPerView: 'auto',
               // autoplay: {
               //    delay: 3000,
               // },
               speed: 100,
               paginationClickable: true,
               spaceBetween: 10,
               watchSlidesProgress: true
            });

            if (flagSwip == 0) {
               for (var i = 0; i < json['posts'].length; i++) {
                  var    Remaining_time = get_timeDifference_Days(json['posts'][i]['endauctionDate'])
                  // console.log(Remaining_time)
                  go_to_page_params

                  mySwiper.addSlide(i, '  <div class="swiper-slide" onclick="go_to_page_params(' + "'" + 'Auction' + "'" + ',' + json['posts'][i]['id'] + ')" style="width:17vh; ">' +
                     '<div class="Height-width" > ' +
                     ' <div class="divImgSwiper" onclick="setbeforeNavigationFlag(1)">' +
                     '  <img class=" " src="' + json['posts'][i]['thumb'] + '"  onclick="go_to_page_params(' + "'" + 'Auction' + "'" + ',' + json['posts'][i]['id'] + ')">' +
                     '   </div>' + '   </div>' +
                     '  <div>' +

                     '     <p class="pRed "  style="margin-left:1vh;text-align:center"> ' + Remaining_time + '</p>' +
                     '   <div class ="length-p">' +

                     ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                     '   </div>' +
                     '  <div class="helooo">' +
                     // '<p>'+json['posts'][i]['startingbidprice']+'</p>'+
                     '  <span  class="spanHome"  > ' + json['posts'][i]['originalprice'] + ' KWZ</span>' +


                     '   </div>' +
                     '   </div>' +
                     ' </div> ');

               }
               mySwiper.update();
            }

            else {
               for (var i = 0; i < json['posts'].length; i++) {

                  mySwiper[flagSwip].addSlide(i, '  <div class="swiper-slide"  style="width:17vh; ">' +
                     '<div class="Height-width"> ' +
                     ' <div class="divImgSwiper" onclick="setbeforeNavigationFlag(1)">' +
                     '  <img class="imageSwiper" src="' + json['posts'][i]['thumb'] + '"  onclick="go_to_page_two_params(' + "'" + 'Auction' + "'" + ',' + json['posts'][i]['id'] + ')">' +
                     '   </div>' + '   </div>' +
                     '  <div>' +

                     '     <p class="pRed "  style="margin-left:1vh;text-align:center"> ' + timer(json['posts'][i]['endauctionDate'], json['posts'][i]['id'], json['posts'][i]['server_time']) + '</p>' +
                     '   <div class ="length-p">' +

                     ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                     '   </div>' +
                     '  <div class="helooo">' +
                     // '<p>'+json['posts'][i]['startingbidprice']+'</p>'+
                     '  <span  class="spanHome"  > ' + json['posts'][i]['startingbidprice'] + ' KWZ</span>' +


                     '   </div>' +
                     '   </div>' +
                     ' </div> ');

               }
               mySwiper[flagSwip].update();
            }

         }

         else {
            if (flagSwip == 0) {

               mySwiper.addSlide(0, '  <div class="swiper-slide"  style="width:17vh; ">' +
                  '<p style ="color:red"> ' + if_lang(' Coming Soon ', 'em breve') + '   </p> ' +

                  ' </div> ');


               mySwiper.update();
            }
            else {

               mySwiper[flagSwip].addSlide(0, '  <div class="swiper-slide"  style="width:17vh; ">' +
                  '<p style ="color:red"> ' + if_lang(' Coming Soon ', 'em breve') + '   </p> ' +

                  ' </div> ');


               mySwiper.update();
            }

         }

      }
   });


}


function getAllCategory() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=categories&lang="+localStorage.BuitLang+"&format=json",
      cache: false,


      success: function (json) {
         //alert(json['posts'][0]['description']);
         //  //console.log('json ')
         //  console.log(json)
         //  console.log(localStorage.BuitLang)

         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {


            li = li + '<div class="col-50" onclick="go_to_page_two_params(' + "'" + 'Category' + "'" + ',' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['name'], json['posts'][i]['aname']) + "'" + ')" >' +
               ' <a > ' +


               ' <img class="img-cat" src="' + json['posts'][i]['icon'] + '"  style=" "  >' +

               // '<div class="white" style="margin-bottom:2vh ; margin-top: -4px">'+
               ' <p class="margin-white paddig-product" style="color:black;"> ' + if_lang(json['posts'][i]['name'], json['posts'][i]['aname']) + '  </p>' +
               //   ' </div>'+
               '  </a>' +

               '</div>'

         }

         $('.AllCat').append(li)
      }
   });


}



function getCategoryProduct(id, name ) {
   CategoryIdSearch = id


   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=deals&cat_id=" + id + "&limit=" + start + ",8" + "&sort="+sort+"&format=json",


      success: function (json) {
         // //console.log(name)
         console.log(json)


         $('.titleCategory').html(if_lang(json['posts'][0]['category_name'], json['posts'][0]['category_name_port']))

         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            if (json['posts'][0] == 0  ) {
               //   endFlash = json['response']['result'].length

               app.infiniteScroll.destroy('.infinite-scroll-content');
               $$('.infinite-scroll-preloader').hide();
            }
            else {
               if( json['posts'].length < 8)
               {    app.infiniteScroll.destroy('.infinite-scroll-content');
               $$('.infinite-scroll-preloader').hide();

               }
               // li = li + '<div class="col-30"  onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['title'], json['posts'][i]['title']) + "'" + ')" >' +
               //    ' <a > ' +

               //    '<div class="white height_cat_prod" style=" display:flex ;align-items:center " onclick="setbeforeNavigationFlag(2)">' +
               //    ' <img class="img-product" src="' + json['posts'][i]['thumb'] + '"  style=" ">' +
               //    '</div>' +
               //    '<div class="white" style="margin-bottom:2vh ; margin-top: 1px">' +
               //    '   <div class ="length-p">' +

               //    ' <p class=" lineP margin-white paddig-product" style="color:black; font-size:11px"> ' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '  </p> ' +

               //    ' </div>' +
               //    ' <span style="font-size:12px">' + json['posts'][i]['current'] + ' KWZ</span> ' +

               //    ' </div>' +

               //    '  </a>' +

               //    '</div>'
             li =  li + ' <li onclick="go_to_page_two_params(' + "'" + 'CategoryProduct' + "'" + ',' + json['posts'][i]['id'] + ')">' +
                                    '  <div class="row width-100">' +
                                    '<div class="col-20 align-self-center">' +
                                    ' <figure  class="product-image h-auto"><img src="' + json['posts'][i]['thumb'] +'" alt="" class=""></figure>' +
                                    ' </div>' +
                                    '<div class="col-80 padding-left">' +
                                    '<p style="white-space:break-spaces; margin-top:2vh">' +if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle'])  + ' </p>' +
                                    '<p class="text-secondary small text-mute no-margin">'  +' </p>' +
                                    '<h5 class="text-green font-weight-normal no-margin"><span class=" ">' + ' <span>' + json['posts'][i]['current'] + ' KWZ</span> ' +
                                    ' </h5>' +

                                    ' </div>' +
                                   
                                    '</div>' +
                                    ' </li>'
            }
         }

         start = start + 8
         end = end + 8

         $('.CatProd').append(li)
      }
   });


}


function getProduct(id, title) {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=deal_desc&deal_id=" + id + "&format=json",


      success: function (json) {
         console.log(json)
         // getRecomendedCategory(id, json['posts'][0]['category'])


         title = if_lang(json['posts'][0]['title'], json['posts'][0]['sectitle'])
         var lenString = title.length
         var str = title

         if (lenString > 19) {
            str = ''
            for (var x = 0; x < 15; x++) {
               str = str + title[x]
            }
            str = str + '..'
         }
         $('.titleCategoryProduct').html(if_lang(json['posts'][0]['title'], json['posts'][0]['sectitle']))
         //  $('.containerProduct').empty();

         // $('.Recommened-cat').empty();



         var li = ''
         var tempimg = ''
         var img = ''

         for (var i = 0; i < json['posts'].length; i++) {
            var n = if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']).indexOf("http");
            if (if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']) != '') {
               if (n == -1) {
                  tempimg = tempimg + if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']).replace(/src='/g, "style='width:100%; height:auto' src=\'https://host.optimalsolutionslebanon.com/~buitandatest")
               }
               else {
                  tempimg = tempimg + if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']).replace(/src='/g, "style='width:100%; height:auto' src=\'")
               }
               console.log('n --- > ' + n)

            }
            // //console.log(n)
            // //console.log(img)



            li = '  <h3 class="gray  margin-top-p">' + if_lang(json['posts'][0]['title'], json['posts'][0]['sectitle']) + '</h3>' +
               '  <p class="descP margin-top-p"> SKU#' + json['posts'][0]['sku'] + '  </p>';

                  if (json['posts'][0]['special'] == "1" )

                  {

                 
                  li = li +   ' <p class="discount-price descP margin-top-p   "  >  '+if_lang('OLD PRICE ' , 'PREÇO ') + json['posts'][i]['original'] + ' KWZ</p>';
               }
                   
                              // '<p class="descP margin-top-p">Model <span> :'+json['posts'][0]['title']+' </span></p>'+
            if (json['posts'][0]['saving'] == "") {
               li = li + '   <p class="descP margin-top-p">Price / Item  <span class="blue-span">:' + json['posts'][0]['current'] + ' KWZ</span></p>'
            }
            else {
               li = li + '   <p class="descP margin-top-p">' + if_lang('unit price ', 'Preço unitário') + '  <span class="blue-span">:' + json['posts'][0]['current'] + ' KWZ </span>' +
                  ' ' + if_lang('saving', 'POUPAR ') + '   <span class="blue-span"> ( ' + json['posts'][0]['saving'] + '%  )</span> </p>'
               // +
               // '  <p class="descP margin-top-p"> saving   <span class="blue-span"> ( '+json['posts'][0]['saving']+'%  )</span> </p>'
            }
            li = li + ' <div class="descP margin-top-p info"> ' + if_lang(json['posts'][0]['info'], json['posts'][0]['secinfo']) + ' </div>' ;
            if(json['posts'][0]['availumquantity'] > 0){
             li = li +  '   <p class="descP margin-top-p">' + if_lang('AVAILABLE QUANTITY : ', 'QUANTIDADE DISPONÍVEL : ') + '  <span class="blue-span"> ' + json['posts'][0]['availumquantity'] + '</span></p>' ;
            }
            else{
               li = li +  '   <p class="descP margin-top-p" style="color:red">' + if_lang('Out of Stock Temporary ', 'Temporariamente fora de estoque ') + '  </p>' ;

            }
           li = li+    '   <p class="descP margin-top-p">' + if_lang('CONDITION  : ', 'CONDIÇÃO : ') + '  <span class="blue-span"> ' + json['posts'][0]['prodcondition'] + '  </span></p>'


            if (soldFlag == 0 && json['posts'][0]['availumquantity'] > 0 ) {

               li = li + '    <div class="row">' +
                  '   <div class="col-50">' +
                  ' <p class="descP" style="margin: unset; margin: 1vh 0  0 1vh;">Minimum Quantity : </p>' +
                  '    </div>' +

                  '    <div class="col-15" style="  text-align: end;" onclick="decreaseProduct(' + json['posts'][0]['id'] + ',' + json['posts'][0]['miniumquantity'] + ')">' +
                  '  <i class="material-icons">remove</i>                    </div>' +

                  '<div class="col-20">' +
                  '      <input type="number" class="valCardPros_' + json['posts'][0]['id'] + '" readonly id="valCardPros_' + json['posts'][0]['id'] + '"  value="' + json['posts'][0]['miniumquantity'] + '" style="  text-align: center; width:-webkit-fill-available ">' +
                  '   </div>' +

                  '   <div class="col-15" onclick="increaseProduct(' + json['posts'][0]['id'] + ',' + json['posts'][0]['availumquantity'] + ')"> ' +
                  '   <i class="material-icons">add</i>          </div>' +

                  '  </div>' +
                  ' <div style="text-align:-webkit-center">' +

                  ' <button class="col button button-raised button-fill" style="width: 35vh; margin: 1vh 0 1vh 0; background-color: #32c2ff;" onclick="addToCard(' + json['posts'][0]['id'] + "," + json['posts'][0]['availumquantity'] + ')">' + if_lang('Add to cart', 'Adicionar ao carrinho') + '  </button>';
            }
            li = li +
               ' <p class="descP margin-top-p desc">' + tempimg + ' </p>';



            li = li + '    </div>'

         }

         $('.containerProduct').html(li)
         $('.info_table').css('width', '100%')

         // li=                                 '<img class="imageCategoryProduct" src="'+json['posts'][0]['image']+'" style=" ">'
         // $('.imgSwiperProcducts').html(li)


         $('.RecomendedForYOU').html(if_lang('RECOMMENDED ITEMS', 'ITENS RECOMENDADOS'))
         var mySwiper = app.swiper.create('.swiper-categoryproductss', {
            slidesPerView: '1',
            // autoplay: {
            //     delay: 3000,
            // },
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            },
            speed: 100,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });
         //  mySwiper.removeAllSlides();	

         //   console.log(mySwiper)
         //   console.log(mySwiper.length)

         //console.log(json)

         // //console.log(json['posts'][0] ['image'].length)
         if (mySwiper.length == undefined) {
            mySwiper.removeAllSlides();

            if (json['posts'][0]['images'].length > 0) {


               for (var i = 0; i < json['posts'][0]['images'].length; i++) {
                  if (soldFlag == 1) {
                     //console.log( 'in sold flag')
                     if (i == 0) {

                        mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>' + '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '   <img src="img/sold.png" class="top-left">' + '</div>');

                     }
                     else {
                        mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '   <img src="img/sold.png" class="top-left">' + '</div>');
                     }
                  }

                  else {
                     //console.log( 'out sold flag')

                     if (i == 0) {

                        mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>' + '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');

                     }
                     else {
                        mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>');
                     }
                  }
                  mySwiper.update();

               }
            }

            else {



               for (var i = 0; i < 3; i++) {
                  if (i == 0) {
                     if (soldFlag == 0) {
                        mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');
                     }
                     else {
                        mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '   <img src="img/sold.png" class="top-left">' + '</div>');

                     }
                     mySwiper.update();

                  }


               }
            }
         }
         else {
            mySwiper[mySwiper.length - 1].removeAllSlides();

            console.log('in else')
            if (json['posts'][0]['images'].length > 0) {


               for (var i = 0; i < json['posts'][0]['images'].length; i++) {
                  if (soldFlag == 1) {
                     //console.log( 'in sold flag')
                     if (i == 0) {

                        mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>' + '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '   <img src="img/sold.png" class="top-left">' + '</div>');

                     }
                     else {
                        mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '   <img src="img/sold.png" class="top-left">' + '</div>');
                     }
                  }

                  else {
                     //console.log( 'out sold flag')

                     if (i == 0) {

                        mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>' + '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');

                     }
                     else {
                        mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>');
                     }
                  }
                  mySwiper[mySwiper.length - 1].update();

               }
            }

            else {



               for (var i = 0; i < 3; i++) {
                  if (i == 0) {
                     if (soldFlag == 0) {
                        mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');
                     }
                     else {
                        mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '   <img src="img/sold.png" class="top-left">' + '</div>');

                     }
                     mySwiper[mySwiper.length - 1].update();

                  }


               }
            }
         }



         setSoldFlag(0)




      }
   });

}


function ReturnValCatProd() {
   if ($('#ProductCategorySearch').val() == '') {
      getCategoryProduct(CategoryIdSearch)
   }

}

function getValudBid() {
   var data = $("input[name='my-radioBid']:checked").val();
   console.log(data)
   $('.bidbackGroundBid').css('background-color', '#32c2ff');
   $('.Text-Color').css('color', 'white');
   $('.bidbackGroundBid_' + data).css('background-color', 'white');
   $('.bid_' + data).css('color', '#32c2ff');
   $('.bidbackGroundBid_' + data).css('border', '1px solid rgb(50, 194, 255)');

}

function getRegisterForm() {

   var data = $("input[name='my-radio']:checked").val();
   $('#bidbackGround_' + data).css('background', 'black')
   console.log(data)
   var li = ''
   if (data == 'Company') {
      getCountryCompany()
      li = '<div class="list no-hairlines-md" style="margin-left: 3vh;">' +
         '   <ul >' +
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label nameCompanyLable">Company Name</div>'+

         '    <div class="item-input-wrap">' +
         '    <input id="nameCompany" class="nameCompany"  type="text" placeholder="" name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '    </div>' +
         '  </li>' +

        

         
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label NIFLable">NIF</div>'+

         '    <div class="item-input-wrap">' +
         '    <input id="nifCompany" class="nifCompany" type="number" placeholder=" " name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '    </div>' +
         '  </li>' +

          
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label addressCompanyLable">' + if_lang('Address', 'ENDEREÇO') + '</div>'+

         '    <div class="item-input-wrap">' +
         '    <input id="addressCompany" class="addressCompany"  type="text" placeholder=" " name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '    </div>' +
         '  </li>' +

         


         '  <li class="item-content item-input item-input-outline item-input-with-value">' +
         '    <div class="item-inner ">' +

         '<div class="item-input-wrap">' +
         '   <select id="SelectBusiness" class="input-with-value SelectBusiness"  >' +
         '  <option value="-1">' + if_lang('Business TYPE', 'Tipo de Negócio') + '</option>' +


         '    </select>' +
         ' </div>' +
         '  </div>' +
         '    </li>' +
         

         '  <li class="item-content item-input item-input-outline item-input-with-value">' +
         '    <div class="item-inner ">' +


         '<div class="item-input-wrap">' +
         '   <select id="ProductType" class="input-with-value ProductType"  >' +
         '  <option value="-1">' + if_lang('PRODUCT TYPE', 'Tipo de Produto') + '</option>' +



         '    </select>' +
         ' </div>' +
         '  </div>' +
         '    </li>' +
         


         '  <li class="item-content item-input item-input-outline item-input-with-value">' +
         '    <div class="item-inner ">' +


         '<div class="item-input-wrap">' +
         '   <select id="CountrySelectCompany" class="input-with-value CountrySelectCompany" onchange="getCityCompany()"  >' +
         '  <option value="-1"> ' + if_lang('Country', 'PAíS') + '</option>' +


         '    </select>' +
         ' </div>' +
         '  </div>' +
         '    </li>' +
         


         '<li class="item-content item-input item-input-outline item-input-with-value">' +
         '    <div class="item-inner ">' +
         '  <div class="item-input-wrap">' +
         ' <select id="CitySelectCompany" class="input-with-value CitySelectCompany"  >' +
         ' <option value="-1"> ' + if_lang('City', 'CIDADE') + '</option>' +


         '   </select>' +
         '  </div>' +
         '  </div>' +
         '   </li>' +
         
         ' <li class="item-content item-input">' +
         '   <div class="item-inner">' +
         '   <div class="item-title item-label emailCompanyLable">' + if_lang('Email', 'Email') + '</div>'+

         '  <div class="item-input-wrap">' +
         ' <input id="emailCompany" class="emailCompany" type="text" placeholder="Email" name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '   </div>' +
         '   </li>' +
 
         ' <li class="item-content item-input">' +
         ' <div class="item-inner">' +
         '   <div class="item-title item-label phoneLable">' + if_lang('phone', 'TELEFONE') + '</div>'+

         '   <div class="item-input-wrap">' +
         ' <input id="phone" class="phone"  type="number" placeholder="  " name="name">' +
         ' <span class="input-clear-button"></span>' +
         ' </div>' +
         '  </div>' +
         '  </li>' +

       
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label mobileCompanyLable">' + if_lang('Mobile', 'MóVEL') + '</div>'+

         ' <div class="item-input-wrap">' +
         '  <input id="mobileCompany" class="mobileCompany"  type="number" placeholder=" " name="name">' +
         '<span class="input-clear-button"></span>' +
         ' </div>' +
         ' </div>' +
         '   </li>' +

        
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label PasswordCompanyLable">' + if_lang('Password', 'SENHA') + '</div>'+

         ' <div class="item-input-wrap">' +
         '  <input id="PasswordCompany" class="PasswordCompany" type="Password" placeholder="" name="name">' +
         '<span class="input-clear-button"></span>' +
         ' </div>' +
         ' </div>' +
         '   </li>' +

         '   </ul>' +


         '  </div> ' +
         '<div class="form-group margin-vertical text-align-left" " style="    margin-left: 5vh;">' +
         '   <label class="checkbox">' +
         '    <input class="conditions" id="conditions" type="checkbox">' +

         '   <i class="icon-checkbox"></i>' +
         '  </label>' +
         '    <div class="AcceptSignUp">' + if_lang('I accept', 'eu aceito') + ' <a href="/termAndCondition/" onclick="" style="text-decoration: underline;">' + if_lang('Terms and Condition', 'termos e Condições') + '</a></div>' +
         ' </div>';
      $('.RegisterContent').html(li)
      $('#Registerbtn').attr("onclick", "RegisterCompany()")
      $('.titleRegisterCompany').html(if_lang('Company', 'Empresa'))
      $('.titleRegisters').html(if_lang('Company', 'Empresa'))
      getBusinessType()
      getProductType()

   }


   if (data == 'Person') {
      li = '<div class="list no-hairlines-md" style="margin-left: 3vh;">' +
         '   <ul >' +
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label namePersonLable">'   + if_lang('Name', 'Nome')+ '</div>'+

         '    <div class="item-input-wrap">' +
         '    <input id="namePerson"  type="text" placeholder=" " name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '    </div>' +
         '  </li>' +

        
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label addressCompanyLable">' + if_lang('Address', 'ENDEREÇO') + '</div>'+

         '    <div class="item-input-wrap">' +
         '    <input id="addressCompany" class="addressCompany"  type="text" placeholder=" " name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '    </div>' +
         '  </li>' +

        


         '  <li class="item-content item-input item-input-outline item-input-with-value">' +
         '    <div class="item-inner ">' +


         '<div class="item-input-wrap">' +
         '   <select id="CountrySelect" class="input-with-value CountrySelect"  onchange="getCity()">' +
         '  <option value="-1"> ' + if_lang('Country', 'PAíS') + '</option>' +


         '    </select>' +
         ' </div>' +
         '  </div>' +
         '    </li>' +
        


         '<li class="item-content item-input item-input-outline item-input-with-value">' +
         '    <div class="item-inner ">' +

         '  <div class="item-input-wrap">' +
         ' <select id="CitySelect" class="input-with-value CitySelect"  >' +
         ' <option value="-1"> ' + if_lang('City', 'CIDADE') + '</option>' +


         '   </select>' +
         '  </div>' +
         '  </div>' +
         '   </li>' +
       
         ' <li class="item-content item-input">' +
         '   <div class="item-inner">' +
                  '   <div class="item-title item-label emailPersonLable">' + if_lang('EMAIL', 'EMAIL') + '</div>'+

         '  <div class="item-input-wrap">' +
         ' <input id="emailPerson"  type="text" placeholder=" " name="name">' +
         '  <span class="input-clear-button"></span>' +
         '    </div>' +
         '   </div>' +
         '   </li>' +

         
         ' <li class="item-content item-input">' +
         ' <div class="item-inner">' +
         '   <div class="item-title item-label mobilePersonLable">' + if_lang('Mobile', 'MóVEL') + '</div>'+

         '   <div class="item-input-wrap">' +
         ' <input id="mobilePerson"  type="number" placeholder="" name="name">' +
         ' <span class="input-clear-button"></span>' +
         ' </div>' +
         '  </div>' +
         '  </li>' +

        
         '   <li class="item-content item-input">' +
         '  <div class="item-inner">' +
         '   <div class="item-title item-label mobilePersonLable">' + if_lang('password', 'SENHA') + '</div>'+

         ' <div class="item-input-wrap">' +
         '  <input id="passwordPerson"  type="password" placeholder="" name="name">' +
         '<span class="input-clear-button"></span>' +
         ' </div>' +
         ' </div>' +
         '   </li>' +

         '   </ul>' +


         '  </div> ' +
         '<div class="form-group margin-vertical text-align-left" " style="    margin-left: 5vh;">' +
         '   <label class="checkbox">' +
         '    <input class="conditions" id="conditions" type="checkbox">' +

         '   <i class="icon-checkbox"></i>' +
         '  </label>' +
         '    <div class="AcceptSignUp">' + if_lang('I accept', 'eu aceito') + ' <a href="/termAndCondition/" onclick="" style="text-decoration: underline;">' + if_lang('Terms and Condition', 'termos e Condições') + '</a></div>' +
         ' </div>';

      $('.RegisterContent').html(li)
      $('.titleRegisterCompany').html('Register')
      $('.titleRegisters').html('Register')

      $('#Registerbtn').attr("onclick", "RegisterPerson()")
   }


   getCountry()
}

function getBidDiv() {

   var data = $("input[name='my-radio']:checked").val();
   console.log(data)

}
function getCountry() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=country&format=json  ",


      success: function (json) {
         //console.log(json)
         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
         }
         $('.CountrySelect').append(li)
         // $('#CountrySelectCompany').html(li)



      }
   });


}

function getBusinessType() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getBusinesses&format=json",


      success: function (json) {
         //console.log(json)
         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            li = li + ' <option value="' + json['posts'][i]['id'] + '">' + if_lang(json['posts'][i]['name'], json['posts'][i]['secname']) + '</option>'
         }
         $('.SelectBusiness').append(li)
         // $('#CountrySelectCompany').html(li)



      }
   });


}

function getBusinessTypeByID(id) {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getBusinesses&format=json",


      success: function (json) {
         //console.log(json)

         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            if (id == json['posts'][i]['id']) {
            }
            if (id == json['posts'][i]['id']) {
               li = li + ' <option value="' + json['posts'][i]['id'] + '" selected>' + if_lang(json['posts'][i]['name'], json['posts'][i]['secname']) + '</option>'


            }
            else {


               li = li + ' <option value="' + json['posts'][i]['id'] + '">' + if_lang(json['posts'][i]['name'], json['posts'][i]['secname']) + '</option>'
            }
         }
         $('.SelectBusiness').append(li)



      }
   });


}

function getProductType() {

   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=categories&format=json",


      success: function (json) {
         //console.log(json)
         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            li = li + ' <option value="' + json['posts'][i]['id'] + '">' + if_lang(json['posts'][i]['name'], json['posts'][i]['aname']) + '</option>'
         }
         $('.ProductType').append(li)
         // $('#CountrySelectCompany').html(li)



      }
   });


}
function getProductTypeByID(id) {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=categories&format=json",


      success: function (json) {
         console.log(json)

         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            if (id == json['posts'][i]['id']) {
            }
            if (id == json['posts'][i]['id']) {
               li = li + ' <option value="' + json['posts'][i]['id'] + '" selected>' + if_lang(json['posts'][i]['name'], json['posts'][i]['aname']) + '</option>'


            }
            else {


               li = li + ' <option value="' + json['posts'][i]['id'] + '">' + if_lang(json['posts'][i]['name'], json['posts'][i]['aname']) + '</option>'
            }
         }
         $('.ProductType').append(li)



      }
   });


}


function getCountryCompany() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=country&format=json  ",


      success: function (json) {
         //console.log(json)
         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
         }
         $('.CountrySelectCompany').append(li)
         // $('#CountrySelectCompany').html(li)



      }
   });


}


function getBussinessByID(id) {

   var li = ''

   for (var i = 0; i < json['posts'].length; i++) {
      if (id == json['posts'][i]['id']) {
      }
      if (id == json['posts'][i]['id']) {
         li = li + ' <option value="' + json['posts'][i]['id'] + ' " selected>' + json['posts'][i]['name'] + '</option>'

      }
      else {


         li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
      }
   }
   $('.CountrySelect').append(li)


}


function getCountryByID(id) {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=country&format=json",


      success: function (json) {
         //console.log(json)

         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            if (id == json['posts'][i]['id']) {
            }
            if (id == json['posts'][i]['id']) {
               li = li + ' <option value="' + json['posts'][i]['id'] + ' " selected>' + json['posts'][i]['name'] + '</option>'

            }
            else {


               li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
            }
         }
         $('.CountrySelect').append(li)



      }
   });


}


function getCity() {

   //console.log($('#CountrySelect').val())
   var id = $('.CountrySelect').val()
   console.log(id)
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=cities&country_id=" + id + "&format=json ",


      success: function (json) {
         console.log(json)
         var li = ''
         if (json['posts'][0] != 0) {
            for (var i = 0; i < json['posts'].length; i++) {
               li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
            }

            $('.CitySelect').html(li)
         }
         else {
            li = ' <option value="-1">City</option>'
            $('.CitySelect').html(li)

         }


      }
   });


}


function getCityCompany() {

   //console.log($('#CountrySelect').val())
   var id = $('#CountrySelectCompany').val()
   console.log(id)
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=cities&country_id=" + id + "&format=json ",


      success: function (json) {
         console.log(json)
         var li = ''
         if (json['posts'][0] != 0) {
            for (var i = 0; i < json['posts'].length; i++) {
               li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
            }

            $('.CitySelectCompany').html(li)
         }
         else {
            li = ' <option value="-1">City</option>'
            $('.CitySelectCompany').html(li)

         }


      }
   });


}
function getCityByID(id, Cityid) {

   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=cities&country_id=" + id + "&format=json ",


      success: function (json) {
         console.log('city')
         console.log(json)
         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            if (Cityid == json['posts'][i]['id']) {
               li = li + ' <option value="' + json['posts'][i]['id'] + ' " selected>' + json['posts'][i]['name'] + '</option>'

            }
            li = li + ' <option value="' + json['posts'][i]['id'] + '">' + json['posts'][i]['name'] + '</option>'
         }
         $('.CitySelect').append(li)


      }
   });


}


function RegisterPerson() {
   showIndicator()
   var name = $('#namePerson').val()
   var Country = $('#CountrySelect').val()
   var City = $('#CitySelect').val()
   var Email = $('#emailPerson').val()
   var adddres = $('.addressCompany').val()
   var mobile = $('#mobilePerson').val()
   var password = $('#passwordPerson').val()

   if (name == '') {
      hideIndicator()

      alert(if_lang("please enter name", 'por favor digite o nome'))
   }
   else {
      if (adddres == '') {
         alert(if_lang("please enter address", 'digite o endereço'))
      }
      else {
         if (Country == -1) {
            alert(if_lang("please choose Country", 'por favor escolha país'))
         }
         else {
            if (City == '') {
               hideIndicator()

               alert(if_lang("please choose City", 'por favor escolha a cidade'))
            }
            else {
               if (Email == '') {
                  hideIndicator()

                  alert(if_lang("please enter email", 'por favor insira o email'))
               }
               else {
                  if (mobile == '') {
                     hideIndicator()

                     alert(if_lang("please enter mobile", 'por favor entre no celular'))
                  }
                  else {
                     if (password == '') {
                        hideIndicator()

                        alert(if_lang("please enter password", 'por favor digite a senha'))
                     }

                     else {
                        if (!$('.conditions').prop('checked')) {
                           alert(if_lang('Please check agree in conditions', 'Please check agree in conditions'))
                        } else {
                           $.ajax({
                              type: 'POST',
                              url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=registration&name=' + name + '&email=' + Email +  '&version=' + VersionApp + '&address=' + adddres + '&user_type=Personal&password=' + password + '&phone=' + mobile + '&country_id=' + Country + '&city_id=' + City + '&uuid=' + UUID + '&platform=' + PLATFORM + '&format=json',


                              success: function (json) {
                                 console.log(json)
                                 if (json['posts'][0] == -1) {
                                    alert(if_lang('this is Email was registerd before ! ', 'este é Email foi registrado antes!'))
                                 }
                                 else if (json['posts'][0] == 0) {
                                    alert(if_lang('There is a problem currently being resolved, please try again later  ', 'Há um problema sendo resolvido no momento. Tente novamente mais tarde'))

                                 }
                                 else {
                                    // alert(if_lang('The account has been successfully created congratulations ' , 'A conta foi criada com sucesso parabéns'))

                                    localStorage.buitandaUserID = json['posts'][0]
                                    localStorage.buitandaUserType = json['posts'][1]

                                    console.log(localStorage.buitandaUserID)
                                    console.log('user type ----- REgistsr >' + localStorage.buitandaUserType)

                                    location.reload()

                                 }
                                 hideIndicator()
                              }
                           });

                        }
                     }

                  }
               }
            }
         }
      }
   }


   //console.log(name + '    '+Country + '    '+City + '    '+mobile + '    '+password  )


   hideIndicator()
}







function RegisterCompany() {
   showIndicator()
   var name = $('.nameCompany').val()
   var nif = $('.nifCompany').val()
   var Address = $('.addressCompany').val()
   var business = $('.SelectBusiness').val()
   var product = $('.ProductType').val()

   var Country = $('.CountrySelectCompany').val()
   var City = $('.CitySelectCompany').val()
   var Email = $('.emailCompany').val()

   var mobile = $('.mobileCompany').val()
   var phone = $('.phone').val()
   var password = $('.PasswordCompany').val()
   var userType = 'Company'
   if (name == '') {
      alert(if_lang("please enter name company", 'digite o nome da empresa'))
   }
   else {
      if (nif == '') {
         alert(if_lang("please enter nif", ' por favor digite nif'))
      }
      else {
         if (Address == '') {
            alert(if_lang("please enter address", 'digite o endereço'))
         }
         else {
            if (business == -1) {
               alert(if_lang("please choose your type business", 'por favor, escolha o seu tipo de negócio'))
            }
            else {
               if (product == '') {
                  alert(if_lang("please choose your product type", 'por favor escolha o seu tipo de produto'))
               }
               else {

                  if (Country == -1) {
                     alert(if_lang("please choose Country", 'por favor escolha país'))
                  }
                  else {
                     if (City == '') {
                        alert(if_lang("please choose City", 'por favor escolha a cidade'))
                     }
                     else {
                        if (Email == '') {
                           alert(if_lang("please enter email", 'por favor insira o email'))
                        }
                        else {
                           if (phone == '') {
                              alert(if_lang("please choose phone", 'por favor escolha a telefone'))

                           }
                           else {
                              if (mobile == '') {
                                 alert(if_lang("please enter mobile", 'por favor entre no celular'))
                              }
                              else {
                                 if (password == '') {
                                    alert(if_lang("please enter password", 'por favor digite a senha'))
                                 }
                                 else {
                                    if (!$('.conditions').prop('checked')) {
                                       alert(if_lang('Please check agree in conditions', 'Please check agree in conditions'))
                                    } else {
                                       console.log('city ---- > ' + City)
                                       console.log('Countery ---- > ' + Country)
                                       console.log('https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=registration_company&name=' + name + '&email=' + Email + '&user_type=Company&password=' + password + '&phone=' + phone + '&mobile=' + mobile +
                                          '&NIF=' + nif + '&address=' + Address + '&country_id=' + Country + '&city_id=' + City + '&bussines_type=' + business + '&prod_type=' + product + '&uuid=' + UUID + '&platform=' + PLATFORM + '&format=json')
                                       $.ajax({
                                          type: 'POST',
                                          url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=registration_company&name=' + name + '&email=' + Email +  '&version=' + VersionApp + '&user_type=Company&password=' + password + '&phone=' + phone + '&mobile=' + mobile +
                                             '&NIF=' + nif + '&address=' + Address + '&country_id=' + Country + '&city_id=' + City + '&bussines_type=' + business + '&prod_type=' + product + '&uuid=' + UUID + '&platform=' + PLATFORM + '&format=json',

                                          success: function (json) {
                                             console.log(json)
                                             if (json['posts'][0] == -1) {
                                                alert(if_lang('this is Email was registerd before ! ', 'este é Email foi registrado antes!'))
                                             }
                                             else if (json['posts'][0] == 0) {
                                                alert(if_lang('There is a problem currently being resolved, please try again later  ', 'Há um problema sendo resolvido no momento. Tente novamente mais tarde'))

                                             }
                                             else {
                                                // alert(if_lang('The account has been successfully created congratulations ' , 'A conta foi criada com sucesso parabéns'))


                                                localStorage.buitandaUserID = json['posts'][0]
                                                localStorage.buitandaUserType = 'Company'
                                                console.log('user type ----- REgistsr >' + localStorage.buitandaUserType)

                                                location.reload()
                                             }

                                             hideIndicator()
                                          }
                                       });

                                    }

                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }

   //console.log(name + '    '+Country + '    '+City + '    '+mobile + '    '+password  )

   hideIndicator()
}


function RegisterSeller() {
   showIndicator()
   var name = $('#nameSeller').val()
   var nif = $('#nifSeller').val()
   var Address = $('#addressSeller').val()
   var business = $('#SelectBusinessSeller').val()
   var product = $('#ProductTypeSeller').val()

   var Country = $('#CountrySelect').val()
   var City = $('#CitySelect').val()
   var Email = $('#emailSeller').val()

   var mobile = $('#mobileSeller').val()
   var phone = $('#phoneSeller').val()
   var password = $('#PasswordSeller').val()
   var userType = 'Company'
   if (name == '') {
      alert(if_lang("please enter name company", 'digite o nome da empresa'))
   }
   else {
      if (nif == '') {
         alert(if_lang("please enter nif", ' por favor digite nif'))
      }
      else {
         if (Address == '') {
            alert(if_lang("please enter address", 'digite o endereço'))
         }
         else {
            if (business == -1) {
               alert(if_lang("please choose your type business", 'por favor, escolha o seu tipo de negócio'))
            }
            else {
               if (product == '') {
                  alert(if_lang("please choose your product type", 'por favor escolha o seu tipo de produto'))
               }
               else {

                  if (Country == -1) {
                     alert(if_lang("please choose Country", 'por favor escolha país'))
                  }
                  else {
                     if (City == '') {
                        alert(if_lang("please choose City", 'por favor escolha a cidade'))
                     }
                     else {
                        if (Email == '') {
                           alert(if_lang("please enter email", 'por favor insira o email'))
                        }

                        else {
                           if (phone == '') {
                              alert(if_lang("please choose phone", 'por favor escolha a telefone'))

                           }
                           else {
                              if (mobile == '') {
                                 alert(if_lang("please enter mobile", 'por favor entre no celular'))
                              }
                              else {
                                 if (!$('.conditions').prop('checked')) {
                                    alert(if_lang('Please check agree in conditions', 'Please check agree in conditions'))
                                 } else {
                                    console.log('https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=registration_seller&name=' + name + '&email=' + Email + '&phone=' + phone + '&mobile=' + mobile +
                                       '&NIF=' + nif + '&address=' + Address + '&country_id=' + Country + '&city_id=' + City + '&bussines_type=' + business + '&prod_type=' + product + '&format=json')

                                    $.ajax({
                                       type: 'POST',
                                       url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=registration_seller&name=' + name + '&email=' + Email + '&phone=' + phone + '&mobile=' + mobile +
                                          '&NIF=' + nif + '&address=' + Address + '&country_id=' + Country + '&city_id=' + City + '&bussines_type=' + business + '&prod_type=' + product + '&format=json',

                                       success: function (json) {
                                          console.log(json)
                                          if (json['posts'][0] != 0) {
                                             alert(if_lang('Request Sent , we will contact your briefly . ', 'Pedido enviado, entraremos em contato brevemente.'))
                                             location.reload()

                                          }

                                          hideIndicator()
                                       }
                                    });



                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }

   //console.log(name + '    '+Country + '    '+City + '    '+mobile + '    '+password  )

   hideIndicator()
}





function login() {
   showIndicator()
   var email = $('#emailLogin').val()
   var password = $('#passwordLogins').val()
   //console.log(email+ '    ' +password)

   if (email == '') {
      alert(if_lang('please enter email', 'من فضلك ادخل البريد الالكتروني'))
      hideIndicator()

   }
   else {
      if (password == ' ') {
         alert(if_lang('please enter password', 'من فضلك ادخل الرقم السري'))
         hideIndicator()

      }
      else {
         $.ajax({
            type: 'POST',
            url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=login&email=' + email + '&password=' + password +  '&version=' + VersionApp + '&uuid=' + UUID + '&platform=' + PLATFORM + '&format=json',


            success: function (json) {
               console.log(PLATFORM)
               console.log('https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=login&email=' + email + '&password=' + password + '&uuid=' + UUID + '&platform=' + PLATFORM + '&format=json')
               console.log(json)
               if (json['posts'][0] != 0) {
                  localStorage.buitandaUserID = json['posts'][0]['id']
                  localStorage.buitandaUserType = json['posts'][0]['user_type']
                  // console.log(  localStorage.buitandaUserID)
                  location.reload()


               }
               else {
                  alert(if_lang('please enter right email and password ! ', 'please enter right email and password ! '))

               }
               // if(json['posts'][0]  == 0){
               // //console.log('nice')}
               hideIndicator()
            }
         });
      }
   }

}



function logout() {
   localStorage.removeItem("buitandaUserID");
   localStorage.removeItem("buitandaUserType");

   location.reload()

}



function resetPassword() {
   showIndicator()
   var email = $('#emailReset').val()
   if (email == '') {
      alert(if_lang('please enter email', 'من فضلك ادخل البريد الالكتروني'))
      hideIndicator()

   }
   else {

      $.ajax({
         type: 'POST',
         url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=checkEmail&email=' + email + '&format=json',


         success: function (json) {
            console.log(json)



            if (json['posts'][0] != 0) {
               go_to_page("verifyCode")
               localStorage.buitandaTemp = json['posts']['0']['id']

               //console.log('nice')
            }
            else {
               alert(if_lang('this email dosn\'t exist'))
            }
            hideIndicator()
         }
      });
   }


}


function checkCode() {
   showIndicator()
   var code = $('#code').val()
   if (code == '') {
      alert(if_lang('please enter code', 'من فضلك ادخل البريد الالكتروني'))
      hideIndicator()

   }
   else {
      //console.log(localStorage.buitandaTemp)

      $.ajax({
         type: 'POST',
         url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=checkCode&customer_id=' + localStorage.buitandaTemp + '&code=' + code + '&format=json',
         

         success: function (json) {
            //console.log(json)
            if (json['posts'][0] != 0) {
               go_to_page("ResetPassword")

            }
            else {
               alert(if_lang('wrong code please enter correct code'))

            }


            // if(json['posts'][0]  == 0){
            // //console.log('nice')}
            hideIndicator()
         }
      });
   }
}


function setNewPassword() {
   //console.log(localStorage.buitandaTemp)

   showIndicator()
   var cpassword = $('#cPasswordReset').val()
   var password = $('#passwordReset').val()
   if (password == '') {
      alert(if_lang('please enter password', 'من فضلك ادخل البريد الالكتروني'))

      hideIndicator()

   }
   else {
      if (cpassword == '') {
         alert(if_lang('please enter confirmation password', 'من فضلك ادخل البريد الالكتروني'))

         hideIndicator()

      }
      else {

         if (cpassword != password) {
            alert(if_lang('please ensure the password is the same confirmation password', 'من فضلك ادخل البريد الالكتروني'))

            hideIndicator()

         }
         else {

            //console.log(localStorage.buitandaTemp)

            $.ajax({
               type: 'POST',
               url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=resetpassword&customer_id=' + localStorage.buitandaTemp + '&password=' + password + '&format=json',


               success: function (json) {
                  //console.log(json)

                  localStorage.buitandaUserID = localStorage.buitandaTemp

                  location.reload()
                  hideIndicator()
               }
            });
         }
      }
   }
}


function getProfile() {
   $.ajax({
      type: 'GET',
      url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getProfile&customer_id=' + localStorage.buitandaUserID + '&format=json',
      // url:  'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getProfile&customer_id=80&format=json',


      success: function (json) {
         console.log(json)
         // console.log($('#namePerson'))
         // console.log(json['posts'][0]['name'])

         getCountryByID(json['posts'][0]['country_id'])
         getCityByID(json['posts'][0]['country_id'], json['posts'][0]['city_id'])
         getProductTypeByID(json['posts'][0]['product_type'])
         getBusinessTypeByID(json['posts'][0]['bussiness_type'])


         $('.namePerson').val(json['posts'][0]['name'])

         $('.emailPerson').val(json['posts'][0]['email'])
         $('.mobilePerson').val(json['posts'][0]['phoneNumber'])
         $('.nifCompany').val(json['posts'][0]['NIF'])
         $('.addressCompany').val(json['posts'][0]['address'])
         $('.phone').val(json['posts'][0]['mobile'])


         /// shoping 
         $('#nameShop').html(json['posts'][0]['name'])
         $('#phoneShop').html(json['posts'][0]['phoneNumber'])
         $('#AddressShop').html(json['posts'][0]['address'])

         $('#nameShop').val(json['posts'][0]['name'])
         $('#phoneShop').val(json['posts'][0]['phoneNumber'])
         $('#AddressShop').val(json['posts'][0]['address'])


         hideIndicator()
      }
   });

}


function updateProfile() {
   showIndicator()
   var name = $('.namePerson').val()
   var Country = $('.CountrySelect').val()
   var City = $('.CitySelect').val()
   var Email = $('.emailPerson').val()

   var mobile = $('.mobilePerson').val()
   var nif = $('#nifCompany').val()
   var address = $('.addressCompany').val()
   var ProductType = $('.ProductType').val()
   var business = $('.SelectBusiness').val()
   var phone = $('#phone').val()
   var password = $('#passwordPerson').val()

   if (name == '') {
      hideIndicator()

      alert(if_lang("please enter name", 'por favor digite o nome'))
   }
   else {
      if (Country == -1) {
         alert(if_lang("please choose Country", 'por favor escolha país'))
      }
      else {
         if (City == '') {
            hideIndicator()

            alert(if_lang("please choose City", 'por favor escolha a cidade'))
         }
         else {
            if (Email == '') {
               hideIndicator()

               alert(if_lang("please enter email", 'por favor insira o email'))
            }
            else {
               if (mobile == '') {
                  hideIndicator()

                  alert(if_lang("please enter mobile", 'por favor entre no celular'))
               }
               else {
                  if (localStorage.buitandaUserType == 'Company' && nif == '') {
                     alert(if_lang('please enter inf', 'por favor insira inf'))
                  }
                  else {
                     if (localStorage.buitandaUserType == 'Company' && ProductType == '-1') {
                        alert(if_lang('please choose Product Type', 'por favor escolha a Tipo de Produto'))

                     }
                     else {
                        if (localStorage.buitandaUserType == 'Company' && business == '-1') {
                           alert(if_lang('please choose business type', 'por favor escolha a Tipo de Negócio'))

                        }
                        else {
                           if (localStorage.buitandaUserType == 'Company' && phone == '') {
                              alert(if_lang('please enter phone', 'por favor Telefone'))

                           }
                           else {
                              if (address == '') {
                                 alert(if_lang('please enter address', 'por favor endereço'))

                              }
                              else {


                                 console.log('https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=update_profile_user&name=' + name + '&phone=' + mobile + '&email=' + Email +
                                    ' &country_id=' + Country + '&city_id=' + City + '&customer_id=' + localStorage.buitandaUserID + '&format=json')

                                 $.ajax({
                                    type: 'POST',
                                    url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=update_profile_user&name=' + name + '&mobile=' + mobile + '&email=' + Email +
                                       ' &country_id=' + Country + '&city_id=' + City + '&NIF=' + nif + '&prod_type=' + ProductType + '&bussines_type=' + business + '&address=' + address + '&phone=' + phone + '&customer_id=' + localStorage.buitandaUserID + '&format=json',


                                    success: function (json) {
                                       console.log(json)
                                       AnotherAlert(if_lang("your profile updated successfully", 'seu perfil foi atualizado com sucesso'))

                                       // location.reload();


                                       //   go_to_page("profile")
                                       hideIndicator()
                                    }
                                 });



                              }
                           }
                        }

                     }
                  }
               }
            }
         }
      }
   }


   //console.log(name + '    '+Country + '    '+City + '    '+mobile + '    '+password  )


   hideIndicator()
}


function getLang() {
   $.ajax({
      type: 'GET',
      url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getLangs&format=json',


      success: function (json) {
         //console.log(json)
         var li = ''
         for (var i = 0; i < json['posts'].length; i++) {
            li = li + '<li>' +
               '            <label class="item-radio item-content">';
            //console.log(localStorage.BuitLang) 
            //console.log(json['posts'][i]['name']) 

            if (localStorage.BuitLang == json['posts'][i]['name']) {
               li = li + '   <input type="radio" name="demo-radio" checked value="' + json['posts'][i]['name'] + '" id="buitanda' + i + '">'

            }
            else {
               li = li + '   <input type="radio" name="demo-radio" value="' + json['posts'][i]['name'] + '" id="buitanda' + i + '">'
            }
            li = li + '  <div class="item-media"><img style="width:7vh" src="' + json['posts'][i]['flag'] + '" alt="" class=""> </div>' +
               ' <div class="item-inner">' +
               '   <div class="item-title">' + json['posts'][i]['name'] + ' </div>' +
               ' </div> <i class="icon icon-radio"></i> </label>' +
               '  </li>'

         }
         // //console.log(li)
         $('.CounteryHome').html(li)


         hideIndicator()
      }
   });

}


function setLang() {
   //console.log($("input[name='demo-radio']:checked").val())
   localStorage.BuitLang = $("input[name='demo-radio']:checked").val();
   //console.log(localStorage.BuitLang)
   // go_to_page("profile")
   location.reload();

}


function getBanners() {
   $.ajax({
      type: 'GET',
      url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=banners&format=json',
      cache: false,


      success: function (json) {
         var mySwiper = app.swiper.create('.swiper-banners', {
            slidesPerView: '1',
            // autoplay: {
            //     delay: 3000,
            // },
            speed: 100,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });
         //console.log(json)
         if (flagSwip == 0) {

            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper.addSlide(i, '  <div class="swiper-slide"  >' + ' <img src="' + json['posts'][i]['image'] + '"  style="width: 100%;">' + '</div>');
               mySwiper.update();

            }

         }
         else {
            for (var i = 0; i < json['posts'].length; i++) {

               mySwiper[flagSwip].addSlide(i, '  <div class="swiper-slide"  >' + ' <img src="' + json['posts'][i]['image'] + '"  style="width: 100%;">' + '</div>');
               mySwiper[flagSwip].update();

            }

         }

      }
   });
}



function getAuctionsList() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=auctions_list&format=json",
      cache: false,


      success: function (json) {
         //console.log(json)
         if (json['posts'][0] != 0) {


            $('.titleCategory').html(name)

            var li = ''
            for (var i = 0; i < json['posts'].length; i++) {
               var    Remaining_time = get_timeDifference_Days(json['posts'][i]['endauctionDate'])


               li = li + '<div class="col-50" onclick="go_to_page_two_params(' + "'" + 'Auction' + "'" + ',' + json['posts'][i]['id'] + ')" >' +
                  ' <a > ' +

                  '<div class="white" style="height:26vh ; display:flex ;align-items:center " onclick="setbeforeNavigationFlag(3)">' +
                  ' <img class="img-product" src="' + json['posts'][i]['thumb'] + '"  style=" ">' +
                  '</div>' +
                  '<div class="white" style="margin-bottom:2vh ; margin-top: 1px">' +
                  '     <p class="pRedCat " >' + Remaining_time+ '</p>' +
                  ' <p class="margin-white paddig-product" style="color:black;padding:1px"> ' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>  <span>' + json['posts'][i]['originalprice'] + ' KWZ</span> ' +
                  ' </div>' +
                  '  </a>' +

                  '</div>'

            }

            $('.AuctionProd').html(li)
         }
         else {
            li = '<p style ="color:red"> ' + if_lang(' Coming Soon ', 'em breve') + '   </p> '
            $('.AuctionProd').html(li)

         }
      }
   });


}


function getAuctionProduct(id) {

   //console.log(id)
   //  $('.imgSwi').empty();


   $.ajax({
      type: 'GET',
      url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=auction&auct_id=' + id + '&format=json',


      success: function (json) {
         
         $('.RecomendedForYOU').html(if_lang('RECOMMENDED ITEMS', 'ITENS RECOMENDADOS'))
         console.log(json)
         var title = if_lang( json['posts'][0]['title'] , json['posts'][0]['sectitle'])
         // console.log('str --- > '+title)
         var lenString = title.length

         //console.log(title[2])
         var  str = ''
         console.log('length --- > '+ lenString)
          if (lenString > 17) {
            console.log('ttile --- > '+title )
            for (var x = 0; x < 15; x++) {
               str = str + title[x]
            }
            str = str + '..'
         }
         else{
            str = title
         }
         console.log('str --- > ' +str)

         $('.titleAuction').html(str);

         $('.Recommened-auction').empty();




         //    var mySwiper = app.swiper.create('.swiper-auction', {
         //       slidesPerView: 'auto',
         //       autoplay: {
         //           delay: 3000,
         //       },
         //       speed: 50,
         //       paginationClickable: true,
         //       spaceBetween: 10,
         //       watchSlidesProgress: true
         //   });     

         //   mySwiper.addSlide(10,  '  <div class="swiper-slide" style="width: 109px; margin:0 0 0 19vh;text-align: center;"  >'+ ' <img src="'+json['posts'][0]['thumb']+'"  style="width: 100%;">' +'</div>' );
         //   mySwiper.update();

         var test = timer(json['posts'][0]['endauctionDate'], json['posts'][0]['id'], json['posts'][0]['server_time'])
         var li = '    <h3 class="gray  margin-top-p"> ' + if_lang(json['posts'][0]['title'], json['posts'][0]['sectitle']) + '</h3>' +

            '<p class=" descP margin-top-p" >' + if_lang('Market Price: ' + json['posts'][0]['originalprice'], 'Preço de Mercado:  ' + json['posts'][0]['originalprice']) + '</p>' +
            '     <p class="pRedCat timer_' + json['posts'][0]['id'] + '" >' + timer(json['posts'][0]['endauctionDate'], json['posts'][0]['id'], json['posts'][0]['server_time']) + '</p>';
         if ($('.timer_' + id).html() != 'EXPIRED') {
            console.log($('.timer_' + id).html())

            li = li + '<p class="descP margin-top-p Current_Bid_' + json['posts'][0]['id'] + ' ">' + if_lang('Current Bid ', 'Oferta atual ') + '<span> :' + json['posts'][0]['bid']['bidcoins'] + ' KWZ</span></p>';
         }
         if ($('.timer_' + id).html() == 'EXPIRED') {
            console.log('whaaaaaaaat ---- > ' + $('.timer_' + id).html())
            li = li + '<p class="descP margin-top-p Current_Bid_' + json['posts'][0]['id'] + ' ">' + if_lang('Closed Bid ', 'Oferta Fechada ') + '<span> :' + json['posts'][0]['bid']['bidcoins'] + ' KWZ</span></p>';

         }

         li = li + '<p class="descP margin-top-p bidder_' + json['posts'][0]['id'] + '">' + if_lang('By ', 'Por ') + ' <span> :' + json['posts'][0]['bid']['customer_name'] + '</span></p>' +
            '<div class="bid_' + json['posts'][0]['id'] + '">' + '<div class="list list-box" style="display: flex;  "  >' +
            '<div class="row"  style="width: -webkit-fill-available;" >';
         if ($('.timer_' + id).html() != 'EXPIRED') {
            console.log($('.timer_' + id).html())
            console.log('Trueeeeeeeeeeeeeeeeee')
            for (var i = 0; i < json['posts']['suggestions'].length; i++) {


               li = li + '<div class="col-50" style="margin-top:5px">' +
                  '<ul  class="bidbackGroundBid bidbackGroundBid_' + json['posts']['suggestions'][i]['id'] + '" id="bidbackGroundBid_' + json['posts']['suggestions'][i]['id'] + '" style="background-color: #32c2ff;border-radius: 5px;" onchange="getValudBid()">' +

                  '<li>' +
                  '<label class="inpout-radio item-content">' +
                  '<input type="radio" name="my-radioBid" style="display:none"  value="' + json['posts']['suggestions'][i]['id'] + '"  >' +
                  '<div class="item-inner">' +
                  '<div class="Text-Color item-title Credit Company bid_' + json['posts']['suggestions'][i]['id'] + '" id="bid_' + json['posts']['suggestions'][i]['id'] + 'idProd_' + json['posts'][0]['id'] + '" style="color:white; width: -webkit-fill-available;text-align: center;"> ' + json['posts']['suggestions'][i]['suggestion'] + '</div>' +
                  '</div>' +
                  '</label>' +
                  '</li>' +
                  '</ul>' +
                  '</div>'
            }
         }
         else {
            console.log('in else')
            $('.Current_Bid_' + json['posts'][0]['id']).html(if_lang('Closed Bid ', 'Oferta Fechada  ') + '<span> :' + json['posts'][0]['bid']['bidcoins'] + ' KWZ')
         }
         li = li + '</div>' +
            '</div>' +
            '</div>'


         $('.bid').html(li)
         '<p class="descP margin-top-p">' + if_lang('Auction Rules ', 'Regras do Leilão ') + ' <span class="blue-span">:' + json['posts'][1]['description'] + '</span></p>' +
            '<p class="descP margin-top-p">' + if_lang('info ', 'informação ') + ' <span> :' + if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']) + '</span></p>' +

            '<div style="text-align:-webkit-center" >';
         console.log(TimerFlag)
         if ($('.timer_' + id).html() != 'EXPIRED') {
            console.log(TimerFlag)
            li = li + '                          <div style="text-align:-webkit-center">' +
               ' <button id="bidBtn_' + json['posts'][0]['id'] + '" class="col button button-raised button-fill bidBtn_' + json['posts'][0]['id'] + '" style="width: 20vh; margin: 1vh 0 1vh 0; background-color: red;" onclick="SubmitAuction(' + id + ',' + "'" + title + "'" + ')">' + if_lang('Bid', 'Oferta') + '   </button>';
            + '</div>'
         }
         li = li + '</div>';


         var tempimg = ''
         var n = if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']).indexOf("http");
         if (if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']) != '') {
            if (n == -1) {
               tempimg = tempimg + if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']).replace(/src='/g, "style='width:100%; height:auto' src=\'https://host.optimalsolutionslebanon.com/~buitandatest")
            }
            else {
               tempimg = tempimg + if_lang(json['posts'][0]['description'], json['posts'][0]['secdescription']).replace(/src='/g, "style='width:100%; height:auto' src=\'")
            }
         }

         li = li + '<p class="descP margin-top-p">' + if_lang(json['posts'][1]['name'], json['posts'][1]['arname']) + ': ' + if_lang(json['posts'][1]['description'], json['posts'][1]['ardescription']) + '</p>' +
            '<div>' + tempimg + ' </div>'

         $('.contentAuctionProduct').html(li)

         //   getRecomendedAuction(id)
         //   getBid(id)
         var mySwiper = app.swiper.create('.swiper-categoryproductssA', {
            slidesPerView: '1',
            // autoplay: {
            //     delay: 3000,
            // },
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            },
            speed: 100,
            paginationClickable: true,
            spaceBetween: 10,
            watchSlidesProgress: true
         });
         //   mySwiper.removeAllSlides();	
         // console.log(mySwiper)
         // console.log(mySwiper.length)




         if (mySwiper.length == undefined) {
            mySwiper.removeAllSlides()

            // console.log('in iff ')
            // console.log(flagAcution)
            // console.log()
            if (json['posts'][0]['images'] != undefined) {
               for (var i = 0; i < json['posts'][0]['images'].length; i++) {
                  //console.log( 'in sold flag')
                  if (i == 0) {

                     mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + 
                     ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:100%">' + '</div>' + 
                     '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:100%">' + '</div>');

                  }
                  else {
                     mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + 
                     ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:100%">' + '</div>');
                  }


                  mySwiper.update();

               }
            }
            else {
               mySwiper.addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');

            }

         }




         else {

            mySwiper[mySwiper.length - 1].removeAllSlides()
            if (json['posts'][0]['images'] != undefined) {

               for (var i = 0; i < json['posts'][0]['images'].length; i++) {
                  //console.log( 'in sold flag')
                  if (i == 0) {

                     mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>' + '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');

                  }
                  else {
                     mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['images'][i]['image'] + '"  style=" width:35vh">' + '</div>');
                  }


                  mySwiper[mySwiper.length - 1].update();

               }
            }
            else {
               mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide" style="width:unset;text-align:center"  >' + ' <img src="' + json['posts'][0]['image'] + '"  style=" width:35vh">' + '</div>');

            }


         }



      }
   });


}

var TimerFlag = 1

function bidSetIntreval(id) {
   var x = setInterval(function () {

      $.ajax({
         type: 'GET',
         url: 'https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=last_bid&prod_id=' + id + '&format=json',


         success: function (json) {
            // console.log(json)
            if ($('.timer_' + id).html() != 'EXPIRED') {

               $('.Current_Bid_' + id).html(if_lang('Current Bid ', 'Oferta atual ') + '<span> :' + json['posts']['bid'] + '  </span>')
            }
            else {
               $('.Current_Bid_' + id).html(if_lang('Closed Bid ', 'Oferta Fechada ') + '<span> :' + json['posts']['bid'] + '  </span>')

            }
            $('.bidder_' + id).html(if_lang('By ', 'Por ') + ' <span> :' + json['posts']['bidder'] + '</span>')
            if ($('.timer_' + id).html() != 'EXPIRED') {

               for (var i = 0; i < json['posts']['suggestions'].length; i++) {

                  $('#bid_' + json['posts']['suggestions'][i]['id'] + 'idProd_' + id).html(json['posts']['suggestions'][i]['value'])

               }
            }



         }
      });

   }, 1000);
}

function timer(date, id, server_time) {
   // console.log(id)
   clearInterval(x)

   var countDownDate = new Date(date).getTime();
   var time_now = new Date().getTime();
   var time_server = new Date(server_time).getTime();
   var time_deffer = time_server - time_now;
   // Update the count down every 1 second
   var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime() + time_deffer;

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //   document.getElementById("timer_"+id).innerHTML = days + "d " + hours + "h "
      //   + minutes + "m " + seconds + "s ";
      $('.timer_' + id).html(days + "d " + hours + "h "
         + minutes + "m " + seconds + "s ")
      TimerFlag = 1

      // If the count down is over, write some text 
      if (distance < 0) {
         clearInterval(x);

         //  document.getElementById("timer_"+id).innerHTML = "EXPIRED";
         $('.timer_' + id).html("EXPIRED")
         TimerFlag = 0
         // console.log('timer flaag ---  > '+ TimerFlag)
         $('.bid_' + id).hide()
         $('.bidBtn_' + id).hide()
         clearInterval(x)

      }

   }, 1000);

}

function getRecomendedCategory(idprod, idCat) {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=deals_like&cat_id=" + idCat + "&prod_id=" + idprod + "&format=json",


      success: function (json) {
         //alert(json['posts'][0]['description']);
         //  //console.log('json ')
         //  console.log(json)
         if (json['posts'][0] != 0) {

            var mySwiper = app.swiper.create('.swiper-category', {
               slidesPerView: '3',
               autoplay: {
                  delay: 3000,
               },
               speed: 100,
               paginationClickable: true,
               spaceBetween: 10,
               watchSlidesProgress: true
            });
            //  var mySwiper = app.swiper.create('.swiper-letest', {
            //    slidesPerView: '3',
            //    // autoplay: {
            //    //    delay: 3000,
            //    // }, 
            //    speed: 50,
            //    paginationClickable: true,
            //    spaceBetween: 10,
            //    watchSlidesProgress: true
            // });
            var x = 'ahmed samir'

            // //console.log(json['posts'].length)
            console.log(mySwiper)
            console.log(mySwiper.length)
            for (var i = 0; i < json['posts'].length; i++) {
               if (mySwiper.length == undefined) {
                  mySwiper.addSlide(i, '<div class="swiper-slide" style="width:19vh; ">' +
                     '<div class="Height-width" > ' +
                     ' <div class="divImgSwiper">' +
                     '  <img  onclick="getProduct(' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + "'" + ')"  class="imageSwiper" src="' + json['posts'][i]['image'] + '"  style=" ">' +
                     ' </div>' +
                     ' </div>' +

                     '   <div class ="length-p">' +

                     ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                     ' </div>' +

                     ' <span style="text-align:center; display:block">  ' + json['posts'][i]['current'] + ' KWZ</span>' +


                     ' </div>' +
                     '  </div>');

                  mySwiper.update();
               }
               else {
                  mySwiper[mySwiper.length - 1].addSlide(i, '<div class="swiper-slide" style="width:19vh; ">' +
                     '<div class="Height-width" > ' +
                     ' <div class="divImgSwiper">' +
                     '  <img  onclick="getProduct(' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + "'" + ')"  class="imageSwiper" src="' + json['posts'][i]['image'] + '"  style=" ">' +
                     ' </div>' +
                     ' </div>' +

                     '   <div class ="length-p">' +

                     ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                     ' </div>' +

                     ' <span style="text-align:center; display:block">  ' + json['posts'][i]['current'] + ' KWZ</span>' +


                     ' </div>' +
                     '  </div>');

                  mySwiper[mySwiper.length - 1].update();
               }

            }


         }
         else {
            $('.SwiperRecommended').hide()
            $('.RecomendedForYOU').hide()

         }

      }
   });
}

function getRecomendedAuction(id) {
   // //console.log('in auction')
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=like&auc_id=" + id + "&format=json",

      success: function (json) {
         if (json['posts'][0] != 0) {
            //alert(json['posts'][0]['description']);
            console.log('json ')
            console.log(json)
            var mySwiper = app.swiper.create('.swiper-RecomendedAuction', {
               slidesPerView: '3',
               // autoplay: {
               //    delay: 3000,
               // },
               speed: 100,
               paginationClickable: true,
               spaceBetween: 10,
               watchSlidesProgress: true
            });

            for (var i = 0; i < json['posts'].length; i++) {
               if (mySwiper.length == undefined) {
                  // mySwiper.removeAllSlides() 
                  mySwiper.addSlide(i, '  <div class="swiper-slide"  style="width:17vh; ">' +
                     ' <div>' +
                     '<div class="Height-width" > ' +
                     ' <div class="divImgSwiper">' +

                     '  <img  onclick="getAuctionProduct(' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + "'" + ')" class="imageSwiper" src="' + json['posts'][i]['thumb'] + '"  style=" ">' +
                     '   </div>' +
                     '   </div>' +
                     '   </div>' +
                     '  <div>' +
                     '     <p class="pRed timer_' + json['posts'][i]['id'] + '"  style="margin-left:1vh;text-align:center"> ' + timer(json['posts'][i]['endauctionDate'], json['posts'][i]['id'], json['posts'][i]['server_time']) + '</p>' +

                     '   <div>' +
                     '   <div class ="length-p">' +

                     ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                     ' </div>' +

                     ' <span style="text-align:center; display:block">  ' + json['posts'][i]['startingbidprice'] + ' KWZ</span>' +


                     ' </div>' +
                     //  ' <p class="pSwiper">'+if_lang( json['posts'][i]['title'] ,json['posts'][i]['sectitle'] )+'<br> <span> '+json['posts'][i]['startingbidprice']+' KWZ</span></p>'+


                     '   </div>' +
                     ' </div> ');
                  mySwiper.update();
               }
               else {
                  // mySwiper[mySwiper.length -1].removeAllSlides() 

                  mySwiper[mySwiper.length - 1].addSlide(i, '  <div class="swiper-slide"  style="width:17vh; ">' +
                     ' <div>' +
                     '<div class="Height-width" > ' +
                     ' <div class="divImgSwiper">' +

                     '  <img  onclick="getAuctionProduct(' + json['posts'][i]['id'] + ',' + "'" + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + "'" + ')" class="imageSwiper" src="' + json['posts'][i]['thumb'] + '"  style=" ">' +
                     '   </div>' +
                     '   </div>' +
                     '   </div>' +
                     '  <div>' +
                     '     <p class="pRed timer_' + json['posts'][i]['id'] + '"  style="margin-left:1vh;text-align:center"> ' + timer(json['posts'][i]['endauctionDate'], json['posts'][i]['id'], json['posts'][i]['server_time']) + '</p>' +

                     '   <div>' +
                     '   <div class ="length-p">' +

                     ' <p class="pSwiper">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</p>' +
                     ' </div>' +

                     ' <span style="text-align:center; display:block">  ' + json['posts'][i]['startingbidprice'] + ' KWZ</span>' +


                     ' </div>' +
                     //  ' <p class="pSwiper">'+if_lang( json['posts'][i]['title'] ,json['posts'][i]['sectitle'] )+'<br> <span> '+json['posts'][i]['startingbidprice']+' KWZ</span></p>'+


                     '   </div>' +
                     ' </div> ');
                  mySwiper[mySwiper.length - 1].update();
               }


            }

         }
         else {
            $('.RecomendedForYOU').hide()
         }
      }
   });


}

function contact() {
   var email = $('.EmailC').val()
   var name = $('.NameC').val()
   var sub = $('.SubjectC').val()
   var msg = $('.MsgC').val()
   //console.log(name)
   //console.log('email --- > '+ email) 
   //console.log('sub --- > '+ sub) 
   //console.log('msg --- > '+ msg) 


   if (name == '') {
      // alert(if_lang('please enter your name', 'please enter your name'))
      alert('please enter your name')
   }
   else {



      if (email == '') {
         // alert(if_lang('please enter your email','please enter your email'))
         alert('please enter your email')
      }
      else {

         if (sub == '') {
            // alert(if_lang('please enter your subject','please enter your subject'))
            alert('please enter your subject')
         }
         else {

            if (msg == '') {
               // alert(if_lang('please enter your message','please enter your message'))
               alert('please enter your message')
            }
            else {
               $.ajax({
                  type: 'POST',
                  url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=contactus&format=json&name=" + name + "&email=" + email + "&subject=" + sub + "&message=" + msg + "",

                  success: function (json) {
                     //console.log(json)
                     alert('your message send sucssefully ')
                     location.reload()

                  }
               });

            }
         }
      }
   }
}

function increaseProduct(id, max) {
   var incQty = $('.valCardPros_' + id).val()
   if (incQty < max) {
      var quantity = parseInt(incQty) + 1


      $('.valCardPros_' + id).val(quantity)
   }
}


function decreaseProduct(id, val) {
   var decQuantiy = $('.valCardPros_' + id).val()
   decQuantiy = parseInt(decQuantiy)
   if (decQuantiy > val) {
      var quantity = parseInt(decQuantiy) - 1
      $('.valCardPros_' + id).val(quantity)

   }

}

var navigationFlag = 0
var beforeNavigationFlag = 0
var soldFlag = 0
var FlagSwipClosed = 0
function setNavigationFlag(id) {
   navigationFlag = id
}
function setbeforeNavigationFlag(id) {
   navigationFlag = id
}

function setSoldFlag(id) {
   soldFlag = id
}


function getMyCard() {
   // console.log('im get my card')
   $.ajax({
      type: 'GET',
      url: "   https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getCart&customer_id=" + localStorage.buitandaUserID + "&format=json",

      cache: false,
      success: function (json) {

         if (json['posts'] != undefined) {
            if (json['posts'][0] != 0) {
               // console.log(json)
               var li = ''
               var nameProduct;
               var total = 0;
               var totalAll = 0;
               li = li + ' <tr>' +
                  '   <th class="text-align-center"   width="15%">' + if_lang('Product', 'Produtos') + '</th>' +
                  ' <th class="text-align-center" width="20%">' + if_lang('Price ', 'Preço  ') + '</th>' +
                  ' <th class="text-align-center"  width="15%">  ' + if_lang('Qty ', 'Qty') + '</th>' +
                  ' <th class="text-align-center" width="10%"> </th>' +
                  ' <th class="text-align-center" width="30%">  ' + if_lang('Total ', 'Total') + '</th>' +
                  '      </tr>'
               //console.log(json['posts'].length)
               if (json['posts']['0'] != 0) {
                  for (var i = 0; i < json['posts'].length; i++) {


                     total = parseFloat(json['posts'][i]['deal_info']['current2']) * parseInt(json['posts'][i]['qty'])
                     totalAll = totalAll + parseFloat(json['posts'][i]['deal_info']['current2']) * parseInt(json['posts'][i]['qty'])
                     var nf = Intl.NumberFormat('fr');
                     // console.log(nf.format(total)); // 42,000,000 in many locales
                     total = nf.format(total)

                     nameProduct = if_lang(json['posts'][i]['deal_info']['title'].split(" ")[0], json['posts'][i]['deal_info']['sectitle'].split(" ")[0])
                     li = li + ' <tr style="font-size: 8px;">' +

                        '  <td class="ItemOrder" width="15%">' +
                        '   <img src="' + json['posts'][i]['deal_info']['thumb'] + '" style="width:  10vh" >' +
                        ' <p style="text-align: center;">' + nameProduct + '.. </p>' +

                        '   </td>' +


                        '   <td class="text-align-center  QtyOrder"  width="20%">' +
                        '      <p>' + json['posts'][i]['deal_info']['current'] + ' KWZ	</p>' +
                        '  </td>' +


                        '   <td class="text-align-center subTotal_Delviery"  width="15%">' +

                        '   <div class="row" style="width:12vh">' +

                        '    <div class="col-30" style="  text-align: end;" onclick="decreaseQty(' + json['posts'][i]['deal_info']['id'] + ',' + json['posts'][i]['deal_info']['miniumquantity'] + ',' + json['posts'][i]['deal_info']['current2'] + ')"> <i class="material-icons" style="font-size: 15px;">remove</i> </div>' +
                        '   <div class="col-40">' +
                        '   <input type="number" class="valCardPro_' + json['posts'][i]['deal_info']['id'] + '" readonly="" id="valCardPro_' + json['posts'][i]['deal_info']['id'] + '" value="' + json['posts'][i]['qty'] + '" style="  text-align: center; width:-webkit-fill-available "> </div>' +
                        '  <div class="col-30" onclick="increaseQTy(' + json['posts'][i]['deal_info']['id'] + ',' + json['posts'][i]['deal_info']['availumquantity'] + ',' + json['posts'][i]['deal_info']['current2'] + ')" > <i class="material-icons"style="font-size: 15px;" >add</i> </div>' +
                        ' </div>' +
                        '   </td>' +

                        '<td class="text-align-center subTotal_Delviery" width="10%">' +
                        ' <img src="img/delete.svg"  onclick="deleteProduct(' + json['posts'][i]['deal_info']['id'] + ')" style="width:  3vh" >' +

                        '   </td>' +


                        '   <td class="text-align-center subTotal_Delviery"  width="35%">' +
                        '   <p class="totalProduct' + json['posts'][i]['deal_info']['id'] + '">' + total + ' KWZ	</p>' +

                        '   </td>' +

                        '  </tr>'
                  }
               }
               $('.DataItem').html(li)
               var nf = Intl.NumberFormat('fr');
               totalAll = nf.format(totalAll)
               $('.TotalA').html(totalAll + ' KWZ')
               // console.log('i ---- >'+i)
               if (i > 0) {
                  $('.cart_counter').css('display', 'block')
                  $('.cart_counter').html(i)
                  $("#nextCheckout").removeAttr("disabled");
                  $("#nextCheckout").css("background", '#32c2ff');


               }
               else {
                  console.log('in else getCard')
                  $('.cart_counter').css('display', 'none')
                  $("#nextCheckout").attr("disabled", true);
                  $("#nextCheckout").css("background", 'gray');



               }
            }
            else {
               $('.cart_counter').css('display', 'none')
               $("#nextCheckout").attr("disabled", true);
               $("#nextCheckout").css("background", 'gray');
               $('.AllCheckout').html('<h2 style="color:red ; text-align:center">' + if_lang(' No items in the cart ', 'Não há itens no carrinho') + ' </h2>')
            }
         }

      }
   });


}



function addToCard(id, avilable) {
   if (Checklogin()) {
      var qty = $('.valCardPros_' + id).val()
      qty = parseInt(qty)
      console.log(qty)
      if (avilable > 0) {
         if (qty > 0) {
            $.ajax({
               type: 'GET',
               url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=addToCart&customer_id=" + localStorage.buitandaUserID + "&product_id=" + id + "&qty=" + qty + "&format=json",


               success: function (json) {
                  console.log(json)
                  //console.log( localStorage.buitandaUserID + '    ' + id + '     '+qty)
                  alert(if_lang('your product added successfully ', 'your product added successfully '))
                  getMyCard()
               }
            });
         }
         else {
            alert(if_lang('you Can not add 0 product in cart ', 'Você não pode adicionar 0 produto no carrinho'))
         }
      }
      else {
         alert(if_lang('sorry , available quantity is 0 ', 'desculpe, a quantidade disponível é 0'))
      }

   }
   else {
      alert(if_lang('please login first', 'faça o login primeiro'))
      go_to_page("Login")
   }
}


function deleteProduct(id) {

   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=deleteFromCart&customer_id=" + localStorage.buitandaUserID + "&product_id=" + id + "&format=json",

      success: function (json) {
         //console.log(json)

         getMyCard()
      }
   })

}

function decreaseQty(id, minQty, current) {
   GetShipping()

   var qty = parseInt($('.valCardPro_' + id).val())
   var total = 0
   if (qty > minQty) {
      qty = qty - 1
      total = qty * parseFloat(current)
      var OldQty = parseInt($('.valCardPro_' + id).val())
      var Rest = (OldQty - qty) * parseFloat(current)
      var AllTotal = $('.TotalA').html()
      var nf = Intl.NumberFormat('fr');
      
      var tot = ''
      for (i = 0; i < AllTotal.length; i++) {
         if (AllTotal[i] != '') {
            console.log('if')
            tot = tot + AllTotal[i]
         }
      }
      tot = AllTotal.replace(/\s/g, '')
      tot = tot.replace('KWZ', '')
      console.log(tot)
      console.log('parseFloat(tot) --- > ' + parseFloat(tot))
      console.log('Rest  --- > ' + Rest)
      var inte = parseFloat(tot) - Rest
      console.log('parseFloat(tot) - Rest  --- > ' + inte)
      inte = nf.format(inte);
      total = nf.format(total)

      $.ajax({
         type: 'GET',

         url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=updateCart&customer_id=" + localStorage.buitandaUserID + " &product_id=" + id + "&qty=" + qty + "&format=json",


         success: function (json) {
            //console.log(json)
            $('.valCardPro_' + id).val(qty)

            $('.totalProduct' + id).html(total + ' KWZ')

            $('.TotalA').html(inte + ' KWZ ')
            constantTotal =  inte + ' KWZ '
            GetShipping()
         }
      })
   }
}


function increaseQTy(id, max, current) {
   console.log('in increase')
   var OldQty = parseInt($('.valCardPro_' + id).val())
   var total = 0
   console.log(OldQty + '   <   ' + max)
   if (OldQty < max) {

      var qty = OldQty + 1

      total = qty * parseFloat(current)
      var Rest = (qty - OldQty) * parseFloat(current)
      var AllTotal = $('.TotalA').html()
      // 
      var nf = Intl.NumberFormat('fr');
      var tot = ''
      for (i = 0; i < AllTotal.length; i++) {
         if (AllTotal[i] != '') {

            tot = tot + AllTotal[i]
         }
      }

      console.log(tot)
      tot = AllTotal.replace(/\s/g, '')
      tot = tot.replace('KWZ', '')
      //  console.log


      var inte = parseFloat(tot) + Rest
      inte = nf.format(inte);
      total = nf.format(total)
      console.log('qty ---- > ' + qty)
      $('.valCardPro_' + id).val(qty)

      $.ajax({
         type: 'GET',

         url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=updateCart&customer_id=" + localStorage.buitandaUserID + " &product_id=" + id + "&qty=" + qty + "&format=json",


         success: function (json) {
            console.log(json)
            console.log('old --- > ' + OldQty)
            console.log('new --- > ' + qty)
            console.log('valCardPro_' + id)

            //console.log(json)
            qty = parseInt(qty)
            // $('.valCardPro_'+id).val(qty)
            $('.totalProduct' + id).html(total + ' KWZ')

            $('.TotalA').html(inte + ' KWZ ')
            constantTotal =  inte + ' KWZ '
            GetShipping()

         }
      })
   }

}


function editShop() {
   var li = '<p style="font-weight: bolder; margin: 1vh 0vh 0vh 2vh; padding-top: 1vh;" id="nameShop">' +
      '</p>' +





      '<div class="list no-hairlines-md" style="margin:2vh 2vh 0vh  0vh;">' +
      '<ul  >' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">' + if_lang('phone', 'telefone') + '</div>' +
      '<div class="item-input-wrap">' +
      '<input id="phoneShop"  type="number" placeholder="' + if_lang('phone', 'telefone') + '" name="name">' +
      '<span class="input-clear-button">' +

      '</span>' +
      '</div>' +
      '</div>' +
      '</li>' +

      '</ul>' +


      '</div>' +


      '<div class="list " style="margin:2vh 2vh 0vh  0vh;">' +
      '<ul  >' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">' + if_lang('Address', 'Endereço') + '</div>' +
      '<div class="item-input-wrap">' +
      '<input id="AddressShop"  type="text" placeholder="' + if_lang('Address', 'Endereço') + '" name="name">' +
      '<span class="input-clear-button">' +

      '</span>' +
      '</div>' +
      '</div>' +
      '</li>' +

      '</ul>' +


      '</div>' +

      '<div class="list " style="margin:2vh 2vh 0vh  0vh;">' +
      '<ul  >' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">' + if_lang('Note', 'Notas') + '</div>' +
      '<div class="item-input-wrap">' +
      '<input id="noteShop"  type="text" placeholder="' + if_lang('Note', 'Notas') + '" name="name">' +
      '<span class="input-clear-button">' +

      '</span>' +
      '</div>' +
      '</div>' +
      '</li>' +

      '</ul>' +


      '</div>'
   $('#EditDiv').html(li)
   getProfile()

}

var arrOrder
var phoneOrder
var AddressOrder
var DeliveryType
var constantTotal
function getOrderArr() {
constantTotal =   $('.TotalA').html()

   go_to_page('ProfileShop')
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getCart&customer_id=" + localStorage.buitandaUserID + "&format=json",


      success: function (json) {
         arrOrder = []
         var x
         for (var i = 0; i < json['posts'].length; i++) {
            x = {
               id: json['posts'][i]['deal_info']['id'],
               qty: json['posts'][i]['qty']
            }
            arrOrder.push(x)
         }

         //console.log(arrOrder)
      }
   })
}
var notesORder
function getPersonalDataOrder() {
   notesORder = $('#noteShop').val()

   if ($('#phoneShop').html() != undefined && $('#phoneShop').html() != '') {
      //console.log('in if')
      //console.log($('#phoneShop').html())

      phoneOrder = $('#phoneShop').html()
      AddressOrder = $('#AddressShop').html()

   }
   else if ($('#phoneShop').val() != undefined && $('#phoneShop').val() != '') {
      //console.log('in else')

      phoneOrder = $('#phoneShop').val()
      AddressOrder = $('#AddressShop').val()


   }

   if (phoneOrder == '' || phoneOrder == ' ' || phoneOrder == undefined) {
      alert(if_lang('Please enter phone number ', 'Digite o número de telefone'))

   }
   else {
      console.log('addr --- >' + AddressOrder)
      if (AddressOrder == ' ' || AddressOrder == '' || AddressOrder == undefined) {
         alert(if_lang('Please enter Address  ', 'Digite o ENDEREÇO'))

      }
      else {
         console.log(AddressOrder + '     ' + phoneOrder)
         // go_to_page('Delivery')
          GetShipping()
         go_to_page('SubmitOrder')

      }

   }
   //console.log($('#phoneShop').val())

   //console.log(AddressOrder + '       ' +phoneOrder)
}

function getDeleiveryType() {
  
   go_to_page('SubmitOrder')
   DeliveryType = $("input[name='my-radio']:checked").val();
   //console.log(DeliveryType)
}

function SubmitOrder() {
   showIndicator()

   console.log(arrOrder)
   var paymen_type = $("input[name='my-radio']:checked").val();

   arrOrder = encodeURIComponent(JSON.stringify(arrOrder));
   console.log(arrOrder)

   var url = "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=addOrder&products=" + arrOrder + "&customer_id=" + localStorage.buitandaUserID +
      "&delivery_status=pending&payment_status=pending&phone=" + phoneOrder + "&address=" + AddressOrder +
      "&delivery_type=Delivery" + "&notes=" + notesORder + "&payment_type=" + paymen_type + "&format=json"
   $.ajax({
      type: 'POST',
      url: url,
      // processData: false,
      // contentType: false,
      // cache: false,
      // dataType: "json",
      // data : {products : arrOrder,
      //          customer_id : localStorage.buitandaUserID,
      //          delivery_status : 'pending',
      //          payment_status : 'pending',
      //          phone : phoneOrder , 
      //          address : AddressOrder , 
      //          delivery_type : 'Delivery' ,
      //          notes : notesORder ,
      //          payment_type : paymen_type
      // },
      success: function (json) {
         //console.log(url)
          
         // console.log(json)
         alert_Reload(if_lang('Order saved successfully', 'Pedido salvo com sucesso'))
         // alert()
      }
   })
 }


function getInstructions() {

   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getPage&page_id=63&format=json",


      success: function (json) {
         console.log(json)
         var desc = json['posts'][0]['description'].split("src='")
         desc = desc[0] + "src='https://host.optimalsolutionslebanon.com/~buitandatest" + desc[1]
         desc = desc.split("width")
         desc = desc[0] + "width:100% ;text-align:" + desc[1]

         var descAr = json['posts'][0]['ardescription'].split("src='")
         descAr = descAr[0] + "src='https://host.optimalsolutionslebanon.com/~buitandatest" + descAr[1]
         descAr = descAr.split("width")
         // console.log(descAr[0])
         // console.log(descAr[1])

         descAr = descAr[0] + "width:100% ;text-align:'" + descAr[1]
         $('.instructionsTitle').html(if_lang(json['posts'][0]['name'], json['posts'][0]['arname']))
         // console.log(descAr[0])
         // console.log(descAr[1])

         console.log(if_lang(desc, descAr))
         // $('.instructionName').html(if_lang(json['posts'][0]['name'] ,json['posts'][0]['arname']  ))
         $('.instruction').html(if_lang(desc, descAr))

         //console.log(json)
      }
   })
}
function SubmitRefOrder() {
   //console.log(localStorage.BuitLang)
   alert(if_lang('Comming Soon ', 'Comming Soon'))
}

function goToCheckout() {
   if (Checklogin()) {
      go_to_page('CheckOutFirst')
   }
   else {
      alert(if_lang('please login first', 'faça o login primeiro'))
      go_to_page("Login")
   }
}


function getOrders() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getMyOrders&customer_id=" + localStorage.buitandaUserID + "&format=json",


      success: function (json) {
         console.log(json)
         if (json['posts'][0] != 0) {
            var li = ''
            var nf = Intl.NumberFormat('fr');
            var totalAll
            for (var i = 0; i < json['posts'].length; i++) {

               totalAll = new Intl.NumberFormat('fr').format(json['posts'][i]['total'])

               li = '<li onclick="getMyOrder(' + json['posts'][i]['id'] + ')" >' +
                  // li = '<li >' +

                  ' <a href="" class="item-link item-content" style="">' +
                  ' <div class="item-inner">' +
                  '<div class="row">' +
                  '<div class="item-title">' + if_lang('Order ', 'Encomenda ') + ' #' + json['posts'][i]['id'] + '</div>' +
                  '  <div class="item-after inv-amount">' + json['posts'][i]['total'] + ' KWZ</div>' +
                  ' </div>' +
                  '   <div class="item-subtitle m-t-5"><span class="inv-client text-green">' + json['posts'][i]['delivery_status'] + '</span>';
               if (json['posts'][i]['payment_status'] != "Pending" && json['posts'][i]['payment_status'] != "pending" && json['posts'][i]['payment_status'] != "Cancelled" && json['posts'][i]['payment_status'] != "cancelled") {
                  //   console.log(i + ' --- > '+ json['posts'][i]['payment_status'] )
                  li = li + '<span class="badge color-green inv-badge fl-right">' + json['posts'][i]['payment_status'] + '</span></div>'
               } else if (json['posts'][i]['payment_status'] != "Cancelled" && json['posts'][i]['payment_status'] != "cancelled") {
                  li = li + '</span> <span class="badge  inv-badge fl-right" style="background:orange">' + json['posts'][i]['payment_status'] + '</span></div>'

               }
               else {
                  li = li + '</span> <span class="badge red-color inv-badge fl-right">' + json['posts'][i]['payment_status'] + '</span></div>'

               }
               li = li + '   <div class="item-subtitle m-t-5"><span class="inv-client">' + json['posts'][i]['datetime'] + '</span>' +
                  '<span class=" inv-badge fl-right">' + json['posts'][i]['paymentType'] + '</span></div> ' +
                  '   <div class="item-subtitle m-t-5">' +
                  '<span class="inv-client text-green">';
               //   for(x=0 ; x < json['posts'][i]['products'].length ;x++ ){
               //  li = li  +   if_lang(  json['posts'][i]['products'][x]['product_name'] ,json['posts'][i]['products'][x]['sec_product_name'])  +',';
               // }
               li = li + + '</span>' + '  </div>' +
                  '</a>' +

                  ' </li>' +
                  $('.OrderList').append(li)
            }



         }
         else {

            $('.OrderList').append('<p style="text-align:center">' + if_lang('no orders data ', 'dados de pedidos') + '</p>')
         }
         //console.log(json)



      }
   })
}


function getMyAuction() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=user_auctions&customerId=" + localStorage.buitandaUserID + "&format=json",


      success: function (json) {
         console.log(json)
         if (json['posts'][0] != 0) {
            var li = ''
            var nf = Intl.NumberFormat('fr');
            var totalAll
            var Remaining_time;
            for (var i = 0; i < json['posts'].length; i++) {
               Remaining_time = get_timeDifference(json['posts'][i]['endauctionDate'])
               // totalAll = new Intl.NumberFormat('fr').format(json['posts'][i]['total'])

               li = '<li onclick="go_to_page_two_params(' + "'" + 'Auction' + "'" + ',' + json['posts'][i]['id'] + ')" >' +
                  // li = '<li >' +

                  ' <a href="" class="item-link item-content" style="">' +
                  ' <div class="item-inner">' +
                  '<div class="row">' +
                  '<div class="item-title">' + if_lang(json['posts'][i]['title'], json['posts'][i]['sectitle']) + '</div>' +
                  // '  <div class="item-after inv-amount">' + json['posts'][i]['total'] + ' KWZ</div>' +
                  ' </div>' +
                  '   <div class="item-subtitle m-t-5"><span class="inv-client text-green">' + Remaining_time + '</span>';
               if (json['posts'][i]['winner_id'] != 0 && json['posts'][i]['winner_id'] != localStorage.buitandaUserID) {
                  //   console.log(i + ' --- > '+ json['posts'][i]['payment_status'] )
                  li = li + '<span class="badge red-color   inv-badge fl-right">' + if_lang('lost ', 'perder') + '</span></div>'
               } else if (json['posts'][i]['winner_id'] == 0) {
                  li = li + '</span> <span class="badge  inv-badge fl-right" style="background:orange">' + if_lang('Running', 'Corrida') + '</span></div>'

               }
               else if (json['posts'][i]['winner_id'] == localStorage.buitandaUserID) {
                  li = li + '</span> <span class="badge color-green inv-badge fl-right">' + if_lang('Running', 'ganhar') + '</span></div>'

               }
               li = li +
                  '   <div class="item-subtitle m-t-5">' +
                  '<span class="inv-client text-green">';
               //   for(x=0 ; x < json['posts'][i]['products'].length ;x++ ){
               //  li = li  +   if_lang(  json['posts'][i]['products'][x]['product_name'] ,json['posts'][i]['products'][x]['sec_product_name'])  +',';
               // }
               li = li + + '</span>' + '  </div>' +
                  '</a>' +

                  ' </li>' +
                  $('.AuctionList').append(li)
            }



         }
         else {

            $('.AuctionList').append('<p style="text-align:center">' + if_lang('no data Auction for you ', 'sem dados Leilão para você') + '</p>')
         }
         //console.log(json)



      }
   })
}


function getMyOrder(id) {

   go_to_page('MyOrder')
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getMyOrders&customer_id=" + localStorage.buitandaUserID + "&format=json",


      success: function (json) {
         console.log(json)
         $('.MyOrderTitle').html(if_lang('Order Details', 'detalhes do pedido'))
         if (json[0] != 0) {
            var li


            for (var i = 0; i < json['posts'].length; i++) {
               if (json['posts'][i]['id'] == id) {
                  constantTotal=json['posts'][i]['total']

                  li = '<div class="block block-strong inv-section">' +
                     '  <div class="inv-logo">' +
                     '    <h2 id="orderTitle">' + if_lang('Order ', 'Encomenda ') + '# ' + json['posts'][i]['id'] + '  </h2>' +
                     ' </div>' +
                     '  <div class="row">' +
                     ' <div class="col-50">' +


                     '  <div class="invoice-details">' +
                     ' <ul>' +
                     ' <li>' +
                     '   <h5>' + if_lang('Shipped to', 'Enviado para') + ' <span class="dateOrder">' + json['posts'][i]['address'] + '</span></h5></li>' +
                     '    <li>' +
                     '  <h5>' + if_lang('phone ', 'telefone	') + ' <span class="CompleteOrder">' + json['posts'][i]['phone'] + '</span></h5></li>' +
                     ' <li>' +
                     '   <h5>' + if_lang('Note', 'Note') + ' <span class="dateOrder">' + json['posts'][i]['notes'] + '</span></h5></li>' +
                     ' </ul>' +
                     '   </div>' +
                     '  </div>' +
                     ' <div class="col-50">' +
                     '  <div class="invoice-details">' +
                     ' <ul>' +
                     ' <li>' +
                     '   <h5>' + if_lang('Order Date', 'Data hora') + ' <span class="dateOrder">' + json['posts'][i]['datetime'] + '</span></h5></li>' +
                     '   <li>' +
                     '<h5>' + if_lang('Payment Status', 'Estado de pagamento	') + '<span class="paidOrder">' + json['posts'][i]['payment_status'] + '</span></h5></li>' +
                     '  <li>' +
                     '  <h5>' + if_lang('Delivery  Status', 'Estado de entrega	') + ' <span class="CompleteOrder">' + json['posts'][i]['delivery_status'] + '</span></h5></li>' +
                     ' <li>' +
                     '   <h5>' + if_lang('payment type', 'tipo de pagamento   ') + ' <span class="dateOrder">' + json['posts'][i]['paymentType'] + '</span></h5></li>' +

                     ' </ul>' +
                     '   </div>' +
                     '      </div>' +
                     '    </div>';
                  for (x = 0; x < json['posts'][i]['products'].length; x++) {
                     if (x == 0) {
                        li = li + '  <table class="inv-table" style="width:100%">' +
                           '  <tbody  class="">' +
                           '<tr>' +
                           '  <th class="text-align-left">  ' + if_lang('Product', 'Produtos') + '</th>' +
                           ' <th class="text-align-center"> ' + if_lang('Price ', 'Preço  ') + '</th>' +
                           ' <th class="text-align-center">Qty</th>' +
                           ' <th class="text-align-center">Total</th>' +
                           '  </tr>';
                     }

                     var total = parseFloat(json['posts'][i]['products'][x]['qty']) * parseFloat(json['posts'][i]['products'][x]['unit_price'])
                     total = new Intl.NumberFormat('fr').format(total)
                     var quantity = new Intl.NumberFormat('fr').format(parseFloat(json['posts'][i]['products'][x]['qty']))
                     var unit_price = new Intl.NumberFormat('fr').format(parseFloat(json['posts'][i]['products'][x]['unit_price']))

                     li = li + ' <tr>' +
                        '<td class="ItemOrder">' +
                        if_lang(json['posts'][i]['products'][x]['product_name'], json['posts'][i]['products'][x]['sec_product_name']) +
                        '  </td>' +
                        '    <td class="text-align-center PriceOrder">' + unit_price + ' KWZ</td>' +
                        '  <td class="text-align-center  QtyOrder">' + quantity + '</td>' +
                        '  <td class="text-align-center subTotal_Delviery">' + total + ' KWZ</td>' +
                        ' </tr>'



                  }
                  li = li + '    </tbody>' +
                     '  <tfoot>' +
                     '   <tr>' +
                     '   <td colspan="1"><b>' + if_lang('Total', 'Total') + ':</b></td>' +
                     ' <td colspan="4" >' + json['posts'][i]['total'] + ' KWZ</td>' +
                     ' </tr>' +

                     '   <tr>' +
                     '   <td colspan="1"><b>' + if_lang('Total shipping ', ' ENTREGA	') + ':</b></td>' +
                     ' <td colspan="4" class="TotalShippingA">' +   '  </td>' +
                     ' </tr>' +

                     '   <tr>' +
                     '   <td colspan="1"><b>' + if_lang('Total', 'Total') + ':</b></td>' +
                     ' <td colspan="4" class="TotalWithShippingg">' +   '  </td>' +
                     ' </tr>' +
                     ' </tfoot>' +

                     '  </table>' +

                     '  </div>'

               }
            }
   
            $('.allContent').html(li)

            GetShipping()


         }
         else {

         }
         //console.log(json)
      }
   })
}




function callNum() {
   var num = $('.PhoneNumbContact').html()
   console.log(num)
   if (num) {
      window.plugins.CallNumber.callNumber(onSuccess222, onError222, num, true);
   } else {
      // ons.notification.alert('')
   }
   function onSuccess222(result) {
      console.log("Success:" + result);
   }

   function onError222(result) {
      console.log("Error:" + result);
   }

}



function SubmitAuction(idPro, title) {
   if (Checklogin()) {
      var data = $("input[name='my-radioBid']:checked").val();

      $.ajax({
         type: 'POST',
         url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=submit_bid&prod_id=" + idPro + "&customer_id=" + localStorage.buitandaUserID + "&bid_price=" + data + "&format=json",


         success: function (json) {
            if (json['posts'][0] != -1) {
               console.log("https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=submit_bid&prod_id=" + idPro + "&customer_id=" + localStorage.buitandaUserID + "&bid_price=" + data + "&format=json")

               console.log(json)
               alert(if_lang('bid added successfully', 'lance adicionado com sucesso'))

            }
            else {
               alert(if_lang('You cant bid again', 'Você não pode fazer lances novamente'))
            }
         }


      });

   }
   else {
      alert(if_lang('please login first', 'faça o login primeiro'))
      go_to_page("Login")
   }
   setTimeout(function () {
      getAuctionProduct(idPro, title)
   }, 3000);
   getAuctionProduct(idPro, title)

}

function SearchISIN(idPro, title) {
   showIndicator()
   var text = $('.SearchHome').val()
   console.log(text)
   console.log(typeof (text))

   view.router.navigate({
      name: 'Search',
      params: {
         searchName: text
      }
   });

   



}




function SearchISINCat(idPro, title) {
   showIndicator()
   var text = $('.SearchCate').val()
   console.log(text)
   console.log(typeof (text))

   view.router.navigate({
      name: 'Search',
      params: {
         searchName: text
      }
   });




}

function showClosedDeal(id, curr, qty, name) {

   app.popup.create({
      content: '<div class="popup" style=" overflow-y:scroll">' +
         '<div style="text-align:end; margin:1vh">' +
         '<img class="popup-close"  src="img/close.svg">' +
         '</div>' +
         '<div class="page-content grey-bk" style="height: 90%; overflow:initial">' +
         '<div class="block-title medium-title">' + '<img  src="' + id + '">' + '<img src="img/sold.png" class="top-left-popup">' + '</div>' +
         '<div> <p class="popupText">  ' + name + ' </p> </div>' +
         //  '<div> <p class="popupText"> SOLD FOR : '+curr+'KWZ</p> </div>'+
         '<div> <p class="popupText"> QUANTITY : ' + qty + ' </p> </div>' +

         //  '<div class="block block-strong">' + if_lang(json['posts'][0].description, json['posts'][0].ardescription) + '</div>' +
         '</div>' +
         '</div>',
   }).open();
}



function updateApplication() {
   if (Framework7.device.ios) {
      // var link = 'https://apps.apple.com/us/app/ebda-tutor/id1451954033?ls=1';
      cordova.InAppBrowser.open('https://play.google.com/store/apps/details?id=com.optimalsolutions.Buitandagit&hl=en', '_system', 'location=yes');
      /*window.cordova.InAppBrowser.open(
          link,
          "_blank",
          "hidden=no,location=yes,hideurlbar=yes,closebuttoncaption='Done',clearsessioncache=yes,clearcache=yes"
      );*/
   }

   if (device.platform.toLowerCase() == "android") {
      // var link = 'https://play.google.com/store/apps/details?id=com.optimalsolutions.ebdaatutor';
      cordova.InAppBrowser.open('https://apps.apple.com/ai/app/buitanda/id1500280115', '_system', 'location=yes');
      /*window.cordova.InAppBrowser.open(
          link,
          "_blank",
          "hidden=no,location=yes,hideurlbar=yes,closebuttoncaption='Done',clearsessioncache=yes,clearcache=yes"
      );*/
   }
}




$("input").bind("click", function () {
   var textBox = document.activeElement.id;
   document.getElementById(textBox).scrollIntoView();
});


function ToolbarCategory() {
   console.log('in cat bar cat')
   // $('#tab2').css('color','#32c2ff')
   $('.catpic').attr('src', 'img/Categories Blue.svg')
   $('.HomePic').attr('src', 'img/Home gray.svg')
   $('.AuctionPic').attr('src', 'img/Auction gray.svg')
   $('.ProfilePic').attr('src', 'img/login gray.svg')

}


function ToolbarAuction() {
   // $('#tab2').css('color','#32c2ff')
   $('.catpic').attr('src', 'img/Categories gray.svg')
   $('.HomePic').attr('src', 'img/Home gray.svg')
   $('.AuctionPic').attr('src', 'img/Auction blue.svg')
   $('.ProfilePic').attr('src', 'img/login gray.svg')

}


function ToolbarHome() {
   // $('#tab2').css('color','#32c2ff')
   $('.catpic').attr('src', 'img/Categories gray.svg')
   $('.HomePic').attr('src', 'img/Home blue.svg')
   $('.AuctionPic').attr('src', 'img/Auction gray.svg')
   $('.ProfilePic').attr('src', 'img/login gray.svg')

}

function ToolbarProfile() {
   // $('#tab2').css('color','#32c2ff')
   $('.catpic').attr('src', 'img/Categories gray.svg')
   $('.HomePic').attr('src', 'img/Home gray.svg')
   $('.AuctionPic').attr('src', 'img/Auction gray.svg')
   $('.ProfilePic').attr('src', 'img/login blue.svg')

}



function get_timeDifference(strtdatetime) {
   var datetime = new Date(strtdatetime).getTime();
   var now = new Date().getTime();

   if (isNaN(datetime)) {
      return "";
   }

   //console.log(datetime + " " + now);

   if (datetime < now) {
      return 'Expired';
   } else {
      var milisec_diff = datetime - now;

      var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

      var date_diff = new Date(milisec_diff);





      var msec = milisec_diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      var ss = Math.floor(msec / 1000);
      msec -= ss * 1000


      var daylabel = "";
      if (days > 0) {
         var grammar = " ";
         if (days > 1) grammar = "s "
         var hrreset = days * 24;
         hh = hh - hrreset;
         daylabel = days   + grammar;
      }


      //  Format Hours
      var hourtext = '00';
      hourtext = String(hh);
      if (hourtext.length == 1) { hourtext = '0' + hourtext };

      //  Format Minutes
      var mintext = '00';
      mintext = String(mm);
      if (mintext.length == 1) { mintext = '0' + mintext };

      //  Format Seconds
      var sectext = '00';
      sectext = String(ss);
      if (sectext.length == 1) { sectext = '0' + sectext };

      var msectext = '00';
      msectext = String(msec);
      msectext = msectext.substring(0, 1);
      if (msectext.length == 1) { msectext = '0' + msectext };
      // console.log(daylabel + hourtext + ":" + mintext + ":" + sectext + ":" + msectext)
      return daylabel + ' Day ' + hourtext + " h " + mintext + " m " + sectext + ' sec ';
   }
}


function get_timeDifference_Days(strtdatetime) {
   var datetime = new Date(strtdatetime).getTime();
   var now = new Date().getTime();

   if (isNaN(datetime)) {
      return "";
   }

   //console.log(datetime + " " + now);

   if (datetime < now) {
      return 'Expired';
   } else {
      var milisec_diff = datetime - now;

      var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

      var date_diff = new Date(milisec_diff);





      var msec = milisec_diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      var ss = Math.floor(msec / 1000);
      msec -= ss * 1000


      var daylabel = "";
      if (days > 0) {
         var grammar = " ";
         if (days > 1) 
         var hrreset = days * 24;
         hh = hh - hrreset;
         daylabel = days + grammar;
      }
      else{
         daylabel = 0
      }


       
      //  Format Hours
      var hourtext = '00';
      hourtext = String(hh);
      if (hourtext.length == 1) { hourtext = '0' + hourtext };

      //  Format Minutes
      var mintext = '00';
      mintext = String(mm);
      if (mintext.length == 1) { mintext = '0' + mintext };

      //  Format Seconds
      var sectext = '00';
      sectext = String(ss);
      if (sectext.length == 1) { sectext = '0' + sectext };

      var msectext = '00';
      msectext = String(msec);
      msectext = msectext.substring(0, 1);
      if (msectext.length == 1) { msectext = '0' + msectext };
      console.log(daylabel)
      // console.log(daylabel + hourtext + ":" + mintext + ":" + sectext + ":" + msectext)
      return daylabel + ' Day ' + hourtext + " h " ;
   }
}
function getPrivacyPolicy() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=privacy&format=json",


      success: function (json) {
         $('.PraivacyPolicyTitle').html(if_lang(json['posts']['0']['name'], json['posts']['0']['arname']))

         $('.PraivacyContnet').html(if_lang(json['posts']['0']['description'], json['posts']['0']['ardescription']))



      }
   })
}


function getTermAndCondition() {
   $.ajax({
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=terms&format=json",


      success: function (json) {
         $('.termAndConditionTitle').html(if_lang(json['posts']['0']['name'], json['posts']['0']['arname']))

         $('.termAndConditionContent').html(if_lang(json['posts']['0']['description'], json['posts']['0']['ardescription']))



      }
   })
}
var shipping 
var totalPlusShiping

function GetShipping (){
   var tot
   console.log(constantTotal)
   for (i = 0; i < constantTotal.length; i++) {
      if (constantTotal[i] != '') {
         console.log('if')
         tot = tot + constantTotal[i]
      }
   }
   tot = constantTotal.replace(/\s/g, '')
   tot = tot.replace('KWZ', '')
   console.log(tot)
   $.ajax({
      async: false,
      type: 'GET',
      url: "https://host.optimalsolutionslebanon.com/~buitandatest/ws.php?type=getShipment&total=" + tot + "&format=json",


      success: function (json) {
         var nf = Intl.NumberFormat('fr');

         console.log('shipping')
            
         console.log(json)
         shipping =nf.format( json['posts']['0']['totalShipping'] )
      
          totalPlusShiping = nf.format(json['posts']['0']['total'])
         console.log(totalPlusShiping)
         if(shipping == 0 ){
            $('.TotalShippingA').html(if_lang('Free Shipping ', ' Entrega Grátis'))
         }
         else{
            $('.TotalShippingA').html(if_lang( shipping +' KWZ', shipping+' KWZ'))
         
         
         }
         $('.TotalWithShippingg').html(totalPlusShiping + ' KWZ') 
      
      }


   });

}
function getProductCategorySorting (){
   app.infiniteScroll.create('.infinite-scroll-content')
   $$('.infinite-scroll-preloader').show()
   console.log($('.Sortprod').val())
   sort = $('.Sortprod').val()
   $('.CatProd').empty()
   start = 0
   end = 8
   getCategoryProduct(CategoryIdSearch)
 }