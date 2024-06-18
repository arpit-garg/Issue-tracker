const form = document.getElementById('issue-form');
// console.log(chance.guid())
const fetchIssues = function(){
    const issues = JSON.parse(localStorage.getItem('issues'))
    // console.log(document.getElementById('display').innerHTML)
    // console.log(issues.length);
    const display = document.getElementById('display')
    // console.log(display.firstChild);
    if(display.firstChild.nodeType === 3)
        display.removeChild(display.firstChild)
    if(issues && issues.length!==0)
        {
            const add = document.createTextNode("ISSUES")
            // console.log(display);
            const firstchild = display.firstChild
            firstchild.parentElement.insertBefore(add,firstchild)
            // document.getElementById('display').textContent="ISSUES"

    const displayarea  = document.getElementById('displayIssues')
    displayarea.innerHTML=''
    // console.log(document.querySelector('ul'))
    // console.log(document.querySelector('#display ul'))
    issues.forEach(element => {
        const issue = document.createElement('li')
        issue.setAttribute('id',element.id)
        issue.innerHTML=` id : ${element.id} <br>
        status : ${element.status} <br>
        Issue description : ${element.desc} <br> 
        severity: ${element.severity} <br>
        Assigned to : ${element.assignedTo}<br> 
        <button id="close">close</button>
        <button id="delete">delete</button>
        `
        // console.log(issue.innerHTML)
        displayarea.appendChild(issue)
        // displayarea.innerHTML+=issue
        // console.log(displayarea)

    });}
    else  //for last delete issue it will not go into if block
    {
        const displayarea  = document.getElementById('displayIssues')
    displayarea.innerHTML=''
    }
}
document.addEventListener("DOMContentLoaded",fetchIssues)
//add the new issue and show the updated list
form.addEventListener('submit', function(e){
    e.preventDefault()
    // console.log(e.defaultPrevented)
    // console.log(e.target.querySelector('#issue-description'))
    

    const issue={
        id : chance.guid(),
        status : "open",
        desc : e.target.querySelector('#issue-description').value,
        severity : e.target.querySelector('#severity').value,
        assignedTo : e.target.querySelector('#assigned-to').value,
    }

    if(localStorage.getItem("issues")===null){
        let issues=[]
        issues.push(issue)
        localStorage.setItem("issues",JSON.stringify(issues))
    }
    else{
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue)
        localStorage.setItem('issues',JSON.stringify(issues))
    }
    form.reset()
    fetchIssues()
});

//change the status to close
// document.addEventListener('DOMContentLoaded',function(){
//     document.querySelectorAll('#close').forEach(item =>{item.addEventListener('click',function(e){
//         let issues = JSON.parse(localStorage.getItem('issues'))
//         console.log(e.currentTarget);
//         console.log(e.target.parentElement);
//         issues.forEach(item =>{
            
//             if(item.id==e.target.parentElement.id)
//                 {
//                     // console.log("match found");
//                     item.status = 'Close'
//                 }
//         })
//             localStorage.setItem('issues',JSON.stringify(issues))
//         fetchIssues()
//     })
// })
// })


//delete the issue
// console.log(DOMContentloaded);
// document.addEventListener('load',function(){
// if(document.readyState==='loading')

//     {    console.log('hey there');
//         document.addEventListener('DOMContentLoaded',function(){
//         document.querySelectorAll('#delete').forEach(item =>{item.addEventListener('click',function(e){
//         let issues = JSON.parse(localStorage.getItem('issues'))
//         // console.log(e.currentTarget);
//         // console.log(e.target.parentElement);
//         issues.forEach((item,index) =>{
            
//             if(item.id==e.target.parentElement.id)
//                 {
//                     console.log("to be deleted");
//                     // const index = issues.indexOf(item)
//                     issues.splice(index,1)
                    
                    
                    
//                 }
//         })

//         localStorage.setItem('issues',JSON.stringify(issues))
//         fetchIssues()
//     })
// })
// })}
// else
// {
//     console.log("in else block");
//     document.querySelectorAll('#delete').forEach(item =>{item.addEventListener('click',function(e){
//         let issues = JSON.parse(localStorage.getItem('issues'))
//         // console.log(e.currentTarget);
//         // console.log(e.target.parentElement);
//         issues.forEach((item,index) =>{
            
//             if(item.id==e.target.parentElement.id)
//                 {
//                     console.log("to be deleted");
//                     // const index = issues.indexOf(item)
//                     issues.splice(index,1)
                    
                    
                    
//                 }
//         })

//         localStorage.setItem('issues',JSON.stringify(issues))
//         fetchIssues()
//     })
// })
// }
// })


//delete the issue through event delegation
document.querySelector('ul').addEventListener('click', function(e) {
    // console.log(e.target);
    if (e.target.matches('#delete') || e.target.parentElement.matches('#delete')) {
      let issues = JSON.parse(localStorage.getItem('issues'));
        // console.log(issues);
      issues.forEach((item, index) => {
        if (item.id == e.target.parentElement.id) {
        //   console.log('to be deleted');
          issues.splice(index, 1);
          
        }
      });
    //   console.log(issues)
    if(issues.length!==0)
      localStorage.setItem('issues', JSON.stringify(issues));
    else
        localStorage.clear()
      fetchIssues();
    }
  })

  //status change to close through event delegation
  document.querySelector('ul').addEventListener('click', function(e) {
    // console.log(e.target);
    if (e.target.matches('#close') || e.target.parentElement.matches('#close')) {
      let issues = JSON.parse(localStorage.getItem('issues'));
        // console.log(issues);
      issues.forEach((item, index) => {
        if (item.id == e.target.parentElement.id) {
        //   console.log('to be deleted');
          item.status='Close'
          
        }
      });
    //   console.log(issues)
      localStorage.setItem('issues', JSON.stringify(issues));
      fetchIssues();
    }
  })