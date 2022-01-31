AFRAME.registerComponent("cursor-listener",{
    schema: {
        selectedItemId: { default: "", type: "string" }
    },
    init: function() {
        this.handleClickEvents();
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
    },
    handleClickEvents: function() {
        //  Click Events
        this.el.addEventListener("click", evt => {
          const placesContainer = document.querySelector("#places-container");
    
          const { state } = placesContainer.getAttribute("tour");
    
          if (state === "places-list") {
    
            const id = this.el.getAttribute("id");
    
            const placesId = [
              "captian-aero",
              "outer-space",
              "spiderman",
              "superman"
            ];
    
            if (placesId.includes(id)) {
              placesContainer.setAttribute("tour", {
                state: "view",
                selectedCard: id
              });
            }
          }
        });
    },
    handleMouseEnterEvents: function() {
        // Mouse Enter Events
        this.el.addEventListener("mouseenter", () => {
            this.handlePlacesListState();
        });
      },
      handlePlacesListState: function() {
        const id = this.el.getAttribute("id");
        const placesId = ["captian-aero", "outer-space", "spiderman", "superman"];
        if (placesId.includes(id)) {
          const placeContainer = document.querySelector("#places-container");
          placeContainer.setAttribute("cursor-listener", {
            selectedItemId: id
          });
          this.el.setAttribute("material", {
            color:"blue",
            opacity: 1
          });
        }
      },
      handleMouseLeaveEvents: function() {
        // Mouse Leave Events
        this.el.addEventListener("mouseleave", () => {
            const { selectedItemId } = this.data;
            if (selectedItemId) {
              const el = document.querySelector(`#${selectedItemId}`);
              const id = el.getAttribute("id");
              if (id == selectedItemId) {
                el.setAttribute("material", {
                  color: "black",
                  opacity: 1
                });
              }
            }
        });
      },
})