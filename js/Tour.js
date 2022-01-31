AFRAME.registerComponent("tour",{
    schema:{
      state:{type:"string",default:"places-list"}
    },
    init:function() {
        this.placesContainer = this.el;
        this.createCards();
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      const { selectedCard } = this.data;
  
      //Set the 360 degree image to the sky element.
      const skyEl = document.querySelector("#main-container");
  
      skyEl.setAttribute("material", {
        src: `./assets/posters/${selectedCard}-banner.jpg`,
        color: "#fff"
      });
    },
    createCards: function() {
    
        const thumbNailsRef = [
          {
            id: "captian-aero",
            title: "Captian Aero",
            url: "./assets/posters/captain-aero-poster.jpg"
          },
          {
            id: "outer-space",
            title: "Outer Space",
            url: "./assets/posters/outer-space-poster.jpg"
          },
    
          {
            id: "spiderman",
            title: "Spider Man",
            url: "./assets/posters/spiderman-poster.jpg"
          },
          {
            id: "superman",
            title: "SuperMan",
            url: "./assets/posters/superman-poster.jpg"
          }
        ];
        let prevoiusXPosition = -60;
        for (var item of thumbNailsRef) {
          const posX = prevoiusXPosition + 25;
          const posY = 10;
          const posZ = -40;
          const position = { x: posX, y: posY, z: posZ };
          prevoiusXPosition = posX;
    
          // Border Element
          const borderEl = this.createBorder(position, item.id);
    
          // Thubnail Element
          const thumbNail = this.createThumbNail(item);
          borderEl.appendChild(thumbNail);
    
          // Title Text Element
          const titleEl = this.createTitleEl(position, item);
          borderEl.appendChild(titleEl);
    
          this.placesContainer.appendChild(borderEl);
        }
      },
      createBorder: function(position, id) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
          primitive: "ring",
          radiusInner: 9,
          radiusOuter: 10
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("material", {
          color: "black",
          opacity: 1
        });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
      },
      createThumbNail: function(item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
          primitive: "circle",
          radius: 9
        });
        entityEl.setAttribute("material", { src: item.url });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
      },
      createTitleEl: function(position, item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("text", {
          font: "exo2bold",
          align: "center",
          width: 60,
          color: "#e65100",
          value: item.title
        });
        const elPosition = position;
        elPosition.y = -20;
        entityEl.setAttribute("position", elPosition);
        entityEl.setAttribute("visible", true);
        return entityEl;
      }, 
})