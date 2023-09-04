
export class Home
{
 constructor() {};
 async getHome()
 {  $('.loadingPage').fadeIn(400);
 $('.sk-chase').fadeIn(400);
    const request = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`);
    const response = await request.json();
    this.displayHome(response.meals) ;
    $('.loadingPage').fadeOut(400);
   $('.sk-chase').fadeOut(400);
    return response.meals;
 }
  displayHome(arr) 
 { 
     var cartona =``;
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
         document.getElementById('homeDisplay').innerHTML = cartona;
         document.querySelectorAll('#homeDisplay .box').forEach((box) => {
            box.addEventListener('click', () => {
                this.getAreaDetails(box.dataset.id)
                $('#homeDisplay').fadeOut(100 ) 
                $('.instaOff').fadeIn(400)
            })
        })
    
};


async getAreaDetails(id)
{ $('.loadingPage').fadeIn(400);
  $('.sk-chase').fadeIn(400);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const response = await request.json()
    this.displayHomeInstructions(response.meals) 
    $('.loadingPage').fadeOut(400);
    $('.sk-chase').fadeOut(400);
    return response.meals
    
}

displayHomeInstructions(data){
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
      if (recipes[index] != "" && recipes[index] != null) {
        recipesStr += `
        <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${recipes[index]}</div>
        `
      }
    }
    //  GET TAGS
    tags.push(data[i].strTags?.split(","))
    //  DISPLAY TAGS
      for (let index = 0; index < tags.length; index++) {
        //NOTE - need Fix
          if (tags.length == 0 || tags[index] == undefined || tags[index].innerHTML == null) {
          }
          else {
            tags[index].map((tag)=>{
              tagsStr += `<div class="alert alert-danger px- py-1">${tag}</div>`;
            });
          };
      };
    details += `
    <div class="d-flex justify-content-end">
      <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="closerHome"></i>
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
  $('#closerHome').click(() => {
    $('.instaOff').fadeOut(100)
     $('#homeDisplay').fadeIn(400)
})
}
};




