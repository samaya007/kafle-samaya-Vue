const { createApp } = Vue;



createApp({
  created() {
    // Fetch characters from a public API
    fetch('http://localhost/world_of_ice_and_fire_API_mashup/lumen/public/characters')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch characters. Please try again later.');
        }
        return res.json();
      })
      .then(data => {
        this.charactersData = data; // Assuming the API returns an array of characters
      })
      .catch(error => {
        console.error(error);
        this.error = 'An error occurred while fetching the characters.';
      });
  },

  data() {
    return {
      charactersData: [], // To store the list of characters
      characterName: "", // Use colon (:) instead of equal sign (=) here
      aliases: "", // Use colon (:) instead of equal sign (=) here
      culture: "", // Use colon (:) instead of equal sign (=) here
      born: "", // Use colon (:) instead of equal sign (=) here
      tvSeries: "", // Use colon (:) instead of equal sign (=) here
      error: ""
    }
  },

  methods: {
    getCharacter(characterName) {
      // Reset character details and error
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
          // Find the character in the array
          const character = data.find(character => character.name === characterName);
          if (character) {
            this.characterName = character.name;
            this.aliases = character.aliases.join(", "); 
            this.culture = character.culture;
            this.born = character.born;
            this.tvSeries = character.tvSeries.join(", ");

            // GSAP Animation
            gsap.fromTo("#character-info", { opacity: 0 }, { opacity: 1, duration: 0.8 });

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
