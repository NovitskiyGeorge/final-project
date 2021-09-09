export default class PokemonService {
   async getResource(url) {
      const res = await fetch(url);
      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   }

   addCaughtPokemon(item) {
      fetch('http://localhost:3000/pokemonsCaught', {
         method: 'POST',
         body: JSON.stringify({
            ...item
         }),
         headers: {
            "Content-Type": "application/json"
         }
      })
         .then((response) => response.json())
         .catch(error => console.error('Error', error));
   }

   getAllPokemons() {
      return this.getResource('http://localhost:3000/pokemons');
   }

   getPokemon(num) {
      return this.getResource(`http://localhost:3000/pokemons/${num}`);
   }

   getAllCaughtPokemons() {
      return this.getResource('http://localhost:3000/pokemonsCaught');
   }

   getCaughtPokemon(num) {
      return this.getResource(`http://localhost:3000/pokemonsCaught/${num}`);
   }
}
