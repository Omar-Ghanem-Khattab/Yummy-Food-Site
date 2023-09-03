import { Categories } from "./Categories.js";
import { Ingredient } from "./Ingredient.js";
import { Area } from "./area.js";
import { Contact } from "./contac.js";
import { Home } from "./home.js";
import { Search } from "./search.js";




$(function () {  
  const search = document.getElementById('Search');
  const SearchSection = document.getElementById('search');
const categories = document.getElementById('Categories');
const Category = document.getElementById('Category');
const area = document.getElementById('Area');
const areaSection = document.getElementById('area');
const ingredients = document.getElementById('Ingredients');
const ingredient = document.getElementById('ingredient');
const contact = document.getElementById('Contact');
const contactSection = document.getElementById('contactSection');
const homeSection = document.getElementById('home');
const searching = document.querySelectorAll('.searching');
const inputs = document.querySelector('.inputs');
const nameInp = document.getElementById('nameInp');
const emailInp = document.getElementById('emailInp');
const phoneInp = document.getElementById('phoneInp');
const ageInp = document.getElementById('ageInp');
const passwordInp = document.getElementById('passwordInp');
const rePassInp = document.getElementById('rePassInp');




//SECTION - categories event

categories.addEventListener('click', async function () { 
  let cate = new Categories()
   await cate.getCategory()
  await $('.box').fadeIn(1000);
  await $(Category).siblings('section').fadeOut(100);
  await $(Category).fadeIn(400);
  
 })
 //SECTION - ingredients event

 ingredients.addEventListener('click', async function () { 
  let ingr = new Ingredient()
   await ingr.getIngredient()
   await $('.box').fadeIn(700);
   await $(ingredient).siblings('section').fadeOut(100);
   await $(ingredient).fadeIn(400);
 })

 //SECTION - area event

area.addEventListener('click', async function () { 
  let areaa = new Area()
 await areaa.getArea()
 await $('.box').fadeIn(700); 
 await $(areaSection).siblings('section').fadeOut(100);
  await $(areaSection).fadeIn(400);
 })


//SECTION - search event


 search.addEventListener('click', async function () { 
  await $(SearchSection).siblings('section').fadeOut(100);
  await $(SearchSection).fadeIn(400);
  for (let i = 0; i < searching.length; i++) {
    searching[i].addEventListener('input', async function () { 
      let inpVal= searching[i].value;
      await searchh.getSearch(inpVal)
      await $('.box').fadeIn(1000);
     })
  }
  let searchh = new Search()
  $('.inputs').fadeIn(700);
 })

//  $('search').parent().siblings().children().click(function () {
//    $('.instructionsDetails').fadeOut(100)
//    console.log('hi');
//    $('.displayer').removeClass('d-none')
   for (let i = 0; i < searching.length; i++) {
    searching[i].value='';
   }
 
//  })
$('#search').click(function () {
  $('.displayer').addClass('d-none')
})
 

//SECTION - Home event



$(async function () { 
  $('.backToHome').click(function () { 
     $(homeSection).siblings('section').fadeOut(100);
     $(homeSection).fadeIn(400);
     $('#homeDisplay').fadeIn(400);
  });
  let home = new Home()
 await home.getHome()
 await $('.box').fadeIn(400);

})



//SECTION - contact event
 
contact.addEventListener('click',  function () { 
    $(contactSection).siblings('section').fadeOut(100);
    $(contactSection).fadeIn(400);
 })


//SECTION -  Validation Contact us 

nameInp.addEventListener('keyup',function () { 
  let contVal= new Contact()
  contVal.validateContactsName() })
  emailInp.addEventListener('keyup',function () { 
    let emailVal= new Contact()
    emailVal.validateContactsEmail() })
    phoneInp.addEventListener('keyup',function () { 
      let pNumVal= new Contact()
      pNumVal.validateContactsPNum() })
      ageInp.addEventListener('keyup',function () { 
        let ageVal= new Contact()
        ageVal.validateContactsAge() })
        passwordInp.addEventListener('keyup',function () { 
          let passVal= new Contact()
          passVal.validateContactsPass() })
          rePassInp.addEventListener('keyup', function () { 
            if (passwordInp.value === rePassInp.value ) {
              rePassInp.style.border='none'
              $('#invalidRPass').addClass('d-none');
              // $('#btnDisapling').removeAttr('disabled');
              return true;
            }else{
              rePassInp.style.border='3px solid red'
              $('#invalidRPass').removeClass('d-none');
              // $('#btnDisapling').attr("disabled" , "");
              return false;
            }
           })
           
           if (nameInp.value !=" " && passwordInp.value !=" " && emailInp.value!=" " && ageInp.value!=" " && phoneInp.value !=" " && rePassInp.value == passwordInp.value) 
           {  
            console.log('3shan 5atry');
            $('#btnDisapling').attr("disabled", "");
           }else
           {
            console.log('m3lsh');
            $('#btnDisapling').removeAttr('disabled');
           }

    // SECTION - Loading page 



    $('.sk-chase').fadeOut(1000,function () { 
       $('.loadingPage').fadeOut(1000 ,function () { 
          $('body').css('overflow','auto');
        });
     });

//SECTION -  Opening / closing icon

     $("#bars").click(()=>{
        $(".side-nav-bar").animate({left:"0"},700)
        $('#bars').addClass('d-none');
        $('#close').removeClass('d-none');
        let allLis = document.querySelectorAll("#sliding li")
        $(allLis).eq(0).delay(100).animate({top:'0px'}, 200,()=>{
          $(allLis).eq(1).delay(100).animate({top:'60px'}, 200,()=>{
            $(allLis).eq(2).delay(100).animate({top:'120px'}, 200,()=>{
              $(allLis).eq(3).delay(100).animate({top:'180px'}, 200,()=>{
                $(allLis).eq(4).delay(100).animate({top:'240px'}, 200 , )
              })
            })
          })
        })
      
      })
      $("#close").click(()=> {
        close()
    })
    $("#sliding a").click(()=> {
      close()
  })
  
    function close() {
      let width = $(".side-nav-bar").innerWidth();
      $(".side-nav-bar").animate({left:`-=${width}`},700)
      $('#bars').removeClass('d-none');
      $('#close').addClass('d-none');
      let allLis = document.querySelectorAll("#sliding li")
      $(allLis).eq(4).delay(50).animate({top:'100%'}, 100,()=>{
        $(allLis).eq(3).delay(50).animate({top:'100%'}, 100,()=>{
          $(allLis).eq(2).delay(50).animate({top:'100%'}, 100,()=>{
            $(allLis).eq(1).delay(50).animate({top:'100%'}, 100,()=>{
              $(allLis).eq(0).delay(50).animate({top:'100%'}, 100)
            })
          })
        })
      })
    }
    
    
     })