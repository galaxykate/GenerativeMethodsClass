//variable to keep pause/play state
let paused = false;

//main element
document.addEventListener("DOMContentLoaded", function () {
  new Vue({
    el: "#app",
    template: `
      <div id="app">
          <p><b>Intro: </b>The aim of this cellular automaton is to showcase the relationship between teenagers and peer pressure. There are 3 kinds of teenagers - regular joe(😄), cowboy joe(🤠) and cool guy joe (😎). Each person influences others to be more like them. 
          It is twice as hard for cool guy joe to be influenced by cowboys and vice versa. Both cool guy joes and cowboy joes influence regular joe by the same amount. 
          If a given person is influenced by peers then they turn into one of them i.e. if regular joes influence cool guy joe then cool guy joe becomes regular joe. 
          <simulation mode="resilience"/>
          </p>

          <p>
          We start with a simulation of peer pressure. The level of resiliency can be modified using the slider. The level of resiliency represents how resilient a given person is to influence of peers. You will notice that if the resiliency is too low then nobody's character is constant even for a second.
          This is bad since a person has virtually no constant character/behaviour which can be very confusing for you and others as teenagers. Conversely, if the resiliency is too high then you will never change your character. This is bad since multiple studies have shown that the brain of teenagers develops better and is more activated if they are surrounded by peers.
          So, you need a balanced level of resiliency somewhere in the middle.
          </p>
          
          <simulation mode="group"/>
          <p>
          Now assume that the resiliency is fixed at a reasonable level. We next look at the group size i.e. the number of peers you can be influenced by. The slider can be used to change this (from a minimum of 2 to a maximum of 8). The 8 neighbours are fetched and some number of them are randomly chosen based on group size. 
          You will notice that the smaller the group is, the more difficult it is to convince/influence someone i.e. more number of regular joe's remain. This makes sense since the smaller the group, the more difficult it is to gain a majority to influence someone. On the other hand, having a very big group means that you try to listen to everyone around you which is not really realistic since most teenagers end up having a close group that they are influenced by. 
          </p>

          <simulation mode="influence"/>
          <p>
          Here, we assume that the resiliency is reasonable and the group size is 5. Now, even among your group there are some friends that influence you more than others due to a variety of factors. We account for this by calculating a random influence factor each time and using this to decide how much a peer influences you. So, your character is mostly fixed but can change at any given point based on the influence of your peers.
          So, this is a very probable (probable, not possible) representation of how peer pressure affects teenagers.
          </p>
        </div>`,
  });
});
