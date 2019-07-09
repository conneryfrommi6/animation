$(document).ready(function() {
  let tool;
  let color;
  let countClick = 0;
  let elem1;
  let elem2;

  const elemFrame = ['rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)'];
  const elemFrame1 = ['rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)','rgb(196, 196, 196)'];

  const arrFrame = [];
  arrFrame.push(elemFrame);
  arrFrame.push(elemFrame1);

  let newFrame = `<div class="frame" id="${arrFrame.length}"><div class="frame_element fugure1"></div><div class="frame_element fugure2"></div><div class="frame_element fugure3"></div><div class="frame_element fugure4"></div><div class="frame_element fugure5"></div><div class="frame_element fugure6"></div><div class="frame_element fugure7"></div><div class="frame_element fugure8"></div><div class="frame_element fugure9"></div><div class="frame_tool frame_id"></div><div class="frame_tool frame_delete"></div><div class="frame_tool frame_move"><i class="fas fa-arrows-alt"></i></div><div class="frame_tool frame_copy"></div></div>`;
      
  //render frame
  const addNewFrame = () =>{
    $("#frames").append(newFrame);
  }

  $('#tool-paint').click(function(e) {
      tool = "paint";
      color = $('#currentcolor').css("background-color");
  })
  $('#tool-color').click(function(e) {
      tool = "choosecolor";
  })
  $('#tool-move').click(function(e) {
      tool = "move";
  })
  $('#tool-transform').click(function(e) {
      tool = "transform";
  })
  $("body").keydown(function(I) {
      switch (I.keyCode) {
          // заливка
          case 87: //w -87
              I.preventDefault();
              tool = "paint";
              color = $('#currentcolor').css("background-color");
              break;
              // пипка
          case 65: // a -65 
              I.preventDefault();
              tool = "choosecolor";
              break;
              // перемещение
          case 83: // s-83
              I.preventDefault();
              tool = "move";
              break;
              // квадратТуКруг и назад 
          case 68: // d-68
              I.preventDefault();
              tool = "transform";
              break;
      }
  });

  
   $('.frame').on('click', (e) => {
    let numberFrame;
    
    if (e.target.className === 'frame') {
       numberFrame = parseInt((e.target.id).match(/\d+/));
    } else {
        numberFrame = parseInt($(e.target).parents(".frame").attr("id").match(/\d+/));
    }
    
    $(".canvas").html('');
    console.log(numberFrame);
     arrFrame[numberFrame].forEach((elem, index) => {
        
        $(".canvas").append(`<div class="canvas__item"><div class="square" id="fugure${index}"></div></div>`);
        $(`#fugure${index}`).css("background-color", elem);
     })
    
  })


  $(".color").click(function(e) {
      if (tool === "choosecolor") {
          let currentcolor = $("#currentcolor").css("background-color");
          $("#currentcolor").css("background-color", $(e.target).css("background-color"));
          $("#prewcolor").css("background-color", currentcolor);
      }
  })

  $(".canvas").on('click', function(e) {
      switch (tool) {
          case undefined:
              break;
          case "paint":
              let numberCanvas = parseInt($(e.target).parents(".canvas").attr("id").match(/\d+/));
              console.log(numberCanvas);
              $(e.target).css("background-color", `${color}`);
              let numberElem = parseInt($(e.target).attr("id").match(/\d+/));
              console.log(`numberCanvas = ${numberCanvas} , numberElem = ${numberElem}`)
              arrFrame[numberCanvas][numberElem] = color;
              console.log(arrFrame);
              let r = $(e.target).attr("id");
              
              $(`#frame${numberCanvas} .${r}`).css("background-color", `${color}`);
            
              break;
          case "transform":
              if ($(e.target).hasClass("triangle")) {
                  $(e.target).removeClass("triangle");
                  $(e.target).addClass("square");
              } else {
                  $(e.target).removeClass("square");
                  $(e.target).addClass("triangle");
              }
              break;
          case "move":
              break;
      }
  })






})
  


