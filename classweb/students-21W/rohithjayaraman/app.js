const assignmentDetails = {
  total: 1,
  links: [
    {
      displayText: 'Assignment 1',
      link: 'index.html'
    },
    {
      displayText: 'Assignment 2',
      link: './a2/index.html'
    },
    {
      displayText: 'Assignment 3',
      link: './a3/index.html'
    },
    {
      displayText: 'Assignment 4',
      link: './a4/index.html'
    },
    {
      displayText: 'Assignment 5',
      link: './a5/index.html'
    },
    {
      displayText: 'Assignment 6',
      link: './a6/index.html'
    },
    {
      displayText: 'Assignment 7',
      link: './a7/index.html'
    },
    {
      displayText: 'Assignment 9',
      link: './a9/index.html'
    }
  ]
}

//runs upon page load
document.addEventListener("DOMContentLoaded", () => console.log("Home page loaded"));

//sets class of active and inactive buttons to show in UI
function setButtonClass(activeButton, inactiveButton){
  const active = document.getElementById(activeButton);
  const inactive = document.getElementById(inactiveButton);
  active.className = "tab-button-active";
  inactive.className = "tab-button";
}

//triggers on tab click - shows required tab and hides the other
function onTabClick(tab){
  console.log(`${tab} tab clicked`);
  
  const home = document.getElementById('home');
  const assignments = document.getElementById('assignments');

  if(tab==='home'){
    console.log('hiding assignments and showing home');
    
    setButtonClass('home-button', 'assignment-button');
    
    assignments.style.display="none";
    home.style.display="block";
  }
  else if(tab==='assignments'){
    console.log('hiding home and showing assignments');
    
    setButtonClass('assignment-button', 'home-button');
    
    var html = "";
    assignments.innerHTML = "";
    assignmentDetails.links.forEach(assignment => {html+=`<a href="${assignment.link}" class="assignment">${assignment.displayText}</a>`});
    assignments.innerHTML=html;
    
    home.style.display="none";
    assignments.style.display="flex";
  }
}
