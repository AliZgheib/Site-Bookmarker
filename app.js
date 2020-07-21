document.addEventListener('DOMContentLoaded',()=>{






const submit =document.querySelector('#submit');
const text =document.querySelector('#text');
const url=document.querySelector('#url');
const popup =document.querySelector('#popup');
const div =document.querySelector('.bookmarks');
const regex ="^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$";



class Bookmark{

    constructor(name,url){

        this.name=name;
        this.url=url;
    }
    static getbookmarks(){
      let data;

      if(localStorage.getItem('bookmarks')===null){
          data=[];
      }
      else{
         data= JSON.parse(localStorage.getItem('bookmarks'));
      }
      return data;
        


    }//closing method
    static addbookmark(bm){

    let bookmarks = Bookmark.getbookmarks();
     
        let bool=false;
    bookmarks.forEach((element,index) => {
        
        if(element.name==bm.name && element.url==bm.url){
            bool=true;
        }   
     });
     if(!bool){
         bookmarks.push(bm);

         div.innerHTML+=`<div class='d-flex flex-column item col '>
   <h4 class="text-center text-light">${text.value}</h4>
   <a class="btn btn-primary mt-2" target="_blank" href="${url.value}">Visit</a>
   <button class="btn btn-danger mt-2">Delete</button>
   </div>`;
        Bookmark.alert("good")
     }
     else{
         Bookmark.alert("bad")
     }
   

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }//closing method

    static delbookmark(field1,field2){

        1
        field2= field2.substring(0, field2.length - 1);

        let bookmarks = Bookmark.getbookmarks();

        bookmarks.forEach((element,index) => {

           if(element['name']==field1 && element['url']==field2){
           bookmarks.splice(index,1)
            
           }
        });
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }// end of delete function


    static alert(type){

        if(type=="good"){

        popup.className="alert alert-success text-center mt-3";
        popup.innerText="Bookmark Added Succesfully!"
    
        setTimeout(() => {
            popup.className="hide";
        popup.innerText="";
        }, 2000);
        }

       else  if(type=="bad"){

       popup.className="alert alert-danger text-center mt-3";
       popup.innerText="Bookmark Already Exists!"
      
   
       setTimeout(() => {
        popup.className="hide";
        popup.innerText="";
       }, 2000);
       }
       else if(type=="empty"){

    popup.className="alert alert-danger text-center mt-3";
    popup.innerText="Fill Out All The Fields!"

    setTimeout(() => {
        popup.className="hide";
        popup.innerText="";
    }, 2000);
       }
      
       else if(type=="badurl"){


        popup.className="alert alert-danger text-center mt-3";
        popup.innerText="Invalid URL Entered!"
       
        setTimeout(() => {
            popup.className="hide";
        popup.innerText="";
        }, 2000);
       
       }



    }

}//closing class







submit.addEventListener('click',start);


// add to the bookmark
function start(e){
e.preventDefault();

if(text.value!='' && url.value!=''){

 if(url.value.match(regex)){

       
   
   let newbm =new Bookmark(text.value,url.value);
   
   Bookmark.addbookmark(newbm);
   
   
 }
 else{

Bookmark.alert("badurl");

 }

 

}
else{
   Bookmark.alert("empty");
}

}// closing of start function



div.addEventListener('click',(e)=>{

if(e.target.className=="btn btn-danger mt-2"){

    let url =e.target.previousElementSibling.href;
    let name= e.target.previousElementSibling.previousElementSibling.innerHTML;


    let parent =e.target.parentElement;
    div.removeChild(parent);

    Bookmark.delbookmark(name,url);

}

});

function displayall(){

let bms= Bookmark.getbookmarks();

    bms.forEach((bm)=>{

        div.innerHTML+=`<div class='d-flex flex-column item col '>
        <h4 class="text-center text-light">${bm.name}</h4>
        <a class="btn btn-primary mt-2" target="_blank" href="${bm.url}">Visit</a>
        <button class="btn btn-danger mt-2">Delete</button>
        </div>`;

    });
}

displayall();

});