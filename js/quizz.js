

const theform = document.querySelector('.form');

const goodanswers = ["a","b","b"];

theform.addEventListener('submit',(e)=>{


    e.preventDefault();

    console.log("on est la");

    let answers = [];

    

    for(i=1;i<4;i++){

        let answer = document.querySelector(`input[name = "q${i}"]:checked`).value;

        answers.push(answer);

    }

    

    // on doit checker les bonnes et mauvaises reponse en comprant avec array qui contient les bons resultats

    checkResults(answers);


});



// on check les resultats et on donne une couleur au block en fonction de celui ci
function checkResults (reponses){


        reponses.forEach((element,index) => {

           
            
            let blocdequestion = document.querySelector(`.q${index+1}`);

            // on reset les success et erreurs
            blocdequestion.classList.remove('success','error');
            
            if(goodanswers[index] === element){

                              
                blocdequestion.classList.add('success');
                
            }else{
                              
                blocdequestion.classList.add('error');
               
            }

        });

};


function pico(){


    for(i=1;i<4;i++){

        let blocdequestion = document.querySelector(`.q${i}`);

        blocdequestion.classList.remove('success','error');

    }
}