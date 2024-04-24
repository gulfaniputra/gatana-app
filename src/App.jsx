import { useState } from "react";
import "./App.css";

const animesData = [
  {
    mal_id: 16498,
    title: "Shingeki no Kyojin",
    year: 2013,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    score: 8.54,
    synopsis:
      "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.",
  },
  {
    mal_id: 37520,
    title: "Dororo",
    year: 2019,
    image: "https://cdn.myanimelist.net/images/anime/1879/100467.jpg",
    score: 8.25,
    synopsis:
      "The greedy samurai lord Daigo Kagemitsu's land is dying, and he would do anything for power, even renounce Buddha and make a pact with demons. His prayers are answered by 12 demons who grant him the power he desires by aiding his prefecture's growth, but at a price. When Kagemitsu's first son is born, the boy has no limbs, no nose, no eyes, no ears, nor even skin—yet still, he lives.",
  },
  {
    mal_id: 14719,
    title: "JoJo no Kimyou na Bouken",
    year: 2012,
    image: "https://cdn.myanimelist.net/images/anime/3/40409.jpg",
    score: 7.88,
    synopsis:
      "The year is 1868; English nobleman George Joestar and his son Jonathan become indebted to Dario Brando after being rescued from a carriage incident. What the Joestars don't realize, however, is that Dario had no intention of helping them; he believed they were dead and was trying to ransack their belongings. After Dario's death 12 years later, George—hoping to repay his debt—adopts his son, Dio.",
  },
  {
    mal_id: 1818,
    title: "Claymore",
    year: 2007,
    image: "https://cdn.myanimelist.net/images/anime/3/21834.jpg",
    score: 7.74,
    synopsis:
      "When a shapeshifting demon with a thirst for human flesh, known as youma, arrives in Raki's village, a lone woman with silver eyes walks into town with only a sword upon her back. She is a Claymore, a being manufactured as half-human and half-youma, for the express purpose of exterminating these monsters. After Raki's family is killed, the Claymore saves his life, but he is subsequently banished from his home. With nowhere else to go, Raki finds the Claymore, known as Clare, and decides to follow her on her journeys.",
  },
];

export default function App() {
  const [animes, setAnimes] = useState(animesData);
  const [selectedAnime, setSelectedAnime] = useState(animes[0]);

  function handleSelectedAnime(id) {
    const newAnime = animes.filter((anime) => anime.mal_id === id);
    setSelectedAnime(newAnime[0]);
  }

  return (
    <>
      <NavBar>
        <Search>
          <NumResult animes={animes} />
        </Search>
      </NavBar>
      <Main>
        <Box>
          <AnimeList animes={animes} onSelectedAnime={handleSelectedAnime} />
        </Box>
        <Box>
          <AnimeDetail selectedAnime={selectedAnime} />
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>Gatana</h1>
    </div>
  );
}

function Search({ children }) {
  const [query, setQuery] = useState("");

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search Anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {children}
    </div>
  );
}

function NumResult({ animes }) {
  return (
    <p className="search-results">
      <strong>{animes.length}</strong> results found
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function AnimeList({ animes, onSelectedAnime }) {
  return (
    <ul className="list list-anime">
      {animes?.map((anime) => (
        <Anime
          key={anime.mal_id}
          anime={anime}
          onSelectedAnime={onSelectedAnime}
        />
      ))}
    </ul>
  );
}

function Anime({ anime, onSelectedAnime }) {
  return (
    <li onClick={() => onSelectedAnime(anime.mal_id)}>
      <img src={anime.image} alt={`${anime.title} cover`} />
      <h3>{anime.title}</h3>
      <div>
        <p>
          <span>{anime.year}</span>
        </p>
      </div>
    </li>
  );
}

function AnimeDetail({ selectedAnime }) {
  return (
    <div className="details">
      <header>
        <img src={selectedAnime.image} alt={`${selectedAnime.title} cover`} />
        <div className="details-overview">
          <h2>{selectedAnime.title}</h2>
          <p>
            {selectedAnime.year} &bull; {selectedAnime.score}
          </p>
        </div>
      </header>
      <section>
        <p>
          <em>{selectedAnime.synopsis}</em>
        </p>
      </section>
    </div>
  );
}
