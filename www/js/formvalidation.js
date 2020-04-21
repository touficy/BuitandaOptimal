var lang = localStorage.getItem("lang");
var return_lang = 'ar';
if (lang != null) {
  // return_lang = lang;
  // console.log("not null");
  if (lang=="en") {
    // console.log("hi english");
    if (!$("link[title=ltr_style]").length) {
      // console.log("true english");
      $("head").append('<link rel="stylesheet" href="packages/core/css/framework7.bundle.min.css" title="ltr_style">');
    }
  }else{
    if (!$("link[title=rtl_style]").length) {
      // console.log("true arabic");
      $("head").append('<link rel="stylesheet" href="packages/core/css/framework7.bundle.rtl.min.css" title="rtl_style">');
    }
  }
} else {
  // console.log("is null");
  // return_lang = 'ar';
  if (!$("link[title=rtl_style]").length) {
    // console.log("is null true arabic");
    $("head").append('<link rel="stylesheet" href="packages/core/css/framework7.bundle.rtl.min.css" title="rtl_style">');
  }
}
function is_valid_url(url)
{
     return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}

function is_number (num) {
	return !isNaN(String(num));
}

function is_name(name) {
  return /^[a-z ,.'-]+$/i.test(name);
}

function is_phone(phone) {
  var phoneRGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return phoneRGEX.test(phone);
}

function is_email(email) {
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    return false;
  }else{
    return true;
  }
}
