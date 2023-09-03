

export class Ingredient
{
 constructor() {}
 async getIngredient()
 {  $('.loadingPage').fadeIn(400);
 $('.sk-chase').fadeIn(400);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const response = await request.json()
    this.displayIngredient(response.meals) 
    $('.loadingPage').fadeOut(400);
    $('.sk-chase').fadeOut(400);
    return response.meals
 }
 

 displayIngredient(arr) 
{
    var cartona =``;
    for(var i=0; i < arr.length ;i++)
    {
        if (i <= 20) {
            cartona += ` <div data-id="${arr[i].idMeal}" class="col-md-3 p-0  box  text-white  text-center ">
            <div class="inner px-10">
            <i class="fas fa-drumstick-bite"></i>
            <div class="      ">
             <h2>${arr[i].strIngredient}</h2>
             <p class = "p-3 overflow-hidden">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
                </div>`;
            }
        }
   
    document.querySelector('#ingredients').innerHTML = cartona;
    document.querySelectorAll('#ingredients .box').forEach((box) => {
        box.addEventListener('click', () => {
          this.getIngredientData(box.querySelector('h2').innerHTML.toLowerCase())
          $('#ingredients').fadeOut(400);
          let ingMeal = document.querySelector('#ingMeals');
          ingMeal.style.display= 'flex';
          $(ingMeal).fadeIn(400)
        })
      
    })
     
};

async getIngredientData(category)
{ $('.loadingPage').fadeIn(400);
 $('.sk-chase').fadeIn(400);
   const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`)
   const response = await request.json()
   this.displayIngredientData(response.meals)
   $('.loadingPage').fadeOut(400);
   $('.sk-chase').fadeOut(400);
   return response.meals
}

displayIngredientData(arr){
   var cartona =`<div class="backIcon d-flex justify-content-start">
   <i class="fas fa-arrow-left fs-3 btn btn-dark"></i>
               </div>`;
   for(let i=0; i < arr.length ;i++)
   {
   cartona += ` <div data-id="${arr[i].idMeal}" class="col-md-3 p-0 position-relative box   overflow-hidden">
   <div class="inner px-10">
   <img src="${arr[i].strMealThumb}" class="w-100 h-100 rounded ">
   <div class="mealInfo position-absolute  bottom-0 text-center  rounded ">
    <h2>${arr[i].strMeal}</h2>
   </div>
</div>
       </div>`;
   }
   document.querySelector('#ingMeals').innerHTML = cartona;
   document.querySelectorAll('#ingMeals .box').forEach((box) => {
       box.addEventListener('click', () => {
        this.getIngredientDetails(box.dataset.id)
        $('#ingMeals').fadeOut(100) 
            $('.instaOff').fadeIn(400 )
       })
   })
   $('.backIcon').click(() => {
    $('#ingMeals').fadeOut(100)
    $('#ingredients').fadeIn(400)
});
   $('.box').fadeIn(400);
  
}
async getIngredientDetails(id)
{  $('.loadingPage').fadeIn(400);
    $('.sk-chase').fadeIn(400);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const response = await request.json()
    this.displayIngredientDetails(response.meals) 
    $('.loadingPage').fadeOut(400);
   $('.sk-chase').fadeOut(400);
    return response.meals
    
}

displayIngredientDetails(data){
  let recipes = [];
  let tags = [];
  let tagsStr = '';
  let recipesStr = ''
  let details = '';
  for (let i = 0; i < data.length; i++) {
    //  GET RECIPES
    for (let index = 1; index <= 20 ; index++) {
      recipes.push(data[i][`strIngredient${index}`])
    }
    //  DISPLAY RECIPES
    for (let index = 0; index < recipes.length; index++) {
      if (recipes[index].length != 0 || recipes[index].innerHTML == "null") {
        recipesStr += `
        <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${recipes[index]}</div>
        `
      }
    }
    //  GET TAGS
    tags.push(data[i].strTags?.split(","))
    //  DISPLAY TAGS
      for (let index = 0; index < tags.length; index++) {
          if (tags.length == 0 || tags[index] == undefined || tags[index].innerHTML == "null") {
          }
          else {
            tags[index].map((tag)=>{
              tagsStr += `<div class="alert alert-danger px- py-1">${tag}</div>`;
            });
          };
      };
    details += `
    <div class="d-flex justify-content-end">
      <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="closerIng"></i>
    </div>
    <div class="col-12 col-lg-4">
    <div class="img text-white">
    <img src="${data[i].strMealThumb}" class="rounded img-fluid" alt="">
    <div class="name fs-3">${data[i].strMeal}</div>
    </div>
    </div>
    <div class="col-12 col-lg-8">
    <div class="info text-white">
    <p class="title fw-bold fs-3">Instrauctions</p>
    <p class="instrauctions">${data[i].strInstructions}}</p>
    <p class="fw-bold fs-3">Area: <span class="area fw-normal">${data[i].strArea}</span></p>
    <p class="fw-bold fs-3">Category: <span class="category fw-normal">${data[i].strCategory}</span></p>
    <div><p class="fw-bold fs-3 d-block">Recipes: </p>
    <div class="recipes d-flex flex-wrap mb-4">
    ${recipesStr}
    </div>
    </div>
    <div><p class="fs-3 fw-bold d-block">Tags: </p><div class="d-flex gap-3 flex-wrap">${tagsStr}</div><div class="d-flex gap-1">
    <div class="d-flex gap-2 flex-wrap">
    <a href="${data[i].strSource}" target="_blanck" class="btn btn-success">Source</a>
    <a href="${data[i].strYoutube}" target="_blanck" class="btn btn-danger">Youtube</a>
    </div>
    </div></div>
  </div>      
    </div>
    `
    
  };
  $(".instructionsDetails").html(details);
  $('#closerIng').click(() => {
      $('.instaOff').fadeOut(100)
       $('#ingMeals').fadeIn(400)
    })
}

};







// displayIngredientDetails(data){
//   let details = ``;
//   for(let i=0; i < data.length ;i++){
//   details += `
//   <div class="closedIcon d-flex justify-content-end">
//   <i class="fas fa-xmark fs-3 btn btn-dark " id="closerIng"></i>
//   </div>
//   <div class=" text-white col-12 col-lg-4">
//     <img src="${data[i].strMealThumb}" class="rounded w-100" >
//     <div class="name fs-3 py-2 text-center">${data[i].strMeal}</div>
//   </div>
//   <div class="info text-white  col-12 col-lg-8 ">
//     <p class="title fw-bold fs-3">Instrauctions</p>
//     <p class="instrauctions  ">${data[i].strInstructions}}</p>
//     <p class="fw-bold fs-3">Area: <span class="area fw-normal">${data[i].strArea}</span></p>
//     <p class="fw-bold fs-3">Category: <span class="category fw-normal">${data[i].strCategory}</span></p>
//     <p class="fw-bold fs-3 d-block">Recipes: </p>
//     <div class="recipes d-flex flex-wrap mb-4">
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient1}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient2}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient3}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient4}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient5}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient6}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient7}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient8}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient9}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient10}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient11}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient12}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient13}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient14}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient15}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient16}</div>
//     <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient17}</div>
//     </div>
//     <div>
//     <p class="fs-3 fw-bold d-block">Tags : </p>
//     <div class="d-flex gap-1">
//       <a href="${data[i].strSource}" target="_blanck" class="btn btn-success">Source</a>
//       <a href="${data[i].strYoutube}" target="_blanck" class="btn btn-danger">Youtube</a>
//     </div></div>
//   </div>`
// }
// $(".instructionsDetails").html(details);
// let alert = document.querySelectorAll(".alert")
// for (let i = 0; i < alert.length ;i++) {
//   if (alert[i].innerHTML.length == 0 || alert[i].innerHTML == "null") {
//     alert[i].classList.add("d-none")
//   }
// }

// $('#closerIng').click(() => {
//   $('.instaOff').fadeOut(100)
//    $('#ingMeals').fadeIn(400)
// })
// }





// $('#displayer .box').click(function (eventInfo) {
//     let mealData= eventInfo.target.getAttribute('data-id');
//     let sectionOffset = $(mealData).offset().top;
//     $('body').animate({scrollTop:sectionOffset}, 1000);
//   })