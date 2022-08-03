$('#car_section').empty();
console.log(cars);

const likes = [];
const dislikes = [];
const brands = [];


function get_car_obj(car) {
    return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 Car">
        <div class="card">
            <img class="car_img" src="${car.url}">
            <div class="card-body" style="padding-left: 3%; padding-right: 3%; padding-top: 5%; padding-bottom: 3%;">
                <div class="row">
                    <div class="text_left col-5 justify-content-left" style="padding: 0; padding-left: 6% !important;">
                        <ul style="padding-left: 5%;">
                            <p>Make</p>
                            <p>Model</p>
                            <p>Year</p>
                            <p>Price</p>
                        </ul>
                    </div>
                    <div class="text_right col-7 justify-content-left" style="padding: 0; padding-right: 6% !important;">
                        <ul style="padding-left: 10%;">
                            <p class="make">${car.make}</p>
                            <p class="model">${car.model}</p>
                            <p class="year">${car.year}</p>
                            <p class="price">${car.price}</p>
                        </ul>
                    </div>
                </div>
                <div class="buttonDiv btn-group" role="group" aria-label="Basic example" style="width: 100%;">
                </div>
            </div>
        </div>
    </div>`
}


function get_make(car) {
    return `<li class="${car.make}">${car.make}</li>`
}


cars.sort((a, b) =>{
    return b.year - a.year;
})

cars.forEach((car) => {
    $('#car_grid').append(() => {
        return get_car_obj(car);
    });
})


cars.forEach((car) => {
    let included = false;
    const carMake = car.make;
    for(let i = 0; i < brands.length; i++){
        if(carMake === brands[i]){
            included = true;
        }
    }
    if(included){
        return null;
    }else {
        brands.push(carMake);
        $('#make_list').append(() => {
            return get_make(car);
        });
    }
})


$('.card-body').addClass(function(index) {
    if(index % 2 === 0){
        return 'even_row';
    }else{
        return 'odd_row';
    }
});

$('.buttonDiv')
    .append(idx => {
        return $(`<button type="button" class="btn btn-secondary like_button"><i
            class="fa fa-thumbs-up"></i></button>`);
    })
    .append(idx => {
        return '<button type="button" class="btn btn-secondary dislike_button"><i class="fa fa-thumbs-down"></i></button>'
    })
    .append(idx => {
        return '<button type="button" class="btn btn-danger delete_button"><i class="fa fa-trash"></i></button>'
    })

$('.like_button').on('click', function (event){
    this.classList.toggle('gold_bg');
    if (this.classList.contains('gold_bg')){
        likes.push($(this).parents('.Car'));
    }else {
        for(let i = 0; i < likes.length; i++){
            if(likes[i] === $(this).parents('.Car')){
                likes.splice(i, 1)
            }
        }
    }
});

$('.dislike_button').on('click', function (event){
    this.classList.toggle('gold_bg');
    if ($(this.classList.contains('gold_bg'))){
        dislikes.push($(this).parents('.Car'));
    }else {
        for(let i = 0; i < dislikes.length; i++){
            if(dislikes[i] === $(this).parents('.Car')){
                dislikes.splice(i, 1)
            }
        }
    }
});

$('.delete_button').on('click', function (event){
    $(this).parents('.Car').slideUp(1000, function () {
        let make = $(this).find('.make').text();
        $(this).remove();
        remove_from_ul(make);
    });
});


function update_cars() {
    let state;
    const state1 = $('#all_likes');
    const state2 = $('#all_dislikes');
    const state3 = $('#all_cars');
    if(state1[0].checked){
        state = state1.val()
    }else if(state2[0].checked){
        state = state2.val()
    }else{
        state = state3.val()
    }

    const currentSearch = $('#search_box').val().toLowerCase();
    $.each($('.Car'), function () {
        const Make = $(this).find('.make').text().toLowerCase();
        const Model = $(this).find('.model').text().toLowerCase();
        const Year = $(this).find('.year').text().toLowerCase();
        const all = Make + ' ' + Model + ' ' + Year;
        const hasWord = all.includes(currentSearch);
        let included = false;

        if(state === "like"){
            for(let i = 0; i < likes.length; i++){
                let current_car = $(likes[i]);
                if($(this).is(current_car)){
                    included = true;
                    break;
                }
            }
            if(included){
                if(hasWord){
                    $(this).show(200);
                }else{
                    $(this).hide(200);
                }
            }else{
                $(this).hide(200);
            }
        }
        else if(state === "dislike"){
            for(let i = 0; i < dislikes.length; i++){
                let current_car = $(dislikes[i]);
                if($(this).is(current_car)){
                    included = true;
                    break;
                }
            }
            if(included){
                if(hasWord){
                    $(this).show(200);
                }else{
                    $(this).hide(200);
                }
            }else{
                $(this).hide(200);
            }
        }else {
            if (hasWord) {
                $(this).show(200);
            }else{
                $(this).hide(200);
            }
        }

    });
}


function remove_from_ul(make){
    let count = 0;
    let inc = false;
    $.each($('.Car'), function () {
        if($(this).find('.make').text() === make){
            count++;
        }
    });
    if(count === 0){
        $('#make_list').children().each(function () {
            if(this.innerText.toString() === make) {
                $(this).remove();
            }
        });
    }
}


$('#search_box').on('keyup', ()=>{update_cars()});