import React from "react";

const pets = [
  { name: "Luna", type: "Cat", age: "2 years", description: "A gentle tabby who loves cuddles and sunny windows." },
  { name: "Rocky", type: "Dog", age: "4 years", description: "A loyal Labrador mix who enjoys hiking and belly rubs." },
  { name: "Nibbles", type: "Rabbit", age: "1 year", description: "A curious and playful bunny who loves munching on carrots." },
  { name: "Milo", type: "Cat", age: "3 years", description: "A fluffy Maine Coon who enjoys being the center of attention." },
  { name: "Sparky", type: "Dog", age: "6 months", description: "An energetic terrier mix who loves to play fetch." },
  { name: "Bubbles", type: "Guinea Pig", age: "2 years", description: "A friendly little guy who loves to squeak for treats." },
  { name: "Daisy", type: "Dog", age: "5 years", description: "A sweet Golden Retriever who adores kids and long walks." },
  { name: "Whiskers", type: "Cat", age: "8 years", description: "A wise senior who loves lap time and quiet naps." },
  { name: "Peanut", type: "Hamster", age: "6 months", description: "A tiny ball of energy who loves exploring tunnels." },
  { name: "Oliver", type: "Dog", age: "7 years", description: "A gentle Great Dane with a heart as big as his paws." },
  { name: "Clover", type: "Cat", age: "1 year", description: "A playful and mischievous kitten who loves to climb." },
  { name: "Finn", type: "Ferret", age: "3 years", description: "A curious adventurer who loves to explore." },
  { name: "Poppy", type: "Dog", age: "2 years", description: "A spunky Beagle who follows her nose everywhere." },
  { name: "Coconut", type: "Parrot", age: "4 years", description: "A chatty bird who loves singing and learning new words." },
  { name: "Hopper", type: "Rabbit", age: "5 years", description: "A calm and affectionate bunny who loves ear rubs." }
];

const PetCard = ({ name, type, age, description }) => (
  <div className="bg-white rounded-2xl shadow-lg p-4 m-2 w-64 text-center border border-gray-200">
    <h2 className="text-xl font-bold text-gray-700">{name}</h2>
    <p className="text-gray-500">{type} - {age}</p>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

const PetProfiles = () => {
  return (
    <div className="flex flex-wrap justify-center p-6 bg-gray-100 min-h-screen">
      {pets.map((pet, index) => (
        <PetCard key={index} {...pet} />
      ))}
    </div>
  );
};

export default PetProfiles;