

const theform = document.querySelector('.form');

//loading question and good answers form json file

let numberOfQuestion = 0;

const loaddata = () =>{

    // array where we will put the good answers to the test
    let goodanswers = [];
    
    

    // we fetch the json file
    fetch('/data/test2.json')
        .then(result=>result.json())
        .then(data=>{


            let titleofquizz = data[0].title;            
            document.getElementById("quizz-title").innerText = titleofquizz;

            let levelofquizz = data[0].level;
            document.getElementById("quizz-level").innerText = 'Level: '+ levelofquizz;

            // we fill the correct answers
            goodanswers = data[0].answers;
           
            // we retrieve the questions and write the questions to the dom
            let lesquestions = data[0].questions;

            // the number of questions in the quizz
            numberOfQuestion = data[0].questions.length;
            
            

           let templatedebut = ''; 
           let totaltemplate='';

           
           lesquestions.forEach((element,index)=>{
                
            
               templatedebut = ` <div class="card mb-3 mt-4 q${index+1}">
               <div class="row g-0">
                   <div class="col-md-4">
                       <h5 class="p-3">${element.title}</h5>
                   </div>
                   <div class="col-md-8">`;


                let possibileAnswers = element.possibilities[0]; 
                
                let templateend = '';
                let checked = '';
                for(let x in possibileAnswers){
                    checked = "";
                    if(x == "b"){

                        checked = "checked";

                    }
                     console.log(x);
                    templateend +=`<div class="form-check mt-2">
                    <input class="form-check-input" type="radio" name="q${index+1}" value="${x}" id="multilanguage"
                     ${checked}  >
                    <label class="form-check-label" for="multilanguage">
                        ${possibileAnswers[x]}
                    </label>
                </div>`

                }
                 totaltemplate += templatedebut +templateend +`</div></div></div>`;
                
            });
             document.querySelector('.form').innerHTML = totaltemplate + `<div class="submitbuttonarea">

             <button type="submit" class="btn-primary rounded">Validez votre Choix</button>
             <a href="#" class="btn btn-danger ml-5" onclick="resetColors();">Reset the Quizz</a>
         </div>`;
          

        })
        .catch(err=>{

            console.log("data not retrieved");
        })


        // we listen to the form submit and grab the answers of the player
        theform.addEventListener('submit',(e)=>{


            e.preventDefault();

            
            let answers = [];

            

            for(i=1;i<4;i++){

                let answer = document.querySelector(`input[name = "q${i}"]:checked`).value;

                answers.push(answer);

            }

            

            // we compare the correct answers and the answers of the users and highlight them
            checkResults(answers,goodanswers);


        });

};








// on check les resultats et on donne une couleur au block en fonction de celui ci
function checkResults (reponses,goodanswers){

        let numberOfGoodAnswers = 0;
        reponses.forEach((element,index) => {

           
            
            let blocdequestion = document.querySelector(`.q${index+1}`);

            // on reset les success et erreurs
            blocdequestion.classList.remove('success','error');

            console.log('letruc',goodanswers[index]);
            
            if(goodanswers[index] === element){

                              
                blocdequestion.classList.add('success');
                numberOfGoodAnswers++;
                
            }else{
                              
                blocdequestion.classList.add('error');
               
            }

        });

        document.getElementById("number-questions").innerText = numberOfGoodAnswers+'/'+numberOfQuestion + " Correct Answers";
        // document.getElementById("number-correct").innerText = numberOfGoodAnswers;

};


function resetColors(){


    for(i=1;i<4;i++){

        let blocdequestion = document.querySelector(`.q${i}`);

        blocdequestion.classList.remove('success','error');

    }
}

loaddata();