const { createApp } = Vue;
createApp({
  created() {
    fetch('http://localhost/world_of_ice_and_fire_API_mashup/lumen/public/characters')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch characters. Please try again later.');
        }
        return res.json();
      })
      .then(data => {
        this.charactersData = data; 
      })
      .catch(error => {
        console.error(error);
        this.error = 'An error occurred while fetching the characters.';
      });
  },
  data() {
    return {
      charactersData: [], 
      characterName: "",
      aliases: "", 
      culture: "", 
      born: "", 
      tvSeries: "", 
      error: ""
    }
  },
 methods: {
    getCharacter(characterName) {
      this.characterName = "";
      this.aliases = "";
      this.culture = "";
      this.born = "";
      this.tvSeries = "";
      this.error = "";
      fetch(`https://anapioficeandfire.com/api/characters?name=${characterName}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch character details. Please refresh tha page and try again.');
          }
          return res.json();
        })
        .then(data => {
          const character = data.find(character => character.name === characterName);
          if (character) {
            this.characterName = character.name;
            this.aliases = character.aliases.length > 0 ? character.aliases.join(", ") : "Not Available";
            this.culture = character.culture ? character.culture : "Not Available";
            this.born = character.born ? character.born : "Not Available";
            this.tvSeries = character.tvSeries.length > 0 ? character.tvSeries.join(", ") : "Not Available";
              gsap.fromTo("#character-info", { opacity: 0 }, { opacity: 1, duration: 0.5 });
          } else {
            this.error = 'Sorry, no character found with the given name. Please choose a different character.';
          }
        })
        .catch(error => {
          console.error(error);
          this.error = 'An error occurred while fetching character details.';
        });
    }
  }
}).mount('#app');
